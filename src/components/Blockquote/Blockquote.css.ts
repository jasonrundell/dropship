import { createVar, style } from '@vanilla-extract/css'

import { vars } from '../../lib/theme.css'

/** Caller-supplied accent for the quote marks; falls back to the theme. */
export const quoteColorVar = createVar()

export const blockquote = style({
  position: 'relative',
  margin: 0,
  paddingInlineStart: vars.space.lg,
  borderInlineStartWidth: vars.borderWidth.thick,
  borderInlineStartStyle: vars.borderStyle.default,
  borderInlineStartColor: quoteColorVar,
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.lg,
  fontStyle: 'italic',
  lineHeight: vars.lineHeight.loose,
  vars: {
    [quoteColorVar]: vars.color.primary
  }
})
