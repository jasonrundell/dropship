import { style } from '@vanilla-extract/css'

import { media, vars } from '../../../lib/tokens.css'

export const container = style({
  margin: '0 auto',
  padding: `0 ${vars.padding.large}`,
  '@media': {
    [media.medium]: {
      maxWidth: vars.breakpoint.medium
    }
  }
})
