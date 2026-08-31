import { THEME_NAMES } from './schema'
import type { ThemeName } from './schema'

import hangar from '../tokens/hangar.tokens.json'
import broadsheet from '../tokens/broadsheet.tokens.json'
import arcade from '../tokens/arcade.tokens.json'
import cascade from '../tokens/cascade.tokens.json'

/**
 * Every theme document carries a `$description` and a full colour group; a test
 * in `theme-agnostic.test.ts` enforces both, so this type has no optional
 * fields and needs no fallbacks.
 */
type TokenDoc = {
  $description: string
  color: Record<string, { $value: { hex: string } }>
}

const DOCS: Record<ThemeName, TokenDoc> = {
  hangar: hangar as unknown as TokenDoc,
  broadsheet: broadsheet as unknown as TokenDoc,
  arcade: arcade as unknown as TokenDoc,
  cascade: cascade as unknown as TokenDoc
}

/** Colours shown in a theme's preview strip, in the order they are displayed. */
const PREVIEW_KEYS = ['background', 'surface', 'primary', 'accent', 'text']

export type ThemeSummary = {
  name: ThemeName
  /** The first sentence of the theme's `$description`. */
  headline: string
  /** The rest of the description. */
  detail: string
  swatches: string[]
}

/**
 * Theme metadata for the design picker, derived from the token documents
 * themselves so the site cannot describe a design the tokens do not deliver.
 */
export const THEMES: ThemeSummary[] = THEME_NAMES.map((name) => {
  const doc = DOCS[name]
  const [headline, ...rest] = doc.$description.split(/(?<=\.)\s+/)

  return {
    name,
    headline: headline.trim(),
    detail: rest.join(' ').trim(),
    swatches: PREVIEW_KEYS.map((key) => doc.color[key].$value.hex)
  }
})

/**
 * The same summaries keyed by name, for callers that already hold a
 * `ThemeName` and would otherwise need a `find` TypeScript cannot prove
 * succeeds.
 */
export const THEME_BY_NAME = Object.fromEntries(
  THEMES.map((summary) => [summary.name, summary])
) as Record<ThemeName, ThemeSummary>
