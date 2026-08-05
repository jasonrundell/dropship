import { recipe } from '@vanilla-extract/recipes'

import { vars } from '../../lib/tokens.css'

export const box = recipe({
  base: {
    lineHeight: vars.size.lineHeight,
    padding: vars.padding.small
  },
  variants: {
    density: {
      tight: { padding: vars.padding.xsmall },
      default: { padding: vars.padding.small },
      roomy: { padding: vars.padding.large }
    }
  },
  defaultVariants: {
    density: 'default'
  }
})
