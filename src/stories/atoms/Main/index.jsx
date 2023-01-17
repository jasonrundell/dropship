import React from 'react'
import PropTypes from 'prop-types'

/**
 * Primary UI component for user interaction
 */
export const Main = ({ children }) => {
  return <main id="main">{children}</main>
}

Main.propTypes = {
  /**
   * Main content.
   */
  children: PropTypes.any.isRequired
}

Main.defaultProps = {}
