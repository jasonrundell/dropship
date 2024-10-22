import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

export const StyledArticle = styled.article`
  width: 100%;
`

export const Article = ({ classNames, children, ...props }) => {
  return (
    <StyledArticle className={classNames} {...props}>
      {children}
    </StyledArticle>
  )
}

Article.propTypes = {
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

Article.defaultProps = {
  classNames: null
}
