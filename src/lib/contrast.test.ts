import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { CONTRAST_PAIRS, contrastRatio, luminance, parseHex } from './contrast'
import { THEME_NAMES } from './schema'

/**
 * A design that cannot be read is not a design.
 *
 * This is the check that makes "every theme is accessible" a fact rather than
 * an aspiration: a theme whose colours fail WCAG on any pairing the components
 * actually render will fail the build. It caught four real failures in Arcade
 * and Cascade the first time it ran, all of which were invisible until a
 * browser rendered the page.
 */

const palette = (theme: string): Record<string, string> => {
  const doc = JSON.parse(
    readFileSync(
      join(import.meta.dirname, '..', 'tokens', `${theme}.tokens.json`),
      'utf8'
    )
  ) as { color: Record<string, { $value: { hex: string } }> }

  return Object.fromEntries(
    Object.entries(doc.color)
      .filter(([key]) => !key.startsWith('$'))
      .map(([key, token]) => [key, token.$value.hex])
  )
}

describe('contrast maths', () => {
  it('parses shorthand and longhand hex alike', () => {
    expect(parseHex('#fff')).toEqual([255, 255, 255])
    expect(parseHex('#ffffff')).toEqual([255, 255, 255])
  })

  it('puts black and white at the extremes of luminance', () => {
    expect(luminance('#000000')).toBe(0)
    expect(luminance('#ffffff')).toBe(1)
  })

  it('gives black on white the maximum ratio of 21', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5)
  })

  it('gives a colour against itself the minimum ratio of 1', () => {
    expect(contrastRatio('#6b7280', '#6b7280')).toBeCloseTo(1, 5)
  })

  it('is symmetric', () => {
    expect(contrastRatio('#123456', '#fedcba')).toBeCloseTo(
      contrastRatio('#fedcba', '#123456'),
      10
    )
  })
})

describe.each(THEME_NAMES)('%s meets WCAG AA', (theme) => {
  const colors = palette(theme)

  it.each(CONTRAST_PAIRS)(
    '$foreground on $background — $where',
    ({ foreground, background, where, minRatio }) => {
      const fg = colors[foreground]
      const bg = colors[background]

      expect(fg, `${theme} is missing color.${foreground}`).toBeDefined()
      expect(bg, `${theme} is missing color.${background}`).toBeDefined()

      const ratio = contrastRatio(fg, bg)

      expect(
        Number(ratio.toFixed(2)),
        `${theme}: ${foreground} (${fg}) on ${background} (${bg}) is ` +
          `${ratio.toFixed(2)}:1, below the ${minRatio}:1 needed for ${where}. ` +
          `Darken or lighten one of them.`
      ).toBeGreaterThanOrEqual(minRatio)
    }
  )
})
