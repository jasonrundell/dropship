import { createVar, style } from '@vanilla-extract/css'

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

export const intro = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xs,
  maxWidth: '46rem'
})

export const title = style({
  margin: 0,
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.heading,
  fontSize: vars.fontSize['2xl'],
  letterSpacing: vars.letterSpacing.heading,
  lineHeight: vars.lineHeight.tight,
  // Theme names are lowercase in the token files, which is how they are
  // written everywhere else in the API. Capitalise for the heading only.
  textTransform: 'capitalize'
})

export const lede = style({
  margin: 0,
  color: vars.color.text
})

export const source = style({
  margin: 0,
  color: vars.color.textMuted,
  fontSize: vars.fontSize.sm
})

export const file = style({
  fontFamily: vars.font.mono,
  color: vars.color.primary
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

/** The colour being shown. Set per swatch, since it is data, not style. */
export const swatchValue = createVar()

/**
 * A colour chip that stays legible whatever it is showing.
 *
 * Two problems the obvious version has. An opaque value equal to the card
 * behind it disappears — `surface`, `onPrimary`, `onAccent` and `onError` are
 * all pure white in Hangar, and rendered as four empty boxes. And a value
 * carrying alpha looks identical to the opaque colour it resolves to against
 * the card.
 *
 * So the value is painted as a gradient layer over a checkerboard, which shows
 * through anything translucent, and the edge is drawn in diluted `text` rather
 * than `border`. `border` is tuned for hairlines between panels and is too
 * faint to bound a white chip on white; `text` is the one colour every design
 * guarantees is readable against `surface`, so a fraction of it always shows.
 */
export const swatch = style({
  height: '3rem',
  borderRadius: vars.radius.sm,
  borderWidth: vars.borderWidth.hairline,
  borderStyle: vars.borderStyle.default,
  borderColor: `color-mix(in srgb, ${vars.color.text} 35%, transparent)`,
  // The first layer paints over the second, so the value sits on the checker.
  backgroundImage: `linear-gradient(${swatchValue}, ${swatchValue}), repeating-conic-gradient(color-mix(in srgb, ${vars.color.text} 14%, transparent) 0% 25%, transparent 0% 50%)`,
  backgroundSize: 'auto, 0.75rem 0.75rem'
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
