/**
 * @frmx/geometry — 2D/3D primitives and wall-local frame math
 * Depends only on @frmx/calculator (imperial math foundation)
 */

// Re-export calculator types for convenience
export {
  parseLengthString,
  formatDim,
  addLengths,
  subtractLengths,
  INCHES_PER_FOOT,
} from '@frmx/calculator'

// ─── Local type aliases ──────────────────────────────────────────────

export interface Point2D { x: number; y: number }
export interface Point3D { x: number; y: number; z: number }
export interface Vec2 { x: number; y: number }
export interface Vec3 { x: number; y: number; z: number }
export interface Line2D { start: Vec2; end: Vec2 }
export interface Rect { x: number; y: number; width: number; height: number }
export interface Polyline2D { points: Vec2[]; closed: boolean }

// ─── 2D Vector math ──────────────────────────────────────────────────

export function vec2Add(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y }
}

export function vec2Sub(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y }
}

export function vec2Scale(v: Vec2, s: number): Vec2 {
  return { x: v.x * s, y: v.y * s }
}

export function vec2Dot(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y * b.y
}

export function vec2Length(v: Vec2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

export function vec2Normalize(v: Vec2): Vec2 {
  const len = vec2Length(v)
  if (len === 0) return { x: 0, y: 0 }
  return { x: v.x / len, y: v.y / len }
}

export function vec2PerpCW(v: Vec2): Vec2 {
  return { x: -v.y, y: v.x }
}

export function vec2PerpCCW(v: Vec2): Vec2 {
  return { x: v.y, y: -v.x }
}

export function vec2Angle(v: Vec2): number {
  return Math.atan2(v.y, v.x)
}

export function vec2FromAngle(angle: number): Vec2 {
  return { x: Math.cos(angle), y: Math.sin(angle) }
}

export function vec2Distance(a: Vec2, b: Vec2): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)
}

// ─── 3D Vector math ──────────────────────────────────────────────────

export function vec3Add(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
}

export function vec3Sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }
}

export function vec3Scale(v: Vec3, s: number): Vec3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s }
}

export function vec3Dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

export function vec3Cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}

export function vec3Length(v: Vec3): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
}

export function vec3Normalize(v: Vec3): Vec3 {
  const len = vec3Length(v)
  if (len === 0) return { x: 0, y: 0, z: 0 }
  return { x: v.x / len, y: v.y / len, z: v.z / len }
}

// ─── Wall-local Frame ────────────────────────────────────────────────

export interface WallFrame {
  origin: Vec3
  xAxis: Vec3
  yAxis: Vec3
  zAxis: Vec3
}

/**
 * Build a wall frame from centerline segment (p1 → p2).
 * xAxis = along wall direction
 * yAxis = outward normal (left of direction)
 * zAxis = up = cross(x,y)
 */
export function buildWallFrame(p1: Vec2, p2: Vec2): WallFrame {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const len = Math.sqrt(dx * dx + dy * dy) || 1

  const xAxis: Vec3 = { x: dx / len, y: dy / len, z: 0 }
  const yAxis: Vec3 = { x: dy / len, y: -dx / len, z: 0 } // left-hand normal
  const zAxis: Vec3 = { x: 0, y: 0, z: 1 }

  return { origin: { x: p1.x, y: p1.y, z: 0 }, xAxis, yAxis, zAxis }
}

/**
 * Transform wall-local coords (distAlong, offset) to world 3D.
 * Height is added to z separately.
 */
export function wallToWorld(frame: WallFrame, distAlong: number, offset: number, height = 0): Vec3 {
  return {
    x: frame.origin.x + frame.xAxis.x * distAlong + frame.yAxis.x * offset,
    y: frame.origin.y + frame.xAxis.y * distAlong + frame.yAxis.y * offset,
    z: height,
  }
}

/**
 * Transform world point to wall-local coordinates.
 */
