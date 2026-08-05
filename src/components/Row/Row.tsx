import type { ReactNode } from 'react'
import { assignInlineVars } from '@vanilla-extract/dynamic'

import { alignVar, gapVar, justifyVar, row } from './Row.css'

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
  /** Gap between children. Defaults to the theme's medium space token. */
  gap?: string
  /** Children of Row */
  children: ReactNode
}

const Row = ({
  justify = 'start',
  align = 'start',
  gap,
  children,
  ...props
}: RowProps) => {
  return (
    <div
      className={row}
      style={assignInlineVars({
        [justifyVar]: justify,
        [alignVar]: align,
        ...(gap ? { [gapVar]: gap } : {})
      })}
      {...props}
    >
      {children}
    </div>
  )
}

export default Row
