'use client'
/**
 * Room3D — renders a room as a floor + walls group
 */
import * as THREE from 'three'
import { buildFloorMesh } from './Floor3D'
import type { WallSegmentRenderProps } from '../hooks/useWalls3D'

interface Room3DProps {
  walls: WallSegmentRenderProps[]
  floorWidth: number
  floorDepth: number
  elevation: number
}

/**
 * Build a room group: floor + all wall segments
 */
export function buildRoomMesh(props: Room3DProps): THREE.Group {
  const { walls, floorWidth, floorDepth, elevation } = props
  const group = new THREE.Group()

  // Floor
  const floor = buildFloorMesh({ width: floorWidth, depth: floorDepth, elevation, type: 'wood' })
  group.add(floor)

  // Walls — each wall segment as a thin box
  for (const wall of walls) {
    const wallGeom = new THREE.BoxGeometry(wall.length, 0.5, wall.height)
    const wallMesh = new THREE.Mesh(wallGeom, new THREE.MeshStandardMaterial({ color: 0xd4c4a8, roughness: 0.9 }))
    const centerX = (wall.start[0] + wall.end[0]) / 2
    const centerY = (wall.start[1] + wall.end[1]) / 2
    wallMesh.position.set(centerX, centerY, wall.height / 2)
    group.add(wallMesh)
  }

  return group
}

export default function Room3D(_props: Room3DProps) {
  return null
}