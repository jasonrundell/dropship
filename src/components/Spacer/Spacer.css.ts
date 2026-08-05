import { recipe } from '@vanilla-extract/recipes'

import { media, vars } from '../../lib/theme.css'

type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

/** Maps the public size names onto the theme's space scale. */
const SPACE: Record<Size, string> = {
  xsmall: vars.space.xs,
  small: vars.space.md,
  medium: vars.space.lg,
  large: vars.space.xl,
  xlarge: vars.space['3xl']
}

const height = (size: Size, query?: string) =>
  query
    ? { '@media': { [query]: { height: SPACE[size] } } }
    : { height: SPACE[size] }

const heightVariants = (query?: string) => ({
  xsmall: height('xsmall', query),
  small: height('small', query),
  medium: height('medium', query),
  large: height('large', query),
  xlarge: height('xlarge', query)
})

export const spacer = recipe({
  base: { display: 'block', flexShrink: 0 },
  variants: {
    smallScreen: heightVariants(),
    mediumScreen: heightVariants(media.md),
    largeScreen: heightVariants(media.lg)
  },
  defaultVariants: {
    smallScreen: 'small',
    mediumScreen: 'small',
    largeScreen: 'small'
  }
})
