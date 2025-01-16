import { styled } from '@pigment-css/react'

interface GridProps {
  /** Gap between columns */
  columnGap?: string
  /** Gap between rows */
  rowGap?: string
  /** Grid template columns for small screens and up */
  gridTemplateColumns?: string
  /** Grid template for medium screens and up */
  mediumTemplateColumns?: string
  /** Grid template for large screens and up */
  largeTemplateColumns?: string
  /** Children of Grid */
  children: React.ReactNode
}

const StyledGrid = styled('div')<GridProps>({
  display: 'grid',
  columnGap: ({ columnGap }) => columnGap || '',
  rowGap: ({ rowGap }) => rowGap || '',
  gridTemplateColumns: ({ gridTemplateColumns }) =>
    gridTemplateColumns || '1fr',
  '@media (min-width: 48rem)': {
    gridTemplateColumns: ({ mediumTemplateColumns, gridTemplateColumns }) =>
      mediumTemplateColumns || gridTemplateColumns
  },
  '@media (min-width: 64rem)': {
    gridTemplateColumns: ({ largeTemplateColumns, gridTemplateColumns }) =>
      largeTemplateColumns || gridTemplateColumns
  }
})

const Grid = ({
  columnGap = '',
  rowGap = '',
  gridTemplateColumns = '1fr',
  mediumTemplateColumns = '1fr 1fr',
  largeTemplateColumns = '1fr 1fr 1fr',
  children,
  ...props
}: GridProps) => {
  return (
    <StyledGrid
      columnGap={columnGap}
      rowGap={rowGap}
      gridTemplateColumns={gridTemplateColumns}
      mediumTemplateColumns={mediumTemplateColumns}
      largeTemplateColumns={largeTemplateColumns}
      {...props}
    >
      {children}
    </StyledGrid>
  )
}

export default Grid
