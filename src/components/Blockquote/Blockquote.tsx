import type { ComponentPropsWithRef, ReactNode } from 'react'
import { assignInlineVars } from '@vanilla-extract/dynamic'

import { blockquote, quoteColorVar } from './Blockquote.css'
import { mergeClassNames, mergeStyle } from '../../lib/mergeProps'

export interface BlockquoteProps extends ComponentPropsWithRef<'blockquote'> {
  /** Optional color of the quotation symbols */
  color?: string
  /** Children of Blockquote */
  children: ReactNode
}

const Blockquote = ({
  color = 'inherit',
  children,
  className,
  style,
  ...props
}: BlockquoteProps) => {
  return (
    <blockquote
      className={mergeClassNames(blockquote, className)}
      style={mergeStyle(assignInlineVars({ [quoteColorVar]: color }), style)}
      {...props}
    >
      {children}
    </blockquote>
  )
}

export default Blockquote
