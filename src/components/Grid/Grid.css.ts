import { createVar, fallbackVar, style } from '@vanilla-extract/css'

import { media, vars } from '../../lib/theme.css'

export const columnGapVar = createVar()
export const rowGapVar = createVar()
export const templateVar = createVar()
export const mediumTemplateVar = createVar()
export const largeTemplateVar = createVar()

export const grid = style({
  display: 'grid',
  columnGap: fallbackVar(columnGapVar, vars.space.md),
  rowGap: fallbackVar(rowGapVar, vars.space.md),
  gridTemplateColumns: templateVar,
  '@media': {
    [media.md]: {
      gridTemplateColumns: mediumTemplateVar
    },
    [media.lg]: {
      gridTemplateColumns: largeTemplateVar
    }
  }
})
