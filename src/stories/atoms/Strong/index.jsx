import React from 'react'
import PropTypes from 'prop-types'

import './strong.css'

export const Strong = ({ text }) => {
  return <strong className="storybook-strong">{text}</strong>
}

Strong.propTypes = {
  /**
   * Text to bold.
   */
  text: PropTypes.string.isRequired
}

Strong.defaultProps = {}
