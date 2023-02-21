import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

export const Paragraph = ({ children }) => (
  <p className={styles['storybook-p']}>{children}</p>
)

Paragraph.propTypes = {
  /**
   * Paragraph content.
   */
  children: PropTypes.any.isRequired
}

Paragraph.defaultProps = {}
