/**
 * materials — THREE.js material definitions for 3D rendering
 * All materials are shared (useMemo) to avoid per-instance duplication.
 */
import * as THREE from 'three'

// ─── Shared materials ─────────────────────────────────────────────────

export const DRYWALL_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xfaf5f0,    // off-white
  roughness: 0.9,
  metalness: 0,
})

export const EXTERIOR_SHEATHING_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xc8b89a,    // tan/beige OSB color
  roughness: 0.85,
  metalness: 0,
})

export const STUD_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xdeb887,    // light wood/stud color
  roughness: 0.8,
  metalness: 0,
})

export const HEADER_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xb8860b,    // darker wood (engineered)
  roughness: 0.75,
  metalness: 0,
})

export const GLASS_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0x88c8e8,
  roughness: 0.05,
  metalness: 0.1,
  transparent: true,
  opacity: 0.4,
})

export const FLOOR_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0x8b7355,    // wood floor / subfloor
  roughness: 0.7,
  metalness: 0,
})

export const CONCRETE_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0x808080,
  roughness: 0.95,
  metalness: 0,
})

/**
 * Dispose of a material when it's no longer needed.
 * Call this in a useEffect cleanup or on component unmount.
 */
export function disposeMaterial(mat: THREE.Material | THREE.Material[]) {
  if (Array.isArray(mat)) {
    mat.forEach((m) => m.dispose())
  } else {
    mat.dispose()
  }
}