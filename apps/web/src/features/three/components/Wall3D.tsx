'use client'
/**
 * Wall3D — render a single wall segment with layer stack visualization
 * Uses THREE.js directly with instanced studs and proper disposal.
 */
import * as THREE from 'three'
import { wallToWorldCoords } from '../utils/wallToGeometry'
import type { WallSegmentRenderProps } from '../hooks/useWalls3D'
import {
  DRYWALL_MATERIAL,
  EXTERIOR_SHEATHING_MATERIAL,
  STUD_MATERIAL,
  HEADER_MATERIAL,
  GLASS_MATERIAL,
  disposeMaterial,
} from '../utils/materials'

interface Wall3DProps {
  segment: WallSegmentRenderProps
  isSelected?: boolean
  onSelect?: (id: string) => void
}

// Convert color string to THREE.Color
const colorCache = new Map<string, THREE.Color>()
function getColor(hex: string): THREE.Color {
  if (!colorCache.has(hex)) {
    colorCache.set(hex, new THREE.Color(hex))
  }
  return colorCache.get(hex)!
}

/**
 * Build a box mesh for a wall layer.
 */
function buildLayerMesh(
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  normal: THREE.Vector3,
  length: number,
  offset: number,
  height: number,
  thickness: number,
  color: string
): THREE.Mesh {
  const position = origin.clone()
    .add(direction.clone().multiplyScalar(length / 2))
    .add(normal.clone().multiplyScalar(offset + thickness / 2))

  const geo = new THREE.BoxGeometry(length, thickness, height)
  const mat = new THREE.MeshStandardMaterial({ color: getColor(color), roughness: 0.85, metalness: 0 })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.copy(position)
  return mesh
}

/**
 * Build studs using InstancedMesh for performance.
 * Returns the InstancedMesh and a dispose function.
 */
function buildStudsInstanced(
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  normal: THREE.Vector3,
  wallLength: number,
  wallHeight: number,
  studPositions: number[]
): { mesh: THREE.InstancedMesh; dispose: () => void } {
  const studW = 1.5 / 12   // 1.5 inches in feet
  const studD = 3.5 / 12   // 3.5 inches in feet
  const geo = new THREE.BoxGeometry(studW, wallHeight, studD)
  const mat = STUD_MATERIAL.clone()
  const count = studPositions.length

  const instancedMesh = new THREE.InstancedMesh(geo, mat, count)
  const matrix = new THREE.Matrix4()

  for (let i = 0; i < count; i++) {
    const pos = wallToWorldCoords(
      { origin: { x: origin.x, y: origin.y, z: 0 }, direction: { x: direction.x, y: direction.y, z: 0 }, normal: { x: normal.x, y: normal.y, z: 0 } },
      studPositions[i]!,
      wallLength / 2,
      wallHeight / 2
    )
    matrix.setPosition(pos[0], pos[1], pos[2])
    instancedMesh.setMatrixAt(i, matrix)
  }
  instancedMesh.instanceMatrix.needsUpdate = true

  const dispose = () => {
    geo.dispose()
    mat.dispose()
  }

  return { mesh: instancedMesh, dispose }
}

/**
 * Build selection outline mesh for a wall.
 */
function buildSelectionOutline(
  start: [number, number, number],
  end: [number, number, number],
  height: number
): THREE.Line {
  const points = [
    new THREE.Vector3(start[0], start[1], 0),
    new THREE.Vector3(end[0], end[1], 0),
    new THREE.Vector3(end[0], end[1], height),
    new THREE.Vector3(start[0], start[1], height),
    new THREE.Vector3(start[0], start[1], 0),
  ]
  const geo = new THREE.BufferGeometry().setFromPoints(points)
  const mat = new THREE.LineBasicMaterial({ color: 0x00aaff, linewidth: 2 })
  return new THREE.Line(geo, mat)
}

export interface BuildResult {
  group: THREE.Group
  dispose: () => void
}

/**
 * Build a complete wall group with layers, studs, openings, selection outline.
 * Returns group + cleanup function to dispose all geometries/materials.
 */
export function buildWallMesh(props: Wall3DProps): BuildResult {
  const { segment, isSelected = false } = props
  const group = new THREE.Group()
  const disposables: { dispose: () => void }[] = []

  // Origin at start of segment
  const origin = new THREE.Vector3(segment.start[0], segment.start[1], 0)
  const direction = new THREE.Vector3(segment.direction[0], segment.direction[1], 0)
  const normal = new THREE.Vector3(segment.normal[0], segment.normal[1], 0)

  // Build layer meshes
  let runningOffset = 0
  for (const layer of segment.layerOffsets) {
    const mesh = buildLayerMesh(
      origin, direction, normal,
      segment.length, runningOffset,
      segment.height, layer.thickness, layer.color
    )
    group.add(mesh)
    disposables.push({ dispose: () => { mesh.geometry.dispose(); (mesh.material as THREE.Material).dispose() } })
    runningOffset += layer.thickness
  }

  // Build studs with InstancedMesh
  if (segment.studPositions && segment.studPositions.length > 0) {
    const { mesh: studMesh, dispose: disposeStuds } = buildStudsInstanced(
      origin, direction, normal,
      runningOffset, segment.height,
      segment.studPositions
    )
    group.add(studMesh)
    disposables.push({ dispose: disposeStuds })
  }

  // Build openings (windows as glass, doors as openings)
  for (const opening of segment.openingPositions ?? []) {
    const windowGeo = new THREE.BoxGeometry(opening.width, 0.5, opening.height)
    const windowMat = GLASS_MATERIAL.clone()
    const windowMesh = new THREE.Mesh(windowGeo, windowMat)

    const windowPos = wallToWorldCoords(
      { origin: { x: origin.x, y: origin.y, z: 0 }, direction: { x: direction.x, y: direction.y, z: 0 }, normal: { x: normal.x, y: normal.y, z: 0 } },
      opening.position,
      runningOffset / 2,
      segment.height - opening.height / 2
    )
    windowMesh.position.set(windowPos[0], windowPos[1], windowPos[2])
    group.add(windowMesh)
    disposables.push({ dispose: () => { windowGeo.dispose(); windowMat.dispose() } })
  }

  // Build selection outline
  if (isSelected) {
    const outline = buildSelectionOutline(segment.start, segment.end, segment.height)
    group.add(outline)
    disposables.push({
      dispose: () => {
        outline.geometry.dispose();
        (outline.material as THREE.Material).dispose()
      }
    })
  }

  const dispose = () => {
    disposables.forEach(d => d.dispose())
  }

  return { group, dispose }
}

export default function Wall3D(_props: Wall3DProps) {
  // Placeholder — rendering happens in Scene via buildWallMesh
  return null
}