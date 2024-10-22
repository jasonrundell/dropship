import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

export const StyledRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${(props) => props.justify};
`

export const Row = ({ justify, classNames, children, ...props }) => {
  return (
    <StyledRow justify={justify} className={classNames} {...props}>
      {children}
    </StyledRow>
  )
}

Row.propTypes = {
  /**
   * Justify content alignment
   */
  justify: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'space-around',
    'space-between',
    'space-evenly'
  ]),
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Row content.
   */
  children: PropTypes.any.isRequired
}

Row.defaultProps = {
  justify: 'start',
  classNames: null
}
