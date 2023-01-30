import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.css'

export const Strong = ({ text }) => {
  return <strong className={styles['storybook-strong']}>{text}</strong>
}

Strong.propTypes = {
  /**
   * Text to bold.
   */
  text: PropTypes.string.isRequired
}

Strong.defaultProps = {}
