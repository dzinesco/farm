'use client'
/**
 * Floor3D — renders the floor plane(s) for a building level
 */
import * as THREE from 'three'
import { FLOOR_MATERIAL, CONCRETE_MATERIAL } from '../utils/materials'

interface Floor3DProps {
  width: number
  depth: number
  elevation: number // z coordinate of floor surface
  type: 'wood' | 'concrete'
}

/**
 * Build a floor mesh given dimensions and elevation.
 */
export function buildFloorMesh(props: Floor3DProps): THREE.Mesh {
  const { width, depth, elevation, type } = props
  const geometry = new THREE.BoxGeometry(width, depth, 0.5)
  const material = type === 'concrete' ? CONCRETE_MATERIAL.clone() : FLOOR_MATERIAL.clone()
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 0, elevation - 0.25) // center of 0.5" thick floor
  return mesh
}

export default function Floor3D(_props: Floor3DProps) {
  // Placeholder — actual rendering in Scene.tsx
  return null
}