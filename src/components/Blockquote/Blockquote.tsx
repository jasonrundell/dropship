import type { ReactNode } from 'react'
import { assignInlineVars } from '@vanilla-extract/dynamic'

import { blockquote, quoteColorVar } from './Blockquote.css'

export interface BlockquoteProps {
  /** Optional color of the quotation symbols */
  color?: string
  /** Children of Blockquote */
  children: ReactNode
}

const Blockquote = ({
  color = 'inherit',
  children,
  ...props
}: BlockquoteProps) => {
  return (
    <blockquote
      className={blockquote}
      style={assignInlineVars({ [quoteColorVar]: color })}
      {...props}
    >
      {children}
    </blockquote>
  )
}

export default Blockquote
