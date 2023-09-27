import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledBox = styled.div`
  padding: ${(props) =>
    props.isRoomy ? '2.5rem' : props.isTight ? '0.25rem' : '1.25rem'};
  line-height: 1.25rem;
`

export const Box = ({ isTight, isRoomy, classNames, children }) => {
  return (
    <StyledBox isTight={isTight} isRoomy={isRoomy} className={classNames}>
      {children}
    </StyledBox>
  )
}

Box.propTypes = {
  /**
   * Smaller padding.
   */
  isTight: PropTypes.bool,
  /**
   * Larger padding.
   */
  isRoomy: PropTypes.bool,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Box can contain any elements.
   */
  children: PropTypes.any.isRequired
}

Box.defaultProps = {
  isTight: false,
  isRoomy: false,
  classNames: null
}
