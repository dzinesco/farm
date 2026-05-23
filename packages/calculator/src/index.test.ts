/**
 * @frmx/calculator — comprehensive tests
 */
import { describe, it, expect } from 'vitest'
import {
  parseLengthString,
  parseFraction,
  formatDim,
  addLengths,
  subtractLengths,
  multiplyLength,
  divideLength,
  roundToFraction,
  lengthsEqual,
  inchesToFeet,
  feetToInches,
  metersToInches,
  inchesToMeters,
  parsePitchString,
  pitchToDegrees,
  degreesToPitch,
  formatPitch,
  minLength,
  maxLength,
  floorToFraction,
  ceilToFraction,
  FRACTION_DENOM,
  INCHES_PER_FOOT,
  FEET_PER_METER,
  INCHES_PER_METER,
} from '../src/index'

describe('FRACTION_DENOM', () => {
  it('is 16', () => expect(FRACTION_DENOM).toBe(16))
})

describe('INCHES_PER_FOOT', () => {
  it('is 12', () => expect(INCHES_PER_FOOT).toBe(12))
})

describe('parseLengthString', () => {
  it('parses decimal inches', () => {
    expect(parseLengthString('10.5')).toBe(10.5)
    expect(parseLengthString('126')).toBe(126)
    expect(parseLengthString('0')).toBe(0)
  })

  it('parses feet-inches strings', () => {
    expect(parseLengthString("10'-6\"")).toBeCloseTo(126, 1)
    expect(parseLengthString("10'-6")).toBeCloseTo(126, 1)
    expect(parseLengthString('10\' 6"')).toBeCloseTo(126, 1)
  })

  it('parses feet only', () => {
    expect(parseLengthString("8'")).toBeCloseTo(96, 1)
  })

  it('parses inches with fractions', () => {
    expect(parseLengthString('6 3/4')).toBeCloseTo(6.75, 2)
    expect(parseLengthString('6-3/4')).toBeCloseTo(6.75, 2)
    expect(parseLengthString('3/4')).toBeCloseTo(0.75, 2)
  })

  it('parses combined feet-inches with fraction', () => {
    const result = parseLengthString("10'-6 3/4")
    expect(result).toBeCloseTo(126.75, 2)
  })

  it('returns 0 for empty string', () => {
    expect(parseLengthString('')).toBe(0)
    expect(parseLengthString('   ')).toBe(0)
  })
})

describe('parseFraction', () => {
  it('parses simple fractions', () => {
    expect(parseFraction('3/4')).toBeCloseTo(0.75, 3)
    expect(parseFraction('1/4')).toBeCloseTo(0.25, 3)
    expect(parseFraction('1/8')).toBeCloseTo(0.125, 3)
    expect(parseFraction('1/16')).toBeCloseTo(0.0625, 3)
    expect(parseFraction('15/16')).toBeCloseTo(0.9375, 3)
  })

  it('handles whitespace', () => {
    expect(parseFraction(' 3 / 4 ')).toBeCloseTo(0.75, 3)
  })

  it('returns 0 for invalid', () => {
    expect(parseFraction('invalid')).toBe(0)
    expect(parseFraction('')).toBe(0)
  })
})

describe('formatDim', () => {
  it('formats feet-inches with fraction', () => {
    const result = formatDim(126.75)
    expect(result).toContain("'")
    expect(result).toContain('"')
  })

  it('formats pure inches with fraction', () => {
    const result = formatDim(6.75)
    expect(result).toContain('"')
    expect(result).toContain('6')
  })

  it('formats 0 correctly', () => {
    expect(formatDim(0)).toBe('0')
  })

  it('formats whole feet', () => {
    const result = formatDim(96) // 8 feet
    expect(result).toContain("8'")
  })

  it('handles negative', () => {
    expect(formatDim(-6.75)).toContain('-')
  })

  it('formats very small fractions below threshold as 0', () => {
    expect(formatDim(0.03)).toBe('0') // below 1/16
  })
})

describe('arithmetic', () => {
  describe('addLengths', () => {
    it('adds two lengths', () => {
      expect(addLengths(10, 5)).toBe(15)
      expect(addLengths(126.5, 6.25)).toBeCloseTo(132.75, 2)
    })
  })

  describe('subtractLengths', () => {
    it('subtracts lengths', () => {
      expect(subtractLengths(10, 5)).toBe(5)
      expect(subtractLengths(126, 6.75)).toBeCloseTo(119.25, 2)
    })
  })

  describe('multiplyLength', () => {
    it('multiplies by scalar', () => {
      expect(multiplyLength(10, 2)).toBe(20)
      expect(multiplyLength(6.75, 2)).toBeCloseTo(13.5, 2)
    })
  })

  describe('divideLength', () => {
    it('divides by scalar', () => {
      expect(divideLength(20, 2)).toBe(10)
      expect(divideLength(126, 3)).toBeCloseTo(42, 2)
    })
  })

  describe('roundToFraction', () => {
    it('rounds to nearest 1/16', () => {
      expect(roundToFraction(10.3125)).toBeCloseTo(10.3125, 3)
      expect(roundToFraction(10.33)).toBeCloseTo(10.3125, 3)
      expect(roundToFraction(10.34)).toBeCloseTo(10.3125, 3)
    })

    it('rounds to custom denominator', () => {
      expect(roundToFraction(10.33, 8)).toBeCloseTo(10.375, 2)
    })
  })

  describe('lengthsEqual', () => {
    it('compares with custom tolerance', () => {
      expect(lengthsEqual(10, 10.001, 0.01)).toBe(true)
      expect(lengthsEqual(10, 10.01, 0.005)).toBe(false)
    })

    it('uses default tolerance of 1/128', () => {
      expect(lengthsEqual(10, 10 + 1/129)).toBe(true) // 1/129 < 1/128 → in tolerance
      expect(lengthsEqual(10, 10 + 1/65)).toBe(false)  // 1/65 > 1/128 → out of tolerance
    })
  })
})

