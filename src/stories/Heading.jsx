import React from 'react'
import PropTypes from 'prop-types'
import './heading.css'

/**
 * Primary UI component for user interaction
 */
export const Heading = ({ level, label }) => {
  let titleClass
  let Component
  switch (level) {
    case 1:
      titleClass = 'h1'
      Component = 'h1'
      break
    case 2:
      titleClass = 'h2'
      Component = 'h2'
      break
    case 3:
      titleClass = 'h3'
      Component = 'h3'
      break
    case 4:
      titleClass = 'h4'
      Component = 'h4'
      break
    case 5:
      titleClass = 'h5'
      Component = 'h5'
      break
    case 6:
      titleClass = 'h6'
      Component = 'h6'
      break
    default:
      titleClass = 'h1'
      Component = 'h1'
  }
  return <Component className={titleClass}>{label}</Component>
}

Heading.propTypes = {
  /**
   * Heading level (1-6)
   */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /**
   * Heading text
   */
  label: PropTypes.string.isRequired
}

Heading.defaultProps = {
  level: 1
}
