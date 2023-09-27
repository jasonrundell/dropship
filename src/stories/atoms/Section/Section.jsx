import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledSection = styled.section`
  width: 100%;
`

export const Section = ({ id, classNames, children }) => (
  <StyledSection id={id} className={classNames}>
    {children}
  </StyledSection>
)

Section.propTypes = {
  /**
   * Assign a unique id to the section. A common use-case.
   */
  id: PropTypes.string,
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
  id: null,
  classNames: null
}
