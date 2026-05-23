/**
 * @frmx/three utils — wall geometry conversion helpers
 * Re-exports and extends @frmx/geometry for 3D rendering needs.
 */
import { type Point2D, type Vec2, type WallFrame, vec2PerpCW, vec2Distance, polylineTotalLength } from '@frmx/geometry'

// Re-export geometry primitives
export { type Point2D, type Vec2, type WallFrame, vec2PerpCW, vec2Distance, polylineTotalLength } from '@frmx/geometry'
export { buildWallFrame, wallToWorld, worldToWall } from '@frmx/geometry'

// ─── WallSegment ─────────────────────────────────────────────────────

export interface WallSegment {
  start: Vec2
  end: Vec2
  length: number
  direction: Vec2
  normal: Vec2 // perpendicular (left of direction)
}

/**
 * Convert a centerline polyline to wall segments.
 * Each segment carries its length, unit direction, and outward normal.
 */
export function centerlineToSegments(centerline: Point2D[]): WallSegment[] {
  if (centerline.length < 2) return []
  const segments: WallSegment[] = []
  for (let i = 0; i < centerline.length - 1; i++) {
    const start = centerline[i]!
    const end = centerline[i + 1]!
    const dx = end.x - start.x
    const dy = end.y - start.y
    const length = vec2Distance(start, end)
    const direction = length > 0 ? { x: dx / length, y: dy / length } : { x: 0, y: 0 }
    const normal = vec2PerpCW(direction)
    segments.push({ start, end, length, direction, normal })
  }
  return segments
}

/**
 * Build a SegmentFrame from a WallSegment.
 * This is a 2D version of buildWallFrame that matches WallFrame structure
 * so it can be used with wallToWorld directly.
 */
export function buildSegmentFrame(segment: WallSegment): {
  origin: { x: number; y: number; z: number }
  direction: { x: number; y: number; z: number }
  normal: { x: number; y: number; z: number }
} {
  return {
    origin: { x: segment.start.x, y: segment.start.y, z: 0 },
    direction: { x: segment.direction.x, y: segment.direction.y, z: 0 },
    normal: { x: segment.normal.x, y: segment.normal.y, z: 0 },
  }
}

/**
 * Map wall-local (distAlong, offset) + height to world 3D coordinates.
 * Uses the same math as geometry/wallToWorld but accepts flat frame fields.
 */
export function wallToWorldCoords(
  frame: { origin: { x: number; y: number; z: number }; direction: { x: number; y: number; z: number }; normal: { x: number; y: number; z: number } },
  distAlong: number,
  offset: number,
  height: number
): [number, number, number] {
  return [
    frame.origin.x + frame.direction.x * distAlong + frame.normal.x * offset,
    frame.origin.y + frame.direction.y * distAlong + frame.normal.y * offset,
    height,
  ]
}