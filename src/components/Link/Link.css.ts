import { style } from '@vanilla-extract/css'

import { vars } from '../../lib/tokens.css'

export const link = style({
  cursor: 'pointer',
  lineHeight: vars.size.lineHeight
})
