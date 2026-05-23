/**
 * @frmx/panelizer — wall → panel splitting rules
 * Break walls into transportable panels at max length and opening boundaries.
 */
import { createId } from '@frmx/core'
import { DEFAULT_EXTERIOR_2X6, DEFAULT_INTERIOR_PARTITION } from '@frmx/layers'

// ─── Types (local, matching @frmx/core) ───────────────────────────────

export interface Point2D { x: number; y: number }

export interface Wall {
  id: string
  name: string
  centerline: Point2D[]
  height: number
  wallType: string
  panels: unknown[]
  openings: Opening[]
  modules: unknown[]
}

export interface Opening {
  id: string
  type: 'window' | 'door' | 'other'
  position: number
  width: number
  height: number
  roughOpeningWidth: number
  roughOpeningHeight: number
  sillHeight?: number
}

export interface PresetLayer {
  name: string
  thickness: number
  material: string
  role: string
  position: string
}

export interface LayerPreset {
  id: string
  name: string
  wallType: string
  layers: PresetLayer[]
}

// ─── FramingEngine types (local to avoid circular dep) ─────────────

export interface GeneratedStud {
  id: string
  position: number
  type: 'full' | 'jack' | 'king' | 'cripple'
  height: number
}

export interface GeneratedHeader {
  id: string
  start: number
  end: number
  height: number
  width: number
}

export interface FramingOutput {
  studs: GeneratedStud[]
  headers: GeneratedHeader[]
  cripples: { id: string; position: number; start: number; end: number }[]
  plates: { id: string; type: 'top' | 'bottom'; position: number; length: number }[]
  blocking: { id: string; position: number; start: number; end: number }[]
}

// ─── Panelizer types ─────────────────────────────────────────────────

export interface PanelizerOptions {
  maxPanelLength: number
  breakAtOpenings: boolean
  breakAtCorners: boolean
  studSpacing: number
}

const DEFAULT_OPTIONS: PanelizerOptions = {
  maxPanelLength: 96,
  breakAtOpenings: true,
  breakAtCorners: true,
  studSpacing: 16,
}

export interface PanelSplit {
  start: number
  end: number
  reason: 'max-length' | 'opening' | 'corner' | 'manual'
}

// ─── Internal helpers ────────────────────────────────────────────────

function calculateWallLength(wall: Wall): number {
  let total = 0
  for (let i = 1; i < wall.centerline.length; i++) {
    const dx = wall.centerline[i]!.x - wall.centerline[i - 1]!.x
    const dy = wall.centerline[i]!.y - wall.centerline[i - 1]!.y
    total += Math.sqrt(dx * dx + dy * dy)
  }
  return total
}

// ─── Simple framing generator (no circular deps) ────────────────────

interface FramingInput {
  wallLength: number
  wallHeight: number
  studSpacing: number
  openings: { position: number; width: number; height: number; type: 'window' | 'door' }[]
}

