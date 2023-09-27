import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledStrong = styled.strong`
  font-weight: 700;
`

export const Strong = ({ text, classNames }) => (
  <StyledStrong className={classNames}>{text}</StyledStrong>
)

Strong.propTypes = {
  /**
   * Text to bold.
   */
  text: PropTypes.string.isRequired,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string
}

Strong.defaultProps = {}
