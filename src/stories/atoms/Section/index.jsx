import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/css'

export const Section = ({ id, classNames, children }) => {
  const style = css`
    width: 100%;
  `

  return (
    <section id={id} css={style} className={classNames}>
      {children}
    </section>
  )
}

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
