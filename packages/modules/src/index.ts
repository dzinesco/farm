/**
 * @frmx/modules — opening presets, corner/intersection configs, component library
 */
import { createId } from '@frmx/core'

export interface OpeningPreset {
  id: string
  name: string
  roughOpeningWidth: number
  roughOpeningHeight: number
  headerSize: string
  jambDepth: number
  sillHeight?: number
}

export interface CornerPreset {
  id: string
  name: string
  type: 'l-wrap' | 'two-panel' | 'stud-pack'
  sheathingOffset: number
  studPackCount: number
}

export interface IntersectionPreset {
  id: string
  name: string
  type: 'l' | 't' | 'cross'
  connectionConfig: string
}

export interface Component {
  id: string
  name: string
  type: 'electrical' | 'chase' | 'hold-down' | 'other'
  description: string
  defaultWidth?: number
  defaultHeight?: number
  defaultDepth?: number
}

// ─── Default opening presets ──────────────────────────────────────────

export const OPENING_PRESETS: OpeningPreset[] = [
  { id: createId('op'), name: 'Window 36x48', roughOpeningWidth: 38, roughOpeningHeight: 50, headerSize: '2x6', jambDepth: 5.5, sillHeight: 36 },
  { id: createId('op'), name: 'Window 48x60', roughOpeningWidth: 50, roughOpeningHeight: 62, headerSize: '2x6', jambDepth: 5.5, sillHeight: 36 },
  { id: createId('op'), name: 'Door 32x80', roughOpeningWidth: 34, roughOpeningHeight: 82, headerSize: '2x6', jambDepth: 5.5 },
  { id: createId('op'), name: 'Door 36x80', roughOpeningWidth: 38, roughOpeningHeight: 82, headerSize: '2x6', jambDepth: 5.5 },
  { id: createId('op'), name: 'Patio Door 60x80', roughOpeningWidth: 62, roughOpeningHeight: 82, headerSize: '2x12', jambDepth: 5.5 },
]

// ─── Default corner presets ──────────────────────────────────────────

export const CORNER_PRESETS: CornerPreset[] = [
  { id: createId('corner'), name: 'L-Wrap 3.5"', type: 'l-wrap', sheathingOffset: 3.5, studPackCount: 1 },
  { id: createId('corner'), name: 'Two-Panel + Corner Stud Pack', type: 'two-panel', sheathingOffset: 0, studPackCount: 3 },
]

// ─── Default intersection presets ────────────────────────────────────

export const INTERSECTION_PRESETS: IntersectionPreset[] = [
  { id: createId('int'), name: 'L-Intersection', type: 'l', connectionConfig: 'lap' },
  { id: createId('int'), name: 'T-Intersection', type: 't', connectionConfig: 'lap' },
  { id: createId('int'), name: 'Cross Intersection', type: 'cross', connectionConfig: 'scarf' },
]

// ─── Default components ─────────────────────────────────────────────

export const COMPONENTS: Component[] = [
  { id: createId('comp'), name: 'Electrical Pack', type: 'electrical', description: 'Pre-installed electrical box and wiring', defaultWidth: 12, defaultHeight: 48, defaultDepth: 3.5 },
  { id: createId('comp'), name: 'Chase', type: 'chase', description: 'Horizontal chase for plumbing or HVAC', defaultWidth: 12, defaultHeight: 8, defaultDepth: 5.5 },
  { id: createId('comp'), name: 'Hold-Down', type: 'hold-down', description: 'Structural hold-down bracket', defaultWidth: 4, defaultHeight: 24, defaultDepth: 3.5 },
]

export function getOpeningPresetById(id: string): OpeningPreset | undefined {
  return OPENING_PRESETS.find(o => o.id === id)
}

export function getCornerPresetById(id: string): CornerPreset | undefined {
  return CORNER_PRESETS.find(c => c.id === id)
}

export function getIntersectionPresetById(id: string): IntersectionPreset | undefined {
  return INTERSECTION_PRESETS.find(i => i.id === id)
}