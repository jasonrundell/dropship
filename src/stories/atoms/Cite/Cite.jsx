import React from 'react'
import PropTypes from 'prop-types'

export const Cite = ({ classNames, children, ...props }) => {
  return (
    <cite className={classNames} {...props}>
      {children}
    </cite>
  )
}

Cite.propTypes = {
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Box can contain any elements.
   */
  children: PropTypes.any.isRequired
}

Cite.defaultProps = {
  classNames: null
}
