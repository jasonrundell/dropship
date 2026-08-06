import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { THEME_NAMES } from './schema'
import type { TokenShape } from './schema'
import { toCssTree } from './dtcg'
import type { DtcgNode } from './dtcg'

/**
 * Enforces the contract the whole system rests on: **tokens drive form,
 * components drive function.**
 *
 * A component that hard-codes a colour or a dimension cannot be re-themed, and
 * the failure is invisible — the component simply does not change when the
 * theme does. These tests make that mechanically detectable instead of
 * something you have to notice by eye.
 */

const COMPONENTS_DIR = join(import.meta.dirname, '..', 'components')

const styleSheets = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    name: entry.name,
    path: join(COMPONENTS_DIR, entry.name, `${entry.name}.css.ts`)
  }))

/** Strips comments so prose examples in documentation do not trip the checks. */
const withoutComments = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')

describe('components are theme-agnostic', () => {
  it('finds a stylesheet for every component', () => {
    expect(styleSheets.length).toBeGreaterThan(0)
  })

  describe.each(styleSheets)('$name', ({ path }) => {
    const source = withoutComments(readFileSync(path, 'utf8'))

    it('contains no literal colours', () => {
      const literals = [
        ...(source.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []),
        ...(source.match(/\b(?:rgba?|hsla?)\s*\(/g) ?? [])
      ]

      expect(literals, `use a token from vars.color instead`).toEqual([])
    })

    it('contains no literal dimensions', () => {
      // A bare 0 is dimensionless and always safe; anything carrying a unit is
      // a decision that belongs in the token file.
      const literals = source.match(/\b\d*\.?\d+(px|rem|em)\b/g) ?? []

      expect(
        literals,
        `use a token from vars.space, vars.radius, vars.fontSize, or vars.borderWidth instead`
      ).toEqual([])
    })

    it('references the theme contract', () => {
      expect(source).toMatch(/from '\.\.\/\.\.\/lib\/theme\.css'/)
    })
  })
})

describe('every theme satisfies the contract', () => {
  const themes = Object.fromEntries(
    THEME_NAMES.map((name) => [
      name,
      toCssTree<TokenShape>(
        JSON.parse(
          readFileSync(
            join(import.meta.dirname, '..', 'tokens', `${name}.tokens.json`),
            'utf8'
          )
        ) as DtcgNode
      )
    ])
  ) as Record<string, TokenShape>

  const reference = themes.hangar

  const paths = (obj: object, prefix = ''): string[] =>
    Object.entries(obj).flatMap(([key, value]) =>
      typeof value === 'object' && value !== null
        ? paths(value, `${prefix}${key}.`)
        : [`${prefix}${key}`]
    )

  const referencePaths = paths(reference).sort()

  it.each(THEME_NAMES)('%s defines exactly the contract keys', (name) => {
    expect(paths(themes[name]).sort()).toEqual(referencePaths)
  })

  it.each(THEME_NAMES)('%s resolves every token to a CSS value', (name) => {
    const empty = paths(themes[name]).filter((path) => {
      const value = path
        .split('.')
        .reduce<unknown>((acc, key) => (acc as Record<string, unknown>)[key], themes[name])
      return typeof value !== 'string' || value.length === 0
    })

    expect(empty, 'these tokens compiled to nothing').toEqual([])
  })

  /**
   * The point of the exercise. If two themes agree on the structural axes then
   * they will render as the same design in different colours, which is what
   * Zen Garden was demonstrating is avoidable.
   */
  it('themes differ on the structural axes, not just colour', () => {
    const axes = [
      'radius.md',
      'borderWidth.thin',
      'shadow.md',
      'font.heading',
      'letterSpacing.heading',
      'layout.cardAreas'
    ]

    for (const axis of axes) {
      const distinct = new Set(
        THEME_NAMES.map((name) =>
          axis
            .split('.')
            .reduce<unknown>(
              (acc, key) => (acc as Record<string, unknown>)[key],
              themes[name]
            )
        )
      )

      expect(
        distinct.size,
        `every theme uses the same ${axis}; themes would look alike`
      ).toBeGreaterThan(1)
    }
  })

  /**
   * The strongest form of the claim: a theme can change where things sit, not
   * just how they look. If every theme shared one grid-template-areas string,
   * layout would not be themeable and the system would be a palette swap.
   */
  it('themes arrange components differently, not just style them', () => {
    const arrangements = new Set(
      THEME_NAMES.map((name) => themes[name].layout.cardAreas)
    )

    expect(
      arrangements.size,
      'every theme lays Card out identically; layout is not themeable'
    ).toBe(THEME_NAMES.length)
  })

  it('each theme is structurally distinct from every other', () => {
    const signature = (name: string) =>
      ['radius.md', 'borderWidth.thin', 'shadow.md', 'font.heading']
        .map((axis) =>
          axis
            .split('.')
            .reduce<unknown>(
              (acc, key) => (acc as Record<string, unknown>)[key],
              themes[name]
            )
        )
        .join('|')

    const signatures = THEME_NAMES.map(signature)

    expect(new Set(signatures).size).toBe(THEME_NAMES.length)
  })
})
