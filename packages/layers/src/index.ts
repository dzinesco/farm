/**
 * @frmx/layers — layer stack presets (2x6 exterior, interior partition, etc.)
 */
import { createId } from '@frmx/core'

export interface LayerPreset {
  id: string
  name: string
  description: string
  layers: PresetLayer[]
  wallType: 'exterior' | 'interior' | 'demising'
}

export interface PresetLayer {
  name: string
  thickness: number  // inches
  material: string
  role: 'sheathing' | 'cladding' | 'insulation' | 'air-gap' | 'vapor-barrier' | 'drywall' | 'other' | 'core'
  position: 'exterior' | 'interior' | 'core'
}

// ─── Default presets ─────────────────────────────────────────────────

export const DEFAULT_EXTERIOR_2X6: LayerPreset = {
  id: createId('preset'),
  name: '2x6 Exterior Wall',
  description: 'Standard 2x6 exterior wall with OSB sheathing, batt insulation, and drywall',
  wallType: 'exterior',
  layers: [
    { name: 'Exterior Cladding', thickness: 0.75, material: 'Fiber Cement', role: 'cladding', position: 'exterior' },
    { name: 'Weather Barrier', thickness: 0.05, material: 'House Wrap', role: 'vapor-barrier', position: 'exterior' },
    { name: 'OSB Sheathing', thickness: 0.5625, material: 'OSB 7/16"', role: 'sheathing', position: 'exterior' },
    { name: 'Stud Cavity - Insulation', thickness: 5.5, material: 'R-20 Batt', role: 'insulation', position: 'core' },
    { name: 'Interior Drywall', thickness: 0.5, material: 'Gypsum 1/2"', role: 'drywall', position: 'interior' },
  ],
}

export const DEFAULT_INTERIOR_PARTITION: LayerPreset = {
  id: createId('preset'),
  name: 'Interior Partition 2x4',
  description: 'Standard 2x4 interior wall with drywall both sides',
  wallType: 'interior',
  layers: [
    { name: 'Drywall', thickness: 0.5, material: 'Gypsum 1/2"', role: 'drywall', position: 'interior' },
    { name: 'Stud Cavity', thickness: 3.5, material: 'Empty', role: 'core', position: 'core' },
    { name: 'Drywall', thickness: 0.5, material: 'Gypsum 1/2"', role: 'drywall', position: 'exterior' },
  ],
}

export const ALL_PRESETS: LayerPreset[] = [DEFAULT_EXTERIOR_2X6, DEFAULT_INTERIOR_PARTITION]

export function getPresetById(id: string): LayerPreset | undefined {
  return ALL_PRESETS.find(p => p.id === id)
}

export function getDefaultPreset(wallType: 'exterior' | 'interior' | 'demising'): LayerPreset {
  return ALL_PRESETS.find(p => p.wallType === wallType) ?? DEFAULT_EXTERIOR_2X6
}