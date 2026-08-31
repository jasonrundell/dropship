import { style } from '@vanilla-extract/css'

import { media, vars } from '../lib/theme.css'

/**
 * Site chrome — the parts of this page that are not library components:
 * header, footer, code samples, and the design picker.
 *
 * These follow the same rule the components do. Every value is a token, so the
 * page itself is re-themed along with everything on it. If the chrome were
 * hard-coded, switching designs would leave a stubbornly identical frame around
 * a restyled page, and the demonstration would fall apart.
 */

export const page = style({
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.normal,
  minHeight: '100vh'
})

export const banner = style({
  borderBlockEndWidth: vars.borderWidth.thin,
  borderBlockEndStyle: vars.borderStyle.default,
  borderBlockEndColor: vars.color.border,
  background: vars.color.surface,
  paddingBlock: vars.space.sm
})

export const bannerInner = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.md,
  alignItems: 'baseline',
  justifyContent: 'space-between'
})

export const wordmark = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.heading,
  fontSize: vars.fontSize.lg,
  letterSpacing: vars.letterSpacing.heading,
  color: vars.color.text
})

export const nav = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.md,
  fontSize: vars.fontSize.sm
})

export const eyebrow = style({
  display: 'inline-block',
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  letterSpacing: vars.letterSpacing.wide,
  color: vars.color.onAccent,
  background: vars.color.accent,
  paddingBlock: vars.space['3xs'],
  paddingInline: vars.space.xs,
  borderRadius: vars.radius.sm
})

export const heroLogo = style({
  display: 'block',
  width: '100%',
  maxWidth: '34rem',
  height: 'auto',
  marginBlockEnd: vars.space.lg
})

export const lede = style({
  fontSize: vars.fontSize.xl,
  lineHeight: vars.lineHeight.normal,
  color: vars.color.textMuted,
  maxWidth: '46ch',
  margin: 0
})

export const prose = style({
  maxWidth: '68ch',
  margin: 0,
  color: vars.color.text
})

export const muted = style({
  color: vars.color.textMuted
})

export const section = style({
  paddingBlock: vars.space.xl
})

export const codeBlock = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.normal,
  background: vars.color.surface,
  color: vars.color.text,
  borderWidth: vars.borderWidth.thin,
  borderStyle: vars.borderStyle.default,
  borderColor: vars.color.border,
  borderRadius: vars.radius.md,
  padding: vars.space.md,
  margin: 0,
  overflowX: 'auto'
})

export const comment = style({
  color: vars.color.textMuted
})

/** The design picker — this page's version of Zen Garden's design list. */
export const picker = style({
  display: 'grid',
  gap: vars.space.sm,
  gridTemplateColumns: '1fr',
  '@media': {
    [media.md]: { gridTemplateColumns: 'repeat(2, 1fr)' }
  }
})

export const pickerItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3xs'],
  alignItems: 'flex-start',
  textAlign: 'start',
  cursor: 'pointer',
  padding: vars.space.md,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  borderWidth: vars.borderWidth.thin,
  borderStyle: vars.borderStyle.default,
  borderColor: vars.color.border,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.sm,
  transitionProperty: 'box-shadow, border-color, transform',
  transitionDuration: vars.duration.fast,
  transitionTimingFunction: vars.easing.standard,
  ':hover': { boxShadow: vars.shadow.md },
  ':focus-visible': {
    outline: `${vars.borderWidth.thick} solid ${vars.color.focus}`,
    outlineOffset: vars.space['3xs']
  },
  selectors: {
    '&[aria-current="true"]': {
      borderColor: vars.color.primary,
      boxShadow: vars.shadow.lg
    }
  }
})

export const pickerName = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.heading,
  fontSize: vars.fontSize.lg,
  letterSpacing: vars.letterSpacing.heading
})

export const pickerNote = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textMuted
})

export const pickerCurrent = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  letterSpacing: vars.letterSpacing.wide,
  color: vars.color.primary
})

export const contentinfo = style({
  borderBlockStartWidth: vars.borderWidth.thin,
  borderBlockStartStyle: vars.borderStyle.default,
  borderBlockStartColor: vars.color.border,
  background: vars.color.surface,
  paddingBlock: vars.space.xl,
  fontSize: vars.fontSize.sm,
  color: vars.color.textMuted
})

export const swatchRow = style({
  display: 'flex',
  height: vars.space.md,
  borderRadius: vars.radius.sm,
  overflow: 'hidden',
  width: '100%'
})

export const swatch = style({
  flex: 1
})
