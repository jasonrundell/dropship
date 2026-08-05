import { recipe } from '@vanilla-extract/recipes'

import { media, vars } from '../../lib/tokens.css'

type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

/** A height rule, scoped to a breakpoint when one is given. */
const height = (size: Size, query?: string) =>
  query
    ? { '@media': { [query]: { height: vars.size[size] } } }
    : { height: vars.size[size] }

/**
 * One variant group per breakpoint. The Pigment version spelled all fifteen
 * combinations out by hand; deriving them keeps the three breakpoints
 * guaranteed to stay in step with each other.
 */
const heightVariants = (query?: string) => ({
  xsmall: height('xsmall', query),
  small: height('small', query),
  medium: height('medium', query),
  large: height('large', query),
  xlarge: height('xlarge', query)
})

export const spacer = recipe({
  base: {
    display: 'block'
  },
  variants: {
    smallScreen: heightVariants(),
    mediumScreen: heightVariants(media.medium),
    largeScreen: heightVariants(media.large)
  },
  defaultVariants: {
    smallScreen: 'small',
    mediumScreen: 'small',
    largeScreen: 'small'
  }
})
