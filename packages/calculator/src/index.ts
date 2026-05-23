/**
 * Imperial length arithmetic for FRMX.
 * All dimension math flows through this package.
 * Supports feet-inches strings, fractions (1/4", 1/8", 1/16"), and decimal inches.
 */

/** Smallest supported fraction denominator */
export const FRACTION_DENOM = 16

/** Conversion factors */
export const INCHES_PER_FOOT = 12
export const FEET_PER_METER = 3.28084
export const INCHES_PER_METER = INCHES_PER_FOOT * FEET_PER_METER

/**
 * Parse a feet-inches string into total inches.
 * Formats: "10'-6"", "10' 6\"", "10'-6", "126", "10'-6 3/4", "6 3/4", "6-3/4"
 */
export function parseLengthString(input: string): number {
  const s = input.trim()
  if (!s) return 0

  // Pure decimal or integer (no feet/inches markers) → treated as inches
  if (/^\d+\.?\d*$/.test(s)) {
    return parseFloat(s)
  }

  let totalInches = 0
  let remaining = s

  // ── Feet part: "10'" or "10'" or "10' "
  const feetMatch = remaining.match(/^(\d+)'(?:\s+|-)?/)
  if (feetMatch) {
    totalInches += parseInt(feetMatch[1]!, 10) * INCHES_PER_FOOT
    remaining = remaining.slice(feetMatch[0]!.length)
  }

  // ── Inches + optional fraction
  // Pattern: digits, then optionally (-| ) fraction, then optional " or just trailing
  const inchMatch = remaining.match(/^(\d+)(?:\s*-\s*(\d+\/\d+)|(?:\s+(\d+\/\d+)))?\s*"?\s*$/)
  if (inchMatch) {
    totalInches += parseInt(inchMatch[1]!, 10)
    // Fraction from "-3/4" or " 3/4" or "3/4" (no prefix)
    if (inchMatch[2]) {
      totalInches += parseFraction(inchMatch[2]!)
    } else if (inchMatch[3]) {
      totalInches += parseFraction(inchMatch[3]!)
    }
  } else if (remaining.includes('/')) {
    // Just a fraction alone (e.g. "3/4")
    totalInches += parseFraction(remaining)
  } else {
    // Lone number after feet (e.g. just "6" remaining after "10'-")
    const loneNum = remaining.match(/^(\d+)\s*$/)
    if (loneNum) {
      totalInches += parseInt(loneNum[1]!, 10)
    }
  }

  return totalInches
}

/** Parse a fraction string like "3/4" into a decimal */
export function parseFraction(frac: string): number {
  const clean = frac.trim().replace(/\s+/g, '')
  const match = clean.match(/^(\d+)\/(\d+)$/)
  if (!match) return 0
  return parseInt(match[1]!, 10) / parseInt(match[2]!, 10)
}

// GCD for fraction simplification
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/**
 * Convert total inches to a display string like "10'-6 1/4""
 */
export function formatDim(totalInches: number): string {
  const neg = totalInches < 0 ? '-' : ''
  const abs = Math.abs(totalInches)

  if (abs < 1 / FRACTION_DENOM) return '0'

  const inches = Math.floor(abs)
  const frac = abs - inches

  const wholeFrac = Math.round(frac * FRACTION_DENOM)
  if (wholeFrac === 0) {
    const feet = Math.floor(inches / INCHES_PER_FOOT)
    const rem = inches % INCHES_PER_FOOT
    if (feet > 0) return `${neg}${feet}'-${rem}"`
    if (rem > 0) return `${neg}${rem}"`
    return '0'
  }

  const divisor = gcd(wholeFrac, FRACTION_DENOM)
  const num = wholeFrac / divisor
  const den = FRACTION_DENOM / divisor

  const feet = Math.floor(inches / INCHES_PER_FOOT)
  const rem = inches % INCHES_PER_FOOT

  let result = neg
  if (feet > 0) result += `${feet}'-`
  result += `${rem}`
  if (num >= den) {
    // Absorb into inches
  } else if (num > 0) {
    result += ` ${num}/${den}`
  }
  result += '"'

  return result
}

/** Add two lengths in inches */
export function addLengths(a: number, b: number): number {
  return a + b
}

/** Subtract two lengths */
export function subtractLengths(a: number, b: number): number {
  return a - b
}

/** Multiply length by a scalar */
export function multiplyLength(length: number, scalar: number): number {
  return length * scalar
}

/** Divide length by a scalar */
export function divideLength(length: number, scalar: number): number {
  return length / scalar
}

/** Round length to nearest fraction */
export function roundToFraction(length: number, denom = FRACTION_DENOM): number {
  return Math.round(length * denom) / denom
}

/** Compare two lengths */
export function lengthsEqual(a: number, b: number, tolerance = 1 / 128): boolean {
  return Math.abs(a - b) < tolerance
}

// ─── Unit conversion ────────────────────────────────────────────────

/** Convert inches to feet */
export function inchesToFeet(inches: number): number {
  return inches / INCHES_PER_FOOT
}

/** Convert feet to inches */
export function feetToInches(feet: number): number {
  return feet * INCHES_PER_FOOT
}

/** Convert meters to inches */
export function metersToInches(meters: number): number {
  return meters * INCHES_PER_METER
}

/** Convert inches to meters */
export function inchesToMeters(inches: number): number {
  return inches / INCHES_PER_METER
}

// ─── Roof pitch ──────────────────────────────────────────────────────

export interface RoofPitch {
  rise: number
  run: number
  degrees: number
  percent: number
}

/** Parse pitch string like "4:12" or "4/12" to pitch object */
export function parsePitchString(pitch: string): RoofPitch {
  const match = pitch.match(/^(\d+)[:/](\d+)$/)
  if (!match) throw new Error(`Invalid pitch: ${pitch}`)
  const rise = parseInt(match[1]!, 10)
  const run = parseInt(match[2]!, 10)
  const ratio = rise / run
  return {
    rise,
    run,
    degrees: Math.atan2(rise, run) * (180 / Math.PI),
    percent: ratio * 100,
  }
}

/** Convert pitch (rise/run per 12) to degrees */
export function pitchToDegrees(rise: number, run: number): number {
  return Math.atan2(rise, run) * (180 / Math.PI)
}

/** Convert degrees to pitch {rise, run:12} */
export function degreesToPitch(degrees: number): { rise: number; run: number } {
  const radians = degrees * (Math.PI / 180)
  const rise = Math.tan(radians) * 12
  return { rise: Math.round(rise * 16) / 16, run: 12 }
}

/** Format pitch as "4:12" */
export function formatPitch(pitch: RoofPitch): string {
  return `${pitch.rise}:${pitch.run}`
}

// ─── Arithmetic helpers ──────────────────────────────────────────────

export function minLength(...lengths: number[]): number {
  return Math.min(...lengths)
}

export function maxLength(...lengths: number[]): number {
  return Math.max(...lengths)
}

/** Floor to nearest fraction */
export function floorToFraction(length: number, denom = FRACTION_DENOM): number {
  return Math.floor(length * denom) / denom
}

/** Ceiling to nearest fraction */
export function ceilToFraction(length: number, denom = FRACTION_DENOM): number {
  return Math.ceil(length * denom) / denom
}