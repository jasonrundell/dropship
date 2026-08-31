import {
  createGlobalTheme,
  createGlobalThemeContract
} from '@vanilla-extract/css'

import { toCssTree } from './dtcg'
import type { DtcgNode } from './dtcg'
import type { TokenShape } from './schema'
import { THEME_NAMES } from './schema'

import hangar from '../tokens/hangar.tokens.json'
import broadsheet from '../tokens/broadsheet.tokens.json'
import arcade from '../tokens/arcade.tokens.json'
import cascade from '../tokens/cascade.tokens.json'

/**
 * Compiles the DTCG theme documents into CSS custom properties.
 *
 * One contract, four value sets. Components reference the contract and never a
 * theme directly, which is what makes them theme-agnostic: swapping
 * `data-theme` on any ancestor restyles everything beneath it with no rebuild
 * and no JavaScript.
 *
 * Property names are stable and readable (`--dropship-color-primary`) rather
 * than build-hashed, because they are public API — a consumer can override one
 * in their own stylesheet, and a theme is nothing more than a block of them.
 */

const values = {
  hangar: toCssTree<TokenShape>(hangar as unknown as DtcgNode),
  broadsheet: toCssTree<TokenShape>(broadsheet as unknown as DtcgNode),
  arcade: toCssTree<TokenShape>(arcade as unknown as DtcgNode),
  cascade: toCssTree<TokenShape>(cascade as unknown as DtcgNode)
} satisfies Record<string, TokenShape>

/** The default theme. Also the source of the contract's shape. */
export const DEFAULT_THEME = 'hangar'

export const vars = createGlobalThemeContract(
  values[DEFAULT_THEME],
  (_v, path) => ['dropship', ...path].join('-')
)

// The default theme lands on :root so a consumer gets a working system from
// importing the stylesheet alone, with no wrapper element required.
createGlobalTheme(':root', vars, values[DEFAULT_THEME])

for (const name of THEME_NAMES) {
  if (name === DEFAULT_THEME) continue
  createGlobalTheme(`[data-theme='${name}']`, vars, values[name])
}

// Applying the default explicitly too, so `data-theme="hangar"` works on a
// nested element and can override an ancestor set to something else.
createGlobalTheme(
  `[data-theme='${DEFAULT_THEME}']`,
  vars,
  values[DEFAULT_THEME]
)

/** Media query strings. vanilla-extract needs these as literals, not vars. */
export const media = {
  sm: `(min-width: ${values[DEFAULT_THEME].breakpoint.sm})`,
  md: `(min-width: ${values[DEFAULT_THEME].breakpoint.md})`,
  lg: `(min-width: ${values[DEFAULT_THEME].breakpoint.lg})`
}

export { THEME_NAMES }
export type { ThemeName } from './schema'
