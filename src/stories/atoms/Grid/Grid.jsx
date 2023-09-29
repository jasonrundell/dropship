import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const columnRules = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const breakInsideRules = [
  'auto',
  'avoid',
  'avoid-page',
  'avoid-column',
  'avoid-region',
  'inherit',
  'initial',
  'unset'
]

export const Grid = ({
  columnCount,
  mediumColumnCount,
  largeColumnCount,
  breakInside,
  classNames,
  children
}) => {
  const mediumBreakpoint = '768px'
  const largeBreakpoint = '1024px'

  const root = css`
    column-count: ${columnCount};
    width: 100%;

    @media (min-width: ${mediumBreakpoint}) {
      columns: ${mediumColumnCount ? mediumColumnCount : columnCount};
    }

    @media (min-width: ${largeBreakpoint}) {
      columns: ${largeColumnCount ? largeColumnCount : columnCount};
    }
  `

  const auto = css`
    article,
    div,
    section {
      break-inside: auto;
    }
  `

  const avoid = css`
    article,
    div,
    section {
      break-inside: avoid;
    }
  `

  const avoidPage = css`
    article,
    div,
    section {
      break-inside: avoid-page;
    }
  `

  const avoidColumn = css`
    article,
    div,
    section {
      break-inside: avoid-column;
    }
  `

  const avoidRegion = css`
    article,
    div,
    section {
      break-inside: avoid-region;
    }
  `

  const inherit = css`
    article,
    div,
    section {
      break-inside: inherit;
    }
  `

  const initial = css`
    article,
    div,
    section {
      break-inside: initial;
    }
  `

  const unset = css`
    article,
    div,
    section {
      break-inside: unset;
    }
  `

  const colClassName = `col${columnCount}`
  const mediumColClassName = `colMedium${mediumColumnCount}`
  const largeColClassName = `colLarge${largeColumnCount}`

  const StyledGrid = styled.div(
    breakInside === 'auto' && auto,
    breakInside === 'avoid' && avoid,
    breakInside === 'avoid-page' && avoidPage,
    breakInside === 'avoid-column' && avoidColumn,
    breakInside === 'avoid-region' && avoidRegion,
    breakInside === 'inherit' && inherit,
    breakInside === 'initial' && initial,
    breakInside === 'unset' && unset,
    root,
    colClassName,
    mediumColClassName,
    largeColClassName
  )

  return <StyledGrid className={classNames}>{children}</StyledGrid>
}

Grid.propTypes = {
  /**
   * Number of columns to span.
   */
  columnCount: PropTypes.oneOf(columnRules),
  /**
   * Number of columns to span at medium breakpoint.
   */
  mediumColumnCount: PropTypes.oneOf(columnRules),
  /**
   * Number of columns to span at large breakpoint.
   */
  largeColumnCount: PropTypes.oneOf(columnRules),
  /**
   * Break inside rule.
   */
  breakInside: PropTypes.oneOf(breakInsideRules),
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Grid content.
   */
  children: PropTypes.any.isRequired
}

Grid.defaultProps = {
  columnCount: 1,
  mediumColumnCount: null,
  largeColumnCount: null,
  breakInside: 'auto',
  classNames: null
}
