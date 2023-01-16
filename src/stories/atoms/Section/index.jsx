import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '../../../utils/css'

import './section.css'

/**
 * Primary UI component for user interaction
 */
export const Section = ({ id, className, children }) => {
  const classes = classNames('storybook-section', className)

  return (
    <section id={id} className={classes}>
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
   * Assign a custom class name or multiple class names to the section.
   */
  className: PropTypes.string,
  /**
   * Section content.
   */
  children: PropTypes.any.isRequired
}

Section.defaultProps = {
  id: null,
  className: null
}
