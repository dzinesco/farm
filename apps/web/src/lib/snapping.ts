// apps/web/src/lib/snapping.ts

export interface Point2D { x: number; y: number }

/**
 * Snap a world coordinate to the nearest grid point.
 * gridSize is in feet (1/12 = 1 inch, 1 = 1 foot).
 */
export function gridSnap(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize
}

/**
 * Snap a candidate point to the dominant axis (horizontal or vertical)
 * relative to an anchor point. Used for ortho mode.
 */
export function orthoSnap(candidate: Point2D, anchor: Point2D): Point2D {
  const dx = candidate.x - anchor.x
  const dy = candidate.y - anchor.y
  if (Math.abs(dx) >= Math.abs(dy)) {
    return { x: candidate.x, y: anchor.y }
  } else {
    return { x: anchor.x, y: candidate.y }
  }
}

/**
 * Snap a point to an existing endpoint if within threshold (in same units as points).
 * Otherwise returns the original point unchanged.
 */
export function snapPoint(
  pt: Point2D,
  endpoints: Point2D[],
  threshold: number
): Point2D {
  for (const ep of endpoints) {
    const dx = pt.x - ep.x
    const dy = pt.y - ep.y
    if (Math.hypot(dx, dy) <= threshold) {
      return { x: ep.x, y: ep.y }
    }
  }
  return pt
}