import { describe, it, expect } from 'vitest'
import { centerlineToSegments, buildSegmentFrame, wallToWorldCoords } from '../wallToGeometry'
import type { Point2D } from '@frmx/geometry'

describe('wallToGeometry', () => {
  describe('centerlineToSegments', () => {
    it('returns empty array for fewer than 2 points', () => {
      expect(centerlineToSegments([])).toEqual([])
      expect(centerlineToSegments([{ x: 0, y: 0 }])).toEqual([])
    })

    it('returns single segment for two points', () => {
      const points: Point2D[] = [
        { x: 0, y: 0 },
        { x: 144, y: 0 }, // 12 feet
      ]
      const segments = centerlineToSegments(points)
      expect(segments).toHaveLength(1)
      expect(segments[0]!.start.x).toBe(0)
      expect(segments[0]!.start.y).toBe(0)
      expect(segments[0]!.end.x).toBe(144)
      expect(segments[0]!.end.y).toBe(0)
      expect(segments[0]!.length).toBe(144)
    })

    it('returns multiple segments for polyline', () => {
      const points: Point2D[] = [
        { x: 0, y: 0 },
        { x: 144, y: 0 },
        { x: 144, y: 96 },
      ]
      const segments = centerlineToSegments(points)
      expect(segments).toHaveLength(2)
      expect(segments[0]!.length).toBe(144)
      expect(segments[1]!.length).toBe(96)
    })

    it('calculates length correctly', () => {
      const points: Point2D[] = [
        { x: 0, y: 0 },
        { x: 36, y: 48 }, // 5-12-13 triangle
      ]
      const segments = centerlineToSegments(points)
      expect(segments[0]!.length).toBeCloseTo(60, 1) // sqrt(36² + 48²) ≈ 60
    })
  })

  describe('buildSegmentFrame', () => {
    it('computes local frame for horizontal segment', () => {
      const segment = {
        start: { x: 0, y: 0 },
        end: { x: 144, y: 0 },
        length: 144,
        direction: { x: 1, y: 0 },
        normal: { x: 0, y: 1 }, // perpCW of direction
      }
      const frame = buildSegmentFrame(segment)
      expect(frame.origin.x).toBe(0)
      expect(frame.origin.y).toBe(0)
      expect(frame.direction.x).toBeCloseTo(1, 5)
      expect(frame.normal.x).toBeCloseTo(0, 5)
      expect(frame.normal.y).toBeCloseTo(1, 5)
    })

    it('computes local frame for vertical segment', () => {
      const segment = {
        start: { x: 144, y: 0 },
        end: { x: 144, y: 96 },
        length: 96,
        direction: { x: 0, y: 1 },
        normal: { x: -1, y: 0 }, // perpCW of direction
      }
      const frame = buildSegmentFrame(segment)
      expect(frame.direction.x).toBeCloseTo(0, 5)
      expect(frame.direction.y).toBeCloseTo(1, 5)
      expect(frame.normal.x).toBeCloseTo(-1, 5)
      expect(frame.normal.y).toBeCloseTo(0, 5)
    })
  })

  describe('wallToWorldCoords', () => {
    it('maps wall-local coordinates to world space', () => {
      const frame = {
        origin: { x: 0, y: 0, z: 0 },
        direction: { x: 1, y: 0, z: 0 },
        normal: { x: 0, y: 1, z: 0 },
      }
      const point = wallToWorldCoords(frame, 72, 0, 96)
      expect(point[0]).toBeCloseTo(72, 1) // x
      expect(point[1]).toBeCloseTo(0, 1)  // y (offset = 0)
      expect(point[2]).toBeCloseTo(96, 1) // z = height
    })

    it('applies normal offset correctly', () => {
      const frame = {
        origin: { x: 0, y: 0, z: 0 },
        direction: { x: 1, y: 0, z: 0 },
        normal: { x: 0, y: 1, z: 0 },
      }
      const point = wallToWorldCoords(frame, 0, 3.5, 96)
      expect(point[0]).toBeCloseTo(0, 1)
      expect(point[1]).toBeCloseTo(3.5, 1) // offset in normal direction
      expect(point[2]).toBeCloseTo(96, 1)
    })
  })
})