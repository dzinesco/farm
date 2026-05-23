/**
 * @frmx/framing-engine — studs, headers, cripples from openings + rules
 * All framing generated programmatically, editable via deltas.
 */
import { parseLengthString } from '@frmx/calculator'
import { createId } from '@frmx/core'

export interface FramingInput {
  wallLength: number       // total wall length in inches
  wallHeight: number       // wall height in inches
  studSpacing: number      // OC spacing (16 or 24)
  openings: OpeningInput[]
  plateCount: 1 | 2        // single or double top plate
}

export interface OpeningInput {
  position: number        // center of opening from left end, inches
  width: number           // rough opening width, inches
  height: number          // rough opening height, inches
  type: 'window' | 'door'
}

export interface FramingOutput {
  studs: GeneratedStud[]
  headers: GeneratedHeader[]
  cripples: GeneratedCripple[]
  plates: GeneratedPlate[]
  blocking: GeneratedBlocking[]
}

export interface GeneratedStud {
  id: string
  position: number        // from left end of wall, inches
  type: 'full' | 'jack' | 'king' | 'cripple'
  height: number          // inches
}

export interface GeneratedHeader {
  id: string
  start: number           // from left end, inches
  end: number
  height: number
  width: number
}

export interface GeneratedCripple {
  id: string
  position: number
  start: number
  end: number
}

export interface GeneratedPlate {
  id: string
  type: 'top' | 'bottom'
  position: number
  length: number
}

export interface GeneratedBlocking {
  id: string
  position: number
  start: number
  end: number
}

/**
 * Generate full framing layout for a wall.
 * Headers span RO width + clearance. Jack studs support headers.
 * Cripples fill between header and plate.
 * King studs flank openings.
 */
export function generateFraming(input: FramingInput): FramingOutput {
  const { wallLength, wallHeight, studSpacing, openings, plateCount } = input
  const studs: GeneratedStud[] = []
  const headers: GeneratedHeader[] = []
  const cripples: GeneratedCripple[] = []
  const plates: GeneratedPlate[] = []
  const blocking: GeneratedBlocking[] = []

  // Collect all break points from openings
  const breakPoints = new Set<number>([0, wallLength])

  const sortedOpenings = [...openings].sort((a, b) => a.position - b.position)

  for (const op of sortedOpenings) {
    // Header extends past RO by standard bearing length
    const bearing = 3.5 // inches (stud width)
    const hStart = op.position - op.width / 2 - bearing
    const hEnd = op.position + op.width / 2 + bearing

    // Jack stud positions (support header)
    studs.push({ id: createId('jack'), position: hStart, type: 'jack', height: op.height })
    studs.push({ id: createId('jack'), position: hEnd, type: 'jack', height: op.height })

    // King studs (flank the opening)
    const kingSpacing = studSpacing
    studs.push({ id: createId('king'), position: hStart - kingSpacing, type: 'king', height: wallHeight })
    studs.push({ id: createId('king'), position: hEnd + kingSpacing, type: 'king', height: wallHeight })

    // Header
    headers.push({ id: createId('header'), start: hStart, end: hEnd, height: 5.5, width: 3.5 })

    // Cripples above header
    const crippleTop = wallHeight - op.height - 5.5
    if (crippleTop > 0) {
      cripples.push({ id: createId('crip'), position: op.position, start: hStart, end: hEnd })
    }

    breakPoints.add(hStart - studSpacing) // king left
    breakPoints.add(hStart) // jack left
    breakPoints.add(hEnd) // jack right
    breakPoints.add(hEnd + studSpacing) // king right
  }

  // Generate full-height studs along wall
  const sortedBreaks = [...breakPoints].sort((a, b) => a - b)
  let prevPos = 0
  for (const bp of sortedBreaks) {
    if (bp <= 0 || bp >= wallLength) continue
    if (bp - prevPos < 2) { prevPos = bp; continue }
    // Place full studs between breaks
    for (let pos = prevPos + studSpacing / 2; pos < bp; pos += studSpacing) {
      studs.push({ id: createId('full'), position: pos, type: 'full', height: wallHeight })
    }
    prevPos = bp
  }

  // Plates
  const plateH = 1.5 * plateCount
  plates.push({ id: createId('plate'), type: 'top', position: wallHeight - plateH, length: wallLength })
  plates.push({ id: createId('plate'), type: 'bottom', position: 0, length: wallLength })

  return { studs, headers, cripples, plates, blocking }
}

/**
 * Regenerate framing with changes, checking for override conflicts.
 */
export function regenerateFraming(
  previous: FramingOutput,
  input: FramingInput
): { framing: FramingOutput; conflicts: string[] } {
  // Panel overrides are stored as deltas and applied after framing generation.
  // Conflict detection against manual edits is not yet implemented.
  const conflicts: string[] = []
  return { framing: generateFraming(input), conflicts }
}