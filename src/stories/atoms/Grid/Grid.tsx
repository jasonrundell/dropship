import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Tokens from '../../../lib/tokens'

export interface GridProps {
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

const Grid = ({
  columnGap = '',
  rowGap = '',
  gridTemplateColumns = '1fr',
  mediumTemplateColumns = '1fr 1fr',
  largeTemplateColumns = '1fr 1fr 1fr',
  children,
  ...props
}: GridProps) => {
  const mediumBreakpoint = `${Tokens.sizes.breakpoints.medium}rem`
  const largeBreakpoint = `${Tokens.sizes.breakpoints.large}rem`

  const root = css`
    display: grid;
    ${columnGap ? `column-gap: ${columnGap};` : ''}
    ${rowGap ? `row-gap: ${rowGap};` : ''}
    ${gridTemplateColumns
      ? `grid-template-columns: ${gridTemplateColumns};`
      : ''}

    ${mediumTemplateColumns
      ? `
    @media (min-width: ${mediumBreakpoint}) {
        grid-template-columns: ${
          mediumTemplateColumns ? mediumTemplateColumns : gridTemplateColumns
        };
    }`
      : ''}

    ${largeTemplateColumns
      ? `
    @media (min-width: ${largeBreakpoint}) {
      grid-template-columns: ${
        largeTemplateColumns ? largeTemplateColumns : gridTemplateColumns
      };
    }`
      : ''}
  `

  const StyledGrid = styled.div`
    ${root}
  `

  return (
    <StyledGrid {...props}>
      {React.Children.map(children, (child) => (
        <>{child}</>
      ))}
    </StyledGrid>
  )
}

export default Grid
