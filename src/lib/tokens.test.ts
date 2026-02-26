import { describe, it, expect } from 'vitest'
import Tokens, { fontFamilyToCss } from './tokens'
import rawTokens from './common.tokens.json'

describe('common.tokens.json DTCG structure', () => {
  it('has a root $description', () => {
    expect(rawTokens.$description).toBeDefined()
    expect(typeof rawTokens.$description).toBe('string')
  })

  describe('sizes group', () => {
    it('declares $type "dimension" at group level', () => {
      expect(Tokens.sizes.$type).toBe('dimension')
    })

    const dimensionTokens = [
      ['xsmall', 0.5, 'rem'],
      ['small', 1, 'rem'],
      ['medium', 1.5, 'rem'],
      ['large', 2, 'rem'],
      ['xlarge', 3, 'rem'],
      ['lineHeight', 1.3, 'rem']
    ] as const

    it.each(dimensionTokens)(
      'sizes.%s has $value with value=%s and unit=%s',
      (name, expectedValue, expectedUnit) => {
        const token = Tokens.sizes[name]
        expect(token.$value).toBeDefined()
        expect(token.$value.value).toBe(expectedValue)
        expect(token.$value.unit).toBe(expectedUnit)
      }
    )

    it('has breakpoint sub-group with dimension tokens', () => {
      for (const name of ['small', 'medium', 'large'] as const) {
        const token = Tokens.sizes.breakpoints[name]
        expect(token.$value).toBeDefined()
        expect(typeof token.$value.value).toBe('number')
        expect(token.$value.unit).toBe('rem')
      }
    })

    it('has padding sub-group with dimension tokens', () => {
      for (const name of [
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge'
      ] as const) {
        const token = Tokens.sizes.padding[name]
        expect(token.$value).toBeDefined()
        expect(typeof token.$value.value).toBe('number')
        expect(token.$value.unit).toBe('rem')
      }
    })

    it('has fonts sub-group with dimension tokens', () => {
      for (const name of ['small', 'medium', 'large'] as const) {
        const token = Tokens.sizes.fonts[name]
        expect(token.$value).toBeDefined()
        expect(typeof token.$value.value).toBe('number')
        expect(token.$value.unit).toBe('rem')
      }
    })

    it('has headings sub-group with h1-h6 dimension tokens', () => {
      for (let i = 1; i <= 6; i++) {
        const token = Tokens.sizes.headings[`h${i}`]
        expect(token.$value).toBeDefined()
        expect(typeof token.$value.value).toBe('number')
        expect(token.$value.unit).toBe('rem')
      }
    })
  })

  describe('colors group', () => {
    it('declares $type "color" at group level', () => {
      expect(Tokens.colors.$type).toBe('color')
    })

    const colorNames = [
      'primary',
      'primaryVariant',
      'secondary',
      'secondaryVariant',
      'accent',
      'background',
      'surface',
      'error',
      'onPrimary',
      'onSecondary',
      'onBackground',
      'onSurface',
      'onError',
      'textPrimary',
      'textSecondary',
      'border',
      'link',
      'muted',
      'success',
      'warning'
    ]

    it.each(colorNames)(
      'colors.%s has DTCG color $value with colorSpace, components, and hex',
      (name) => {
        const token = Tokens.colors[name]
        expect(token.$value).toBeDefined()
        expect(token.$value.colorSpace).toBe('srgb')
        expect(Array.isArray(token.$value.components)).toBe(true)
        expect(token.$value.components).toHaveLength(3)
        token.$value.components.forEach((c: number) => {
          expect(c).toBeGreaterThanOrEqual(0)
          expect(c).toBeLessThanOrEqual(1)
        })
        expect(token.$value.hex).toMatch(/^#[0-9a-f]{6}$/)
      }
    )

    it('preserves expected hex values', () => {
      expect(Tokens.colors.primary.$value.hex).toBe('#6200ea')
      expect(Tokens.colors.secondary.$value.hex).toBe('#03dac6')
      expect(Tokens.colors.background.$value.hex).toBe('#ffffff')
      expect(Tokens.colors.error.$value.hex).toBe('#b00020')
    })
  })

  describe('fonts group', () => {
    it('declares $type "fontFamily" at group level', () => {
      expect(Tokens.fonts.$type).toBe('fontFamily')
    })

    const fontNames = ['body', 'heading', 'monospace', 'quotes']

    it.each(fontNames)(
      'fonts.%s has $value that is a string array',
      (name) => {
        const token = Tokens.fonts[name]
        expect(token.$value).toBeDefined()
        expect(Array.isArray(token.$value)).toBe(true)
        token.$value.forEach((f: unknown) => {
          expect(typeof f).toBe('string')
        })
      }
    )

    it('preserves expected font family arrays', () => {
      expect(Tokens.fonts.body.$value).toEqual(['Arial', 'sans-serif'])
      expect(Tokens.fonts.heading.$value).toEqual(['Georgia', 'serif'])
      expect(Tokens.fonts.monospace.$value).toEqual([
        'Courier New',
        'monospace'
      ])
      expect(Tokens.fonts.quotes.$value).toEqual([
        'Times New Roman',
        'Times',
        'serif'
      ])
    })
  })

  describe('no legacy properties remain', () => {
    it('does not contain the NOTES group', () => {
      expect(Tokens['### NOTES ###']).toBeUndefined()
    })

    it('color tokens do not have legacy "unit": "hex" property', () => {
      expect(Tokens.colors.primary.unit).toBeUndefined()
    })

    it('dimension tokens do not have top-level value/unit', () => {
      expect(Tokens.sizes.xsmall.value).toBeUndefined()
      expect(Tokens.sizes.xsmall.unit).toBeUndefined()
    })

    it('font tokens do not have legacy "family" property', () => {
      expect(Tokens.fonts.body.family).toBeUndefined()
    })
  })
})

describe('fontFamilyToCss', () => {
  it('joins single-word families without quotes', () => {
    expect(fontFamilyToCss(['Arial', 'sans-serif'])).toBe('Arial, sans-serif')
  })

  it('wraps multi-word families in single quotes', () => {
    expect(fontFamilyToCss(['Courier New', 'monospace'])).toBe(
      "'Courier New', monospace"
    )
  })

  it('handles multiple multi-word families', () => {
    expect(fontFamilyToCss(['Times New Roman', 'Times', 'serif'])).toBe(
      "'Times New Roman', Times, serif"
    )
  })

  it('handles single font family', () => {
    expect(fontFamilyToCss(['Arial'])).toBe('Arial')
  })

  it('handles empty array', () => {
    expect(fontFamilyToCss([])).toBe('')
  })
})

describe('token access patterns used by components', () => {
  it('color access: Tokens.colors.<name>.$value.hex returns hex string', () => {
    expect(typeof Tokens.colors.primary.$value.hex).toBe('string')
    expect(Tokens.colors.primary.$value.hex).toBe('#6200ea')
  })

  it('dimension access: Tokens.sizes.<name>.$value.value returns number', () => {
    expect(typeof Tokens.sizes.xsmall.$value.value).toBe('number')
    expect(Tokens.sizes.xsmall.$value.value).toBe(0.5)
  })

  it('dimension access: Tokens.sizes.<name>.$value.unit returns string', () => {
    expect(typeof Tokens.sizes.xsmall.$value.unit).toBe('string')
    expect(Tokens.sizes.xsmall.$value.unit).toBe('rem')
  })

  it('nested dimension access: Tokens.sizes.padding.<name>.$value', () => {
    const padding = Tokens.sizes.padding.large.$value
    expect(padding.value).toBe(2)
    expect(padding.unit).toBe('rem')
  })

  it('nested dimension access: Tokens.sizes.breakpoints.<name>.$value', () => {
    const bp = Tokens.sizes.breakpoints.medium.$value
    expect(bp.value).toBe(48)
    expect(bp.unit).toBe('rem')
  })

  it('nested dimension access: Tokens.sizes.fonts.<name>.$value', () => {
    const fs = Tokens.sizes.fonts.medium.$value
    expect(fs.value).toBe(1.5)
    expect(fs.unit).toBe('rem')
  })

  it('nested dimension access: Tokens.sizes.headings.h<n>.$value', () => {
    const h1 = Tokens.sizes.headings.h1.$value
    expect(h1.value).toBe(2)
    expect(h1.unit).toBe('rem')
  })

  it('font family access: Tokens.fonts.<name>.$value returns array', () => {
    expect(Array.isArray(Tokens.fonts.body.$value)).toBe(true)
  })

  it('can construct CSS dimension string from token', () => {
    const { value, unit } = Tokens.sizes.xsmall.$value
    expect(`${value}${unit}`).toBe('0.5rem')
  })

  it('can construct CSS font-family string from token', () => {
    const css = fontFamilyToCss(Tokens.fonts.quotes.$value)
    expect(css).toBe("'Times New Roman', Times, serif")
  })
})
