import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledSection = styled.section`
  width: 100%;
`

export const Section = ({ classNames, children, ...props }) => (
  <StyledSection className={classNames} {...props}>
    {children}
  </StyledSection>
)

Section.propTypes = {
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Section content.
   */
  children: PropTypes.any.isRequired
}

Section.defaultProps = {
  classNames: null
}
