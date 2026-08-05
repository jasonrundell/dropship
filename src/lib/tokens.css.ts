import {
  createGlobalTheme,
  createGlobalThemeContract
} from '@vanilla-extract/css'

import Tokens, { fontFamilyToCss } from './tokens'

/**
 * Bridges the DTCG token file to CSS custom properties.
 *
 * Every token is emitted as a custom property on :root rather than being
 * inlined at build time. That keeps common.tokens.json the single source of
 * truth, lets consumers override any token without rebuilding the library,
 * and gives a theme switch (dark mode) somewhere to attach.
 *
 * The property names are declared through a contract so they are stable and
 * readable (--dropship-color-primary), not build-hashed. They are part of the
 * public API: overriding --dropship-color-primary in your own stylesheet
 * restyles every component that uses it.
 */

const dimension = (token: { $value: { value: number; unit: string } }) =>
  `${token.$value.value}${token.$value.unit}`

const color = (token: { $value: { hex: string } }) => token.$value.hex

const font = (token: { $value: string[] }) => fontFamilyToCss(token.$value)

const values = {
  size: {
    xsmall: dimension(Tokens.sizes.xsmall),
    small: dimension(Tokens.sizes.small),
    medium: dimension(Tokens.sizes.medium),
    large: dimension(Tokens.sizes.large),
    xlarge: dimension(Tokens.sizes.xlarge),
    lineHeight: dimension(Tokens.sizes.lineHeight)
  },
  padding: {
    xsmall: dimension(Tokens.sizes.padding.xsmall),
    small: dimension(Tokens.sizes.padding.small),
    medium: dimension(Tokens.sizes.padding.medium),
    large: dimension(Tokens.sizes.padding.large),
    xlarge: dimension(Tokens.sizes.padding.xlarge)
  },
  fontSize: {
    small: dimension(Tokens.sizes.fonts.small),
    medium: dimension(Tokens.sizes.fonts.medium),
    large: dimension(Tokens.sizes.fonts.large)
  },
  heading: {
    h1: dimension(Tokens.sizes.headings.h1),
    h2: dimension(Tokens.sizes.headings.h2),
    h3: dimension(Tokens.sizes.headings.h3),
    h4: dimension(Tokens.sizes.headings.h4),
    h5: dimension(Tokens.sizes.headings.h5),
    h6: dimension(Tokens.sizes.headings.h6)
  },
  breakpoint: {
    small: dimension(Tokens.sizes.breakpoints.small),
    medium: dimension(Tokens.sizes.breakpoints.medium),
    large: dimension(Tokens.sizes.breakpoints.large)
  },
  color: {
    primary: color(Tokens.colors.primary),
    primaryVariant: color(Tokens.colors.primaryVariant),
    secondary: color(Tokens.colors.secondary),
    secondaryVariant: color(Tokens.colors.secondaryVariant),
    accent: color(Tokens.colors.accent),
    background: color(Tokens.colors.background),
    surface: color(Tokens.colors.surface),
    error: color(Tokens.colors.error),
    onPrimary: color(Tokens.colors.onPrimary),
    onSecondary: color(Tokens.colors.onSecondary),
    onBackground: color(Tokens.colors.onBackground),
    onSurface: color(Tokens.colors.onSurface),
    onError: color(Tokens.colors.onError),
    textPrimary: color(Tokens.colors.textPrimary),
    textSecondary: color(Tokens.colors.textSecondary),
    border: color(Tokens.colors.border),
    link: color(Tokens.colors.link),
    muted: color(Tokens.colors.muted),
    success: color(Tokens.colors.success),
    warning: color(Tokens.colors.warning)
  },
  font: {
    body: font(Tokens.fonts.body),
    heading: font(Tokens.fonts.heading),
    monospace: font(Tokens.fonts.monospace),
    quotes: font(Tokens.fonts.quotes)
  }
}

const contract = createGlobalThemeContract(values, (_value, path) =>
  ['dropship', ...path].join('-')
)

createGlobalTheme(':root', contract, values)

export const vars = contract

/**
 * Media query strings for the token breakpoints. vanilla-extract needs these
 * as literals, so they are derived once here rather than at each call site.
 */
export const media = {
  medium: `(min-width: ${dimension(Tokens.sizes.breakpoints.medium)})`,
  large: `(min-width: ${dimension(Tokens.sizes.breakpoints.large)})`
}
