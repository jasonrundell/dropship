import React from 'react'
import PropTypes from 'prop-types'

export const Footer = ({ children, classnames, ...props }) => (
  <footer className={classnames} {...props}>
    {children}
  </footer>
)

Footer.propTypes = {
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Footer content.
   */
  children: PropTypes.any.isRequired
}

Footer.defaultProps = { classNames: null }
