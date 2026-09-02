import { memo } from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { assignInlineVars } from '@vanilla-extract/dynamic'

import {
  columnGapVar,
  grid,
  largeTemplateVar,
  mediumTemplateVar,
  rowGapVar,
  templateVar
} from './Grid.css'

export interface GridProps extends ComponentPropsWithRef<'div'> {
  /** Gap between columns. Defaults to the theme's medium space token. */
  columnGap?: string
  /** Gap between rows. Defaults to the theme's medium space token. */
  rowGap?: string
  /** Grid template columns for small screens and up */
  gridTemplateColumns?: string
  /** Grid template for medium screens and up */
  mediumTemplateColumns?: string
  /** Grid template for large screens and up */
  largeTemplateColumns?: string
  /** Children of Grid */
  children: ReactNode
}

const Grid = memo(
  ({
    columnGap,
    rowGap,
    gridTemplateColumns = '1fr',
    mediumTemplateColumns = '1fr 1fr',
    largeTemplateColumns = '1fr 1fr 1fr',
    children,
    ...props
  }: GridProps) => {
    return (
      <div
        className={grid}
        // Vars are only assigned when a value is supplied. Assigning an empty
        // string would set the property to empty rather than leaving the
        // theme's fallback in place.
        style={assignInlineVars({
          ...(columnGap ? { [columnGapVar]: columnGap } : {}),
          ...(rowGap ? { [rowGapVar]: rowGap } : {}),
          [templateVar]: gridTemplateColumns,
          [mediumTemplateVar]: mediumTemplateColumns || gridTemplateColumns,
          [largeTemplateVar]: largeTemplateColumns || gridTemplateColumns
        })}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Grid.displayName = 'Grid'

export default Grid
