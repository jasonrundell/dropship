import { describe, expect, it } from 'vitest'

import * as topiary from './index'

/**
 * The export list is the package's public API. Anything added here is a
 * feature; anything removed or renamed is a breaking change.
 */
const EXPECTED_COMPONENTS = [
  'Blockquote',
  'Box',
  'Button',
  'Card',
  'Container',
  'Grid',
  'Heading',
  'Link',
  'Row',
  'Spacer'
]

/**
 * Breakpoint and theme metadata, re-exported as plain JS values so a consumer
 * can align its own build-time responsive styles or theme switcher with
 * Topiary's without guessing at values only visible as compiled CSS custom
 * properties.
 */
const EXPECTED_VALUE_EXPORTS = [
  'DEFAULT_THEME',
  'THEME_NAMES',
  'breakpoints',
  'media'
]

const EXPECTED_EXPORTS = [
  ...EXPECTED_COMPONENTS,
  ...EXPECTED_VALUE_EXPORTS
].sort()

describe('public API', () => {
  it('exports exactly the documented components and theme values', () => {
    expect(Object.keys(topiary).sort()).toEqual(EXPECTED_EXPORTS)
  })

  it('exports every component as a renderable value', () => {
    for (const name of EXPECTED_COMPONENTS) {
      const exported = topiary[name as keyof typeof topiary]
      expect(exported, `${name} should be defined`).toBeDefined()
      expect(['function', 'object'], `${name} should be a component`).toContain(
        typeof exported
      )
    }
  })

  it("exports breakpoints as media query strings usable at a consumer's own build time", () => {
    expect(topiary.media.sm).toBe('(min-width: 30rem)')
    expect(topiary.media.md).toBe('(min-width: 48rem)')
    expect(topiary.media.lg).toBe('(min-width: 64rem)')
  })

  it("exports breakpoints as bare literals usable in a consumer's own JS-side responsive math", () => {
    // `media` wraps these in a `(min-width: ...)` media-query string for
    // vanilla-extract's own use; a consumer doing plain JS comparisons (e.g.
    // against window.innerWidth converted to rem) needs the bare value too.
    expect(topiary.breakpoints).toEqual({
      sm: '30rem',
      md: '48rem',
      lg: '64rem'
    })
  })

  it('exports the theme name list and the default theme', () => {
    expect(topiary.THEME_NAMES).toEqual([
      'hangar',
      'broadsheet',
      'arcade',
      'cascade'
    ])
    expect(topiary.DEFAULT_THEME).toBe('hangar')
  })
})
