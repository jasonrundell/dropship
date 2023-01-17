import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '../../../utils/css'

import './container.css'

/**
 * Primary UI component for user interaction
 */
export const Container = ({ id, className, children }) => {
  const classes = classNames('storybook-container', className)

  return (
    <div id={id} className={classes}>
      {children}
    </div>
  )
}

Container.propTypes = {
  /**
   * Assign a unique id to the section. A common use-case.
   */
  id: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the section.
   */
  className: PropTypes.string,
  /**
   * Container content.
   */
  children: PropTypes.any.isRequired
}

Container.defaultProps = {
  id: null,
  className: null
}
