import { recipe } from '@vanilla-extract/recipes'

import { vars } from '../../../lib/tokens.css'

export const heading = recipe({
  base: {
    margin: 0
  },
  variants: {
    level: {
      1: { fontSize: vars.heading.h1, lineHeight: vars.heading.h1 },
      2: { fontSize: vars.heading.h2, lineHeight: vars.heading.h2 },
      3: { fontSize: vars.heading.h3, lineHeight: vars.heading.h3 },
      4: { fontSize: vars.heading.h4, lineHeight: vars.heading.h4 },
      5: { fontSize: vars.heading.h5, lineHeight: vars.heading.h5 },
      6: { fontSize: vars.heading.h6, lineHeight: vars.heading.h6 }
    }
  },
  defaultVariants: {
    level: 1
  }
})
