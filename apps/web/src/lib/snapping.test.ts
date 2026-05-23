import { gridSnap, orthoSnap, snapPoint } from './snapping'

describe('gridSnap', () => {
  it('snaps to 1 inch grid (1/12 ft)', () => {
    expect(gridSnap(1.1, 1/12)).toBeCloseTo(1.0833, 3)
    expect(gridSnap(1.5, 1/12)).toBeCloseTo(1.5, 3)
  })
  it('snaps at zoom=1 (1ft = 3px)', () => {
    // input 0.4 is ~4.8 inches → should snap to 1/12 (1 inch) grid as 5/12 ft
    expect(gridSnap(0.4, 1/12)).toBeCloseTo(5/12, 3) // 0.4 ft snaps to 5 inches → 0.4167 ft
  })
})

describe('orthoSnap', () => {
  it('constrains to 0° when dx > dy (horizontal)', () => {
    const result = orthoSnap({ x: 5, y: 3 }, { x: 0, y: 0 })
    expect(result.y).toBeCloseTo(0, 3)
  })
  it('constrains to 90° when dy > dx (vertical)', () => {
    const result = orthoSnap({ x: 3, y: 5 }, { x: 0, y: 0 })
    expect(result.x).toBeCloseTo(0, 3)
  })
})

describe('snapPoint', () => {
  const existingEndpoints = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }]
  it('snaps to endpoint within threshold', () => {
    const result = snapPoint({ x: 0.1, y: 0 }, existingEndpoints, 1)
    expect(result.x).toBeCloseTo(0, 2)
    expect(result.y).toBeCloseTo(0, 2)
  })
  it('returns original if no endpoint nearby', () => {
    const result = snapPoint({ x: 5, y: 5 }, existingEndpoints, 1)
    expect(result.x).toBeCloseTo(5, 2)
  })
})