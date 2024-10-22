import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledParagraph = styled.p`
  line-height: 1.3;
`

export const Paragraph = ({ classNames, children, ...props }) => (
  <StyledParagraph className={classNames} {...props}>
    {children}
  </StyledParagraph>
)

Paragraph.propTypes = {
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Paragraph content.
   */
  children: PropTypes.any.isRequired
}

Paragraph.defaultProps = {
  classNames: null
}
