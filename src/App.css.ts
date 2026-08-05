import { style } from '@vanilla-extract/css'

import { vars } from './lib/theme.css'

export const gallery = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  minHeight: '100vh'
})

export const pane = style({
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.normal,
  paddingBlock: vars.space.lg,
  paddingInline: vars.space.xs,
  minWidth: 0,
  borderInlineEndWidth: vars.borderWidth.hairline,
  borderInlineEndStyle: vars.borderStyle.default,
  borderInlineEndColor: vars.color.border
})

export const label = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  letterSpacing: vars.letterSpacing.wide,
  color: vars.color.onPrimary,
  background: vars.color.primary,
  paddingBlock: vars.space['3xs'],
  paddingInline: vars.space.xs,
  marginInlineStart: vars.space.md,
  marginBlockEnd: vars.space.md,
  display: 'inline-block',
  borderRadius: vars.radius.sm
})
