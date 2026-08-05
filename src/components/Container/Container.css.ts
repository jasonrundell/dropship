import { style } from '@vanilla-extract/css'

import { media, vars } from '../../lib/theme.css'

export const container = style({
  marginInline: 'auto',
  width: '100%',
  paddingInline: vars.space.md,
  color: vars.color.text,
  fontFamily: vars.font.body,
  '@media': {
    [media.md]: {
      maxWidth: vars.breakpoint.md,
      paddingInline: vars.space.lg
    }
  }
})
