import { describe, expect, it } from 'vitest'

import { fontFamilyToCss, toCssTree, toCssValue } from './dtcg'
import type { DtcgNode } from './dtcg'

describe('toCssValue', () => {
  it('renders a dimension as value and unit', () => {
    expect(
      toCssValue({ $type: 'dimension', $value: { value: 1.5, unit: 'rem' } })
    ).toBe('1.5rem')
  })

  it('renders an opaque colour as its hex', () => {
    expect(
      toCssValue({
        $type: 'color',
        $value: { colorSpace: 'srgb', components: [1, 0, 0], hex: '#ff0000' }
      })
    ).toBe('#ff0000')
  })

  it('renders a translucent colour through color-mix', () => {
    expect(
      toCssValue({
        $type: 'color',
        $value: {
          colorSpace: 'srgb',
          components: [0, 0, 0],
          hex: '#000000',
          alpha: 0.5
        }
      })
    ).toBe('color-mix(in srgb, #000000 50%, transparent)')
  })

  it('treats alpha of 1 as opaque', () => {
    expect(
      toCssValue({
        $type: 'color',
        $value: {
          colorSpace: 'srgb',
          components: [0, 0, 0],
          hex: '#000000',
          alpha: 1
        }
      })
    ).toBe('#000000')
  })

  it('quotes font families containing spaces', () => {
    expect(
      toCssValue({
        $type: 'fontFamily',
        $value: ['Berkeley Mono', 'monospace']
      })
    ).toBe("'Berkeley Mono', monospace")
  })

  it('renders a cubic bezier', () => {
    expect(toCssValue({ $type: 'cubicBezier', $value: [0.2, 0, 0, 1] })).toBe(
      'cubic-bezier(0.2, 0, 0, 1)'
    )
  })

  it('renders a duration', () => {
    expect(
      toCssValue({ $type: 'duration', $value: { value: 160, unit: 'ms' } })
    ).toBe('160ms')
  })

  const shadowLayer = {
    color: {
      colorSpace: 'srgb',
      components: [0, 0, 0],
      hex: '#000000',
      alpha: 1
    },
    offsetX: { value: 4, unit: 'px' },
    offsetY: { value: 4, unit: 'px' },
    blur: { value: 0, unit: 'px' },
    spread: { value: 0, unit: 'px' }
  }

  it('renders a single shadow', () => {
    expect(toCssValue({ $type: 'shadow', $value: shadowLayer })).toBe(
      '4px 4px 0px 0px #000000'
    )
  })

  it('renders a multi-layer shadow as a comma-separated list', () => {
    expect(
      toCssValue({ $type: 'shadow', $value: [shadowLayer, shadowLayer] })
    ).toBe('4px 4px 0px 0px #000000, 4px 4px 0px 0px #000000')
  })

  it('passes through a shadow of "none"', () => {
    expect(toCssValue({ $type: 'shadow', $value: 'none' })).toBe('none')
  })

  it.each(['fontWeight', 'number', 'strokeStyle'])('stringifies %s', (type) => {
    expect(toCssValue({ $type: type, $value: 700 })).toBe('700')
  })

  it('stringifies an unrecognised type rather than failing', () => {
    expect(toCssValue({ $type: 'somethingNew', $value: 'raw' })).toBe('raw')
  })

  it('falls back to the inherited group type when the token has none', () => {
    expect(toCssValue({ $value: { value: 2, unit: 'rem' } }, 'dimension')).toBe(
      '2rem'
    )
  })
})

describe('toCssTree', () => {
  it('inherits $type from the enclosing group', () => {
    const tree: DtcgNode = {
      space: {
        $type: 'dimension',
        sm: { $value: { value: 0.5, unit: 'rem' } },
        lg: { $value: { value: 2, unit: 'rem' } }
      }
    }

    expect(toCssTree(tree)).toEqual({ space: { sm: '0.5rem', lg: '2rem' } })
  })

  it('drops $-prefixed metadata', () => {
    const tree: DtcgNode = {
      $description: 'notes',
      color: {
        $type: 'color',
        $description: 'the palette',
        primary: {
          $value: { colorSpace: 'srgb', components: [0, 0, 0], hex: '#000000' }
        }
      }
    }

    expect(toCssTree(tree)).toEqual({ color: { primary: '#000000' } })
  })

  it('lets a nested group override the inherited type', () => {
    const tree: DtcgNode = {
      outer: {
        $type: 'dimension',
        a: { $value: { value: 1, unit: 'rem' } },
        inner: {
          $type: 'number',
          b: { $value: 1.5 }
        }
      }
    }

    expect(toCssTree(tree)).toEqual({
      outer: { a: '1rem', inner: { b: '1.5' } }
    })
  })
})

describe('fontFamilyToCss', () => {
  it('leaves single-word families unquoted', () => {
    expect(fontFamilyToCss(['Georgia', 'serif'])).toBe('Georgia, serif')
  })
})