describe('unit conversion', () => {
  describe('inchesToFeet', () => {
    it('converts inches to feet', () => {
      expect(inchesToFeet(12)).toBe(1)
      expect(inchesToFeet(144)).toBe(12)
    })
  })

  describe('feetToInches', () => {
    it('converts feet to inches', () => {
      expect(feetToInches(1)).toBe(12)
      expect(feetToInches(8)).toBe(96)
    })
  })

  describe('metersToInches', () => {
    it('converts meters to inches', () => {
      const result = metersToInches(1)
      expect(result).toBeCloseTo(INCHES_PER_METER, 1)
    })
  })

  describe('inchesToMeters', () => {
    it('converts inches to meters', () => {
      const result = inchesToMeters(INCHES_PER_METER)
      expect(result).toBeCloseTo(1, 2)
    })
  })
})

describe('roof pitch', () => {
  describe('parsePitchString', () => {
    it('parses 4:12 pitch', () => {
      const pitch = parsePitchString('4:12')
      expect(pitch.rise).toBe(4)
      expect(pitch.run).toBe(12)
      expect(pitch.percent).toBeCloseTo(33.33, 1)
      expect(pitch.degrees).toBeCloseTo(18.43, 1)
    })

    it('parses 8:12 pitch', () => {
      const pitch = parsePitchString('8:12')
      expect(pitch.rise).toBe(8)
      expect(pitch.percent).toBeCloseTo(66.67, 1)
      expect(pitch.degrees).toBeCloseTo(33.69, 1)
    })

    it('parses with slash separator', () => {
      const pitch = parsePitchString('4/12')
      expect(pitch.rise).toBe(4)
      expect(pitch.run).toBe(12)
    })

    it('throws on invalid', () => {
      expect(() => parsePitchString('invalid')).toThrow()
      expect(() => parsePitchString('4')).toThrow()
    })
  })

  describe('pitchToDegrees', () => {
    it('converts 4:12 to degrees', () => {
      const deg = pitchToDegrees(4, 12)
      expect(deg).toBeCloseTo(18.43, 1)
    })

    it('converts 12:12 to 45 degrees', () => {
      const deg = pitchToDegrees(12, 12)
      expect(deg).toBeCloseTo(45, 1)
    })
  })

  describe('degreesToPitch', () => {
    it('converts 45 degrees to rise per 12', () => {
      const p = degreesToPitch(45)
      expect(p.run).toBe(12)
      expect(p.rise).toBeCloseTo(12, 1)
    })

    it('converts 18.43 degrees to 4:12', () => {
      const p = degreesToPitch(18.43)
      expect(p.rise).toBeCloseTo(4, 0)
    })
  })

  describe('formatPitch', () => {
    it('formats as "rise:run"', () => {
      const pitch = parsePitchString('4:12')
      expect(formatPitch(pitch)).toBe('4:12')
    })
  })
})

describe('minLength / maxLength', () => {
  it('finds minimum', () => {
    expect(minLength(10, 5, 8)).toBe(5)
    expect(minLength(3)).toBe(3)
  })

  it('finds maximum', () => {
    expect(maxLength(10, 5, 8)).toBe(10)
    expect(maxLength(7)).toBe(7)
  })
})

describe('floorToFraction / ceilToFraction', () => {
  it('floors to 1/16', () => {
    expect(floorToFraction(10.34)).toBeCloseTo(10.3125, 3)
    expect(floorToFraction(10.4)).toBeCloseTo(10.375, 3)
  })

  it('ceilings to 1/16', () => {
    expect(ceilToFraction(10.31)).toBeCloseTo(10.3125, 3)
    expect(ceilToFraction(10.34)).toBeCloseTo(10.375, 3)
  })
})

describe('roundtrip: parse → format', () => {
  it('parse then format produces valid string', () => {
    const input = "10'-6 3/4"
    const parsed = parseLengthString(input)
    const formatted = formatDim(parsed)
    expect(formatted).toContain("'")
  })

  it('format then parse roundtrip for whole feet', () => {
    const input = 96
    const formatted = formatDim(input)
    const parsed = parseLengthString(formatted)
    expect(parsed).toBeCloseTo(input, 2)
  })
})