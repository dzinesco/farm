/**
 * useWalls3D — transform FRMX wall data into 3D-ready render props
 */
import { useMemo } from 'react'
import { useFRMXStore } from '@/store'
import { centerlineToSegments, buildSegmentFrame, wallToWorldCoords } from '../utils/wallToGeometry'

// ─── Render prop types ────────────────────────────────────────────────

export interface WallSegmentRenderProps {
  id: string
  start: [number, number, number]
  end: [number, number, number]
  direction: [number, number, number]
  normal: [number, number, number]
  length: number
  height: number
  layerOffsets: LayerOffsetRenderProps[]
  studPositions: number[]        // distance along wall centerline for each stud
  openingPositions: OpeningRenderProps[]  // windows/doors in this segment
}

export interface LayerOffsetRenderProps {
  id: string
  offsetFromFace: number
  thickness: number
  color: string
}

export interface OpeningRenderProps {
  id: string
  type: 'window' | 'door' | 'other'
  position: number   // distance along wall centerline
  width: number
  height: number
}

// ─── Hook ─────────────────────────────────────────────────────────────

/**
 * Convert the full wall list from the store into 3D-ready render props.
 */
export function useWalls3D(): WallSegmentRenderProps[] {
  const project = useFRMXStore((s) => s.project)

  const walls = useMemo(() => {
    const result: WallSegmentRenderProps[] = []

    for (const level of project.building.levels) {
      for (const wall of level.walls) {
        const segments = centerlineToSegments(wall.centerline)
        const wallHeight = wall.height / 12  // inches → feet

        // Get stud positions from framing model
        const studPositions: number[] = []
        const firstPanel = wall.panels[0]
        if (firstPanel?.framingModel?.studs) {
          for (const stud of firstPanel.framingModel.studs) {
            if (stud.type === 'full') {
              // position is in inches along wall — convert to feet
              studPositions.push(stud.position / 12)
            }
          }
        } else {
          // Fallback: generate studs at 16" intervals
          for (const seg of segments) {
            const spacing = 16 / 12  // feet
            const count = Math.floor(seg.length / spacing)
            for (let i = 0; i <= count; i++) {
              const t = i / Math.max(count, 1)
              const distAlong = seg.length * t
              // Accumulate distance for multi-segment walls
              const existing = studPositions[studPositions.length - 1]
              const lastDist = existing ?? 0
              studPositions.push(lastDist + distAlong)
            }
          }
        }

        // Get openings for this wall
        const wallOpenings: OpeningRenderProps[] = wall.openings.map(op => ({
          id: op.id,
          type: op.type as 'window' | 'door' | 'other',
          position: op.position / 12,  // inches → feet
          width: op.roughOpeningWidth / 12,
          height: op.roughOpeningHeight / 12,
        }))

        for (const seg of segments) {
          const frame = buildSegmentFrame(seg)

          // Build layer offsets with color coding
          const layerOffsets = firstPanel?.layerStack.map((layer) => ({
            id: layer.id,
            offsetFromFace: 0,
            thickness: layer.thickness / 12,  // inches → feet
            color: roleToColor(layer.role),
          })) ?? []

          // Filter openings that fall within this segment
          const segStart = 0  // simplified — segment start distance
          const segEnd = seg.length
          const segmentOpenings = wallOpenings.filter(op => {
            // Rough check: opening center within segment
            return op.position >= segStart - 0.5 && op.position <= segEnd + 0.5
          })

          result.push({
            id: wall.id,
            start: [seg.start.x, seg.start.y, 0] as [number, number, number],
            end: [seg.end.x, seg.end.y, 0] as [number, number, number],
            direction: [seg.direction.x, seg.direction.y, 0] as [number, number, number],
            normal: [seg.normal.x, seg.normal.y, 0] as [number, number, number],
            length: seg.length,
            height: wallHeight,
            layerOffsets,
            studPositions,
            openingPositions: segmentOpenings,
          })
        }
      }
    }

    return result
  }, [project.building.levels])

  return walls
}

function roleToColor(role: string): string {
  switch (role) {
    case 'sheathing':    return '#c8b89a'
    case 'cladding':     return '#8b7355'
    case 'drywall':      return '#faf5f0'
    case 'insulation':   return '#e8d4a8'
    case 'vapor-barrier':return '#c8e8f8'
    case 'air-gap':      return 'transparent'
    default:             return '#d4c4a8'
  }
}