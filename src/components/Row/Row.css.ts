import { createVar, fallbackVar, style } from '@vanilla-extract/css'

import { vars } from '../../lib/theme.css'

export const justifyVar = createVar()
export const alignVar = createVar()
export const gapVar = createVar()

export const row = style({
  display: 'flex',
  flexFlow: 'row wrap',
  gap: fallbackVar(gapVar, vars.space.md),
  justifyContent: justifyVar,
  alignItems: alignVar
})
