/**
 * layerStackToOffsets — map Layer[] to wall depth offsets
 * Needed by Wall3D to position each layer's mesh.
 */
import type { Layer } from '@frmx/core'

export interface LayerOffset {
  id: string
  materialId: string
  offsetFromFace: number // inches from the exterior face (negative = inside face)
  thickness: number
}

/**
 * Given a layer stack ordered exterior → interior, compute
 * the offset of each layer's face from the wall's origin (exterior face).
 *
 * Positive offset = into the wall (toward interior)
 * Negative offset = beyond interior face (outside the wall)
 */
export function layerStackToOffsets(layers: Layer[]): LayerOffset[] {
  const offsets: LayerOffset[] = []
  let runningOffset = 0 // starting at exterior face

  for (const layer of layers) {
    offsets.push({
      id: layer.id,
      materialId: layer.materialRef,
      offsetFromFace: runningOffset,
      thickness: layer.thickness,
    })
    runningOffset += layer.thickness
  }

  return offsets
}

/**
 * Default wall thickness by type (in inches).
 * Used when creating a default layer stack.
 */
export function defaultWallThickness(wallType: string): number {
  switch (wallType) {
    case 'exterior':
      return 6.625 // 2x6 + sheathing
    case 'interior':
      return 4.625 // 2x4 + drywall
    case 'demising':
      return 6.625 // double 2x4
    default:
      return 6.625
  }
}