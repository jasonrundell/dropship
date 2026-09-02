import type { ComponentPropsWithRef, ReactNode } from 'react'
import { assignInlineVars } from '@vanilla-extract/dynamic'

import { alignVar, gapVar, justifyVar, row } from './Row.css'
import { mergeClassNames, mergeStyle } from '../../lib/mergeProps'

export interface RowProps extends ComponentPropsWithRef<'div'> {
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
  className,
  style,
  ...props
}: RowProps) => {
  return (
    <div
      className={mergeClassNames(row, className)}
      style={mergeStyle(
        assignInlineVars({
          [justifyVar]: justify,
          [alignVar]: align,
          ...(gap ? { [gapVar]: gap } : {})
        }),
        style
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Row
