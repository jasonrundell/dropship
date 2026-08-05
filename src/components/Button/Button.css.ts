import { recipe } from '@vanilla-extract/recipes'

import { vars } from '../../lib/tokens.css'

export const button = recipe({
  base: {
    cursor: 'pointer',
    display: 'inline-block',
    lineHeight: vars.size.lineHeight
  },
  variants: {
    size: {
      small: {
        fontSize: vars.fontSize.small,
        padding: `calc(${vars.padding.small} / 2) ${vars.padding.small}`
      },
      medium: {
        fontSize: vars.fontSize.medium,
        padding: `calc(${vars.padding.medium} / 2) ${vars.padding.medium}`
      },
      large: {
        fontSize: vars.fontSize.large,
        padding: `calc(${vars.padding.large} / 2) ${vars.padding.large}`
      }
    },
    primary: {
      true: { backgroundColor: vars.color.primary },
      false: { backgroundColor: vars.color.secondary }
    }
  },
  defaultVariants: {
    size: 'medium',
    primary: false
  }
})