function generateFraming(input: FramingInput): FramingOutput {
  const { wallLength, wallHeight, studSpacing, openings } = input
  const studs: GeneratedStud[] = []
  const headers: GeneratedHeader[] = []
  const cripples: { id: string; position: number; start: number; end: number }[] = []
  const plates = [
    { id: createId('plate'), type: 'bottom' as const, position: 0, length: wallLength },
    { id: createId('plate'), type: 'top' as const, position: wallHeight - 1.5, length: wallLength },
  ]

  const breakPoints = new Set<number>([0, wallLength])

  const sorted = [...openings].sort((a, b) => a.position - b.position)
  for (const op of sorted) {
    const bearing = 3.5
    const hStart = Math.max(0, op.position - op.width / 2 - bearing)
    const hEnd = Math.min(wallLength, op.position + op.width / 2 + bearing)

    studs.push({ id: createId('jack'), position: hStart, type: 'jack', height: op.height })
    studs.push({ id: createId('jack'), position: hEnd, type: 'jack', height: op.height })
    studs.push({ id: createId('king'), position: Math.max(0, hStart - studSpacing), type: 'king', height: wallHeight })
    studs.push({ id: createId('king'), position: Math.min(wallLength, hEnd + studSpacing), type: 'king', height: wallHeight })

    headers.push({ id: createId('header'), start: hStart, end: hEnd, height: 5.5, width: 3.5 })
    cripples.push({ id: createId('crip'), position: op.position, start: hStart, end: hEnd })

    breakPoints.add(hStart - studSpacing)
    breakPoints.add(hStart)
    breakPoints.add(hEnd)
    breakPoints.add(hEnd + studSpacing)
  }

  const sortedBreaks = [...breakPoints].sort((a, b) => a - b)
  let prev = 0
  for (const bp of sortedBreaks) {
    if (bp <= 0 || bp >= wallLength) continue
    if (bp - prev < 2) { prev = bp; continue }
    for (let pos = prev + studSpacing / 2; pos < bp; pos += studSpacing) {
      studs.push({ id: createId('full'), position: pos, type: 'full', height: wallHeight })
    }
    prev = bp
  }

  return { studs, headers, cripples, plates, blocking: [] }
}

// ─── Public API ─────────────────────────────────────────────────────

export function calculatePanelSplits(wall: Wall, options: Partial<PanelizerOptions> = {}): PanelSplit[] {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const splits: PanelSplit[] = []
  const wallLength = calculateWallLength(wall)
  let pos = 0

  while (pos < wallLength) {
    const maxEnd = Math.min(pos + opts.maxPanelLength, wallLength)
    let end = maxEnd

    if (opts.breakAtOpenings) {
      for (const opening of wall.openings) {
        const opCenter = opening.position
        const opStart = opCenter - opening.roughOpeningWidth / 2
        const opEnd = opCenter + opening.roughOpeningWidth / 2

        if (opStart > pos && opStart < pos + opts.maxPanelLength && opStart > pos && opStart < maxEnd) {
          end = opStart
        }
        if (opEnd > pos && opEnd < maxEnd && end > opEnd) {
          // Don't override if we already chose a closer break
        }
      }
    }

    splits.push({ start: pos, end, reason: 'max-length' })
    pos = end
  }

  return splits
}

export function panelizeWall(wall: Wall, options: Partial<PanelizerOptions> = {}): {
  id: string
  name: string
  position: number
  width: number
  height: number
  layerStack: { id: string; name: string; thickness: number; materialRef: string; role: string }[]
  framingModel: FramingOutput
  connections: unknown[]
  modules: unknown[]
  overrides: unknown[]
}[] {
  const splits = calculatePanelSplits(wall, options)
  const preset: LayerPreset = wall.wallType === 'exterior' ? DEFAULT_EXTERIOR_2X6 : DEFAULT_INTERIOR_PARTITION

  return splits.map((split, idx) => {
    const width = split.end - split.start

    const panelOpenings = wall.openings.filter(op => {
      const center = op.position
      return center >= split.start && center <= split.end
    })

    const framing = generateFraming({
      wallLength: width,
      wallHeight: wall.height,
      studSpacing: options?.studSpacing ?? 16,
      openings: panelOpenings.map(op => ({
        position: op.position - split.start,
        width: op.roughOpeningWidth,
        height: op.roughOpeningHeight,
        type: op.type === 'other' ? 'door' : op.type,
      })),
    })

    const layerStack = preset.layers.map((l: PresetLayer) => ({
      id: createId('layer'),
      name: l.name,
      thickness: l.thickness,
      materialRef: l.material,
      role: l.role,
    }))

    return {
      id: createId('panel'),
      name: `${wall.name} P${idx + 1}`,
      position: split.start,
      width,
      height: wall.height,
      layerStack,
      framingModel: framing,
      connections: [],
      modules: [],
      overrides: [],
    }
  })
}