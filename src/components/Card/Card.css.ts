import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

import { vars } from '../../lib/theme.css'

/**
 * Card renders its slots into *named grid areas*. The arrangement of those
 * areas comes from the theme, so a token can move the media above the text,
 * beside it, or to the far side — with no change to the markup.
 *
 * This is the direct equivalent of CSS Zen Garden's stable element IDs: the
 * component guarantees the slot names exist, and the theme decides where they
 * go.
 */
export const card = recipe({
  base: {
    display: 'grid',
    gap: vars.space.sm,
    alignItems: 'start',
    padding: vars.space.md,
    background: vars.color.surface,
    color: vars.color.text,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.md,
    lineHeight: vars.lineHeight.normal,
    borderRadius: vars.radius.lg,
    borderWidth: vars.borderWidth.hairline,
    borderStyle: vars.borderStyle.default,
    borderColor: vars.color.border,
    boxShadow: vars.shadow.md
  },
  variants: {
    /**
     * The layout tokens exist to arrange the media relative to the text. With
     * no media there is nothing to arrange, and applying them anyway would
     * reserve an empty column and crush the text into what is left — which is
     * exactly what a text-only card in a three-up grid looked like before this
     * variant existed.
     */
    hasMedia: {
      true: {
        gridTemplateAreas: vars.layout.cardAreas,
        gridTemplateColumns: vars.layout.cardColumns
      },
      false: {
        gridTemplateAreas: "'title' 'body' 'actions'",
        gridTemplateColumns: '1fr'
      }
    }
  },
  defaultVariants: { hasMedia: false }
})

export const media = style({
  gridArea: 'media',
  alignSelf: 'stretch',
  minHeight: vars.space['3xl'],
  background: vars.color.accent,
  borderRadius: vars.radius.md,
  overflow: 'hidden'
})

export const title = style({
  gridArea: 'title',
  margin: 0,
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.heading,
  fontSize: vars.fontSize.lg,
  letterSpacing: vars.letterSpacing.heading,
  lineHeight: vars.lineHeight.tight
})

export const body = style({
  gridArea: 'body',
  margin: 0,
  color: vars.color.textMuted
})

export const actions = style({
  gridArea: 'actions',
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.xs,
  alignItems: 'center'
})
