import React from 'react'
import PropTypes from 'prop-types'

export const Main = ({ children, ...props }) => (
  <main id="main" {...props}>
    {children}
  </main>
)

Main.propTypes = {
  /**
   * Main content.
   */
  children: PropTypes.any.isRequired
}

Main.defaultProps = {}
