import { describe, expect, it } from 'vitest'

import { THEMES, THEME_BY_NAME } from './themes'
import { THEME_NAMES } from './schema'

/**
 * The design picker's copy is derived from the token documents rather than
 * written separately, so the site cannot advertise a design the tokens do not
 * actually deliver. These tests guard that derivation.
 */
describe('theme summaries', () => {
  it('describes every shipped theme, in order', () => {
    expect(THEMES.map((entry) => entry.name)).toEqual([...THEME_NAMES])
  })

  it.each(THEMES)('$name has a headline sentence', ({ headline }) => {
    expect(headline.length).toBeGreaterThan(0)
    expect(headline.endsWith('.')).toBe(true)
  })

  it.each(THEMES)(
    '$name has supporting detail beyond the headline',
    ({ detail }) => {
      expect(detail.length).toBeGreaterThan(0)
    }
  )

  it.each(THEMES)('$name previews five colours as hex', ({ swatches }) => {
    expect(swatches).toHaveLength(5)

    for (const swatch of swatches) {
      expect(swatch).toMatch(/^#[0-9a-f]{6}$/)
    }
  })

  it('keys every summary by its own name', () => {
    for (const name of THEME_NAMES) {
      expect(THEME_BY_NAME[name]).toBe(
        THEMES.find((entry) => entry.name === name)
      )
    }
  })

  it('gives each theme a visually distinct preview', () => {
    const signatures = THEMES.map((entry) => entry.swatches.join())

    expect(new Set(signatures).size).toBe(THEMES.length)
  })
})
