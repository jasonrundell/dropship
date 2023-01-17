import React from 'react'
import PropTypes from 'prop-types'

import './paragraph.css'

export const Paragraph = ({ children }) => (
  <p className="storybook-p">{children}</p>
)

Paragraph.propTypes = {
  /**
   * Paragraph content.
   */
  children: PropTypes.any.isRequired
}

Paragraph.defaultProps = {}