export function worldToWall(frame: WallFrame, world: Vec3): { distAlong: number; offset: number; height: number } {
  const rel = { x: world.x - frame.origin.x, y: world.y - frame.origin.y, z: world.z - frame.origin.z }
  return {
    distAlong: vec3Dot(rel, frame.xAxis),
    offset: vec3Dot(rel, frame.yAxis),
    height: vec3Dot(rel, frame.zAxis),
  }
}

// ─── 2D Geometry Utilities ───────────────────────────────────────────

export function lineLineIntersection(l1: Line2D, l2: Line2D): Vec2 | null {
  const { start: p1, end: p2 } = l1
  const { start: p3, end: p4 } = l2

  const denom = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x)
  if (Math.abs(denom) < 1e-10) return null

  const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / denom

  return {
    x: p1.x + t * (p2.x - p1.x),
    y: p1.y + t * (p2.y - p1.y),
  }
}

export function pointOnLineSegment(pt: Vec2, line: Line2D, tolerance = 0.01): boolean {
  const { start, end } = line
  const dx = end.x - start.x
  const dy = end.y - start.y
  const lenSq = dx * dx + dy * dy
  if (lenSq === 0) return Math.hypot(pt.x - start.x, pt.y - start.y) < tolerance

  const t = Math.max(0, Math.min(1, ((pt.x - start.x) * dx + (pt.y - start.y) * dy) / lenSq))
  const nearest = { x: start.x + t * dx, y: start.y + t * dy }
  return Math.hypot(pt.x - nearest.x, pt.y - nearest.y) < tolerance
}

export function polylineCumulativeDistances(points: Vec2[]): number[] {
  const dists = [0]
  for (let i = 1; i < points.length; i++) {
    const d = vec2Distance(points[i - 1]!, points[i]!)
    dists.push(dists[i - 1]! + d)
  }
  return dists
}

export function polylineTotalLength(points: Vec2[]): number {
  const dists = polylineCumulativeDistances(points)
  return dists.length > 0 ? dists[dists.length - 1]! : 0
}

export function pointAtDistance(points: Vec2[], dist: number): Vec2 | null {
  const dists = polylineCumulativeDistances(points)
  if (points.length === 0) return null
  if (dist <= 0) return points[0]!
  const total = dists[dists.length - 1]!
  if (dist >= total) return points[points.length - 1]!

  for (let i = 1; i < dists.length; i++) {
    if (dist <= dists[i]!) {
      const segLen = dists[i]! - dists[i - 1]!
      const t = segLen > 0 ? (dist - dists[i - 1]!) / segLen : 0
      return {
        x: points[i - 1]!.x + t * (points[i]!.x - points[i - 1]!.x),
        y: points[i - 1]!.y + t * (points[i]!.y - points[i - 1]!.y),
      }
    }
  }
  return null
}

// ─── Boolean / Bounding Box Operations ────────────────────────────────

export function rectContainsPoint(rect: Rect, pt: Vec2): boolean {
  return pt.x >= rect.x && pt.x <= rect.x + rect.width && pt.y >= rect.y && pt.y <= rect.y + rect.height
}

export function rectUnion(a: Rect, b: Rect): Rect {
  const x = Math.min(a.x, b.x)
  const y = Math.min(a.y, b.y)
  const right = Math.max(a.x + a.width, b.x + b.width)
  const bottom = Math.max(a.y + a.height, b.y + b.height)
  return { x, y, width: right - x, height: bottom - y }
}

export function rectIntersection(a: Rect, b: Rect): Rect | null {
  const x = Math.max(a.x, b.x)
  const y = Math.max(a.y, b.y)
  const right = Math.min(a.x + a.width, b.x + b.width)
  const bottom = Math.min(a.y + a.height, b.y + b.height)
  if (right <= x || bottom <= y) return null
  return { x, y, width: right - x, height: bottom - y }
}

export function computeBoundingBox(points: Vec2[]): Rect | null {
  if (points.length === 0) return null
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const p of points) {
    if (p.x < minX) minX = p.x
    if (p.y < minY) minY = p.y
    if (p.x > maxX) maxX = p.x
    if (p.y > maxY) maxY = p.y
  }
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
}