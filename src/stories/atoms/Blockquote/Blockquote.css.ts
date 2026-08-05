import { createVar, style } from '@vanilla-extract/css'

import { vars } from '../../../lib/tokens.css'

export const quoteColorVar = createVar()

const quoteMark = {
  display: 'inline',
  position: 'absolute',
  fontFamily: vars.font.quotes,
  fontSize: `calc(${vars.fontSize.medium} * 2)`,
  color: quoteColorVar,
  opacity: 0.8
} as const

export const blockquote = style({
  position: 'relative',
  '::before': {
    ...quoteMark,
    content: '"\\275D"',
    top: `calc(${vars.size.medium} * -1)`,
    left: `calc(${vars.size.large} * -1)`
  },
  '::after': {
    ...quoteMark,
    content: '"\\275E"',
    right: `calc(${vars.size.large} * -1)`
  }
})
