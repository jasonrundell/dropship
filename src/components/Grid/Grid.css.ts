import { createVar, style } from '@vanilla-extract/css'

import { media } from '../../lib/tokens.css'

export const columnGapVar = createVar()
export const rowGapVar = createVar()
export const templateVar = createVar()
export const mediumTemplateVar = createVar()
export const largeTemplateVar = createVar()

export const grid = style({
  display: 'grid',
  columnGap: columnGapVar,
  rowGap: rowGapVar,
  gridTemplateColumns: templateVar,
  '@media': {
    [media.medium]: {
      gridTemplateColumns: mediumTemplateVar
    },
    [media.large]: {
      gridTemplateColumns: largeTemplateVar
    }
  }
})
