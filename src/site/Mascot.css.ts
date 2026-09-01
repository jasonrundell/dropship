import { style } from '@vanilla-extract/css'

import { vars } from '../lib/theme.css'

/**
 * The mascot's palette and frame, expressed entirely as tokens — no colour,
 * width, radius, or shadow below is the mascot's own. Each part maps to the
 * token that means the same thing everywhere else in the system: the hedge is
 * `success` (every design's green), the pot is `primary`, the beak `warning`
 * (every design's amber), outlines are `text` at `borderWidth.thin`. The tile
 * around it is styled like any Card surface. Switching designs re-clips the
 * peacock the same way it restyles the page.
 */

export const figure = style({
  margin: 0,
  inlineSize: '15rem',
  maxInlineSize: '100%',
  padding: vars.space.md,
  background: vars.color.surface,
  borderWidth: vars.borderWidth.thin,
  borderStyle: vars.borderStyle.default,
  borderColor: vars.color.border,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.md
})

export const drawing = style({
  display: 'block',
  inlineSize: '100%',
  blockSize: 'auto'
})

export const caption = style({
  marginBlockStart: vars.space.xs,
  color: vars.color.textMuted,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  letterSpacing: vars.letterSpacing.wide,
  textAlign: 'center'
})

const outlined = {
  stroke: vars.color.text,
  strokeWidth: vars.borderWidth.thin
}

export const hedge = style({ fill: vars.color.success, ...outlined })

export const trunk = style({ fill: vars.color.textMuted, ...outlined })

export const pot = style({ fill: vars.color.primary, ...outlined })

export const stem = style({
  fill: 'none',
  stroke: vars.color.text,
  strokeWidth: vars.borderWidth.thin
})

export const eye = style({ fill: vars.color.text })

export const beak = style({ fill: vars.color.warning, ...outlined })
