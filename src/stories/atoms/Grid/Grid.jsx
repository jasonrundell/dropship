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

const breakInsideStyles = {
  auto: css`
    break-inside: auto;
  `,
  avoid: css`
    break-inside: avoid;
  `,
  'avoid-page': css`
    break-inside: avoid-page;
  `,
  'avoid-column': css`
    break-inside: avoid-column;
  `,
  'avoid-region': css`
    break-inside: avoid-region;
  `,
  inherit: css`
    break-inside: inherit;
  `,
  initial: css`
    break-inside: initial;
  `,
  unset: css`
    break-inside: unset;
  `
}

export const Grid = ({
  breakInside = 'auto',
  columnGap = '0',
  rowGap = '0',
  gridTemplateColumns = '1fr',
  mediumTemplateColumns = '1fr 1fr',
  largeTemplateColumns = '1fr 1fr 1fr',
  classNames = null,
  children,
  ...props
}) => {
  const mediumBreakpoint = '768px'
  const largeBreakpoint = '1024px'

  const root = css`
    display: grid;
    column-gap: ${columnGap ? columnGap : '0'};
    row-gap: ${rowGap ? rowGap : '0'};
    grid-template-columns: ${gridTemplateColumns};

    @media (min-width: ${mediumBreakpoint}) {
      grid-template-columns: ${mediumTemplateColumns
        ? mediumTemplateColumns
        : gridTemplateColumns};
    }

    @media (min-width: ${largeBreakpoint}) {
      grid-template-columns: ${largeTemplateColumns
        ? largeTemplateColumns
        : gridTemplateColumns};
    }
  `

  const StyledGrid = styled.div`
    ${root}
  `

  const ChildWrapper = styled.div`
    ${breakInsideStyles[breakInside]}
  `

  return (
    <StyledGrid className={classNames} {...props}>
      {React.Children.map(children, (child) => (
        <ChildWrapper>{child}</ChildWrapper>
      ))}
    </StyledGrid>
  )
}

Grid.propTypes = {
  /**
   * Break inside rule.
   */
  breakInside: PropTypes.oneOf(breakInsideRules),
  /**
   * Gap between columns.
   */
  columnGap: PropTypes.string,
  /**
   * Gap between rows.
   */
  rowGap: PropTypes.string,
  /**
   * Grid template columns.
   */
  gridTemplateColumns: PropTypes.string,
  /**
   * Medium breakpoint grid template columns.
   */
  mediumTemplateColumns: PropTypes.string,
  /**
   * Large breakpoint grid template columns.
   */
  largeTemplateColumns: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Grid content.
   */
  children: PropTypes.any.isRequired
}
