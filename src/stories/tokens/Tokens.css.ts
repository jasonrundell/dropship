import { style } from '@vanilla-extract/css'

import { vars } from '../../lib/theme.css'

export const page = style({
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.body,
  padding: vars.space.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xl
})

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm
})

export const sectionTitle = style({
  margin: 0,
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.heading,
  fontSize: vars.fontSize.lg,
  letterSpacing: vars.letterSpacing.heading,
  color: vars.color.text
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))',
  gap: vars.space.sm
})

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2xs'],
  padding: vars.space.xs,
  background: vars.color.surface,
  borderWidth: vars.borderWidth.hairline,
  borderStyle: vars.borderStyle.default,
  borderColor: vars.color.border,
  borderRadius: vars.radius.md
})

export const swatch = style({
  height: '3rem',
  borderRadius: vars.radius.sm,
  borderWidth: vars.borderWidth.hairline,
  borderStyle: vars.borderStyle.default,
  borderColor: vars.color.border
})

export const sample = style({
  minHeight: '3rem',
  display: 'flex',
  alignItems: 'center',
  color: vars.color.text
})

export const name = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  color: vars.color.textMuted
})
