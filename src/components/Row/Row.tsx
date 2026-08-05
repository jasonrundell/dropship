import type { ReactNode } from 'react'
import { assignInlineVars } from '@vanilla-extract/dynamic'

import { alignVar, justifyVar, row } from './Row.css'

export interface RowProps {
  /** Justify content of the row */
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  /** Children of Row */
  children: ReactNode
}

const Row = ({
  justify = 'start',
  align = 'start',
  children,
  ...props
}: RowProps) => {
  return (
    <div
      className={row}
      style={assignInlineVars({
        [justifyVar]: justify,
        [alignVar]: align
      })}
      {...props}
    >
      {children}
    </div>
  )
}

export default Row
