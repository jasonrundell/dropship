import { createVar, style } from '@vanilla-extract/css'

export const justifyVar = createVar()
export const alignVar = createVar()

export const row = style({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: justifyVar,
  alignItems: alignVar
})
