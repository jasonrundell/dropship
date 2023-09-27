import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 0 1.5rem;
  @media (min-width: 48rem) {
    width: 42rem;
    padding: 0;
  }
`

export const Container = ({ id, classNames, children }) => {
  return (
    <StyledContainer id={id} className={classNames}>
      {children}
    </StyledContainer>
  )
}

Container.propTypes = {
  /**
   * Assign a unique id to the section. A common use-case.
   */
  id: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Container content.
   */
  children: PropTypes.any.isRequired
}

Container.defaultProps = {
  id: null,
  classNames: null
}
