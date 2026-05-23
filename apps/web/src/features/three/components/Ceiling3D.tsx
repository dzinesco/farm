'use client'
/**
 * Ceiling3D — auto-generated ceiling plane from wall outlines
 */
import * as THREE from 'three'
import type { WallSegmentRenderProps } from '../hooks/useWalls3D'

interface Ceiling3DProps {
  walls: WallSegmentRenderProps[]
  height: number  // ceiling height in feet
  visible: boolean
}

export function buildCeilingMesh(walls: WallSegmentRenderProps[], height: number): THREE.Mesh | null {
  if (walls.length === 0) return null

  const points: { x: number; y: number }[] = []
  for (const wall of walls) {
    points.push({ x: wall.start[0], y: wall.start[1] })
    points.push({ x: wall.end[0], y: wall.end[1] })
  }

  if (points.length < 3) return null

  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const geo = new THREE.PlaneGeometry(maxX - minX, maxY - minY)
  geo.translate((minX + maxX) / 2, (minY + maxY) / 2, height)

  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9,
    side: THREE.DoubleSide,
  })

  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.x = -Math.PI / 2
  return mesh
}

export default function Ceiling3D(_props: Ceiling3DProps) {
  // Placeholder — ceiling is built in Scene.tsx via buildCeilingMesh
  return null
}