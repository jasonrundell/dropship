import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '../../../utils/css'
import styles from './index.module.css'

export const Row = ({ justify, children }) => {
  const classes = classNames(
    styles['storybook-row'],
    justify === 'start' && styles['storybook-row--start'],
    justify === 'end' && styles['storybook-row--end'],
    justify === 'center' && styles['storybook-row--center'],
    justify === 'space-around' && styles['storybook-row--space-around'],
    justify === 'space-between' && styles['storybook-row--space-between'],
    justify === 'space-evenly' && styles['storybook-row--space-evenly']
  )

  return <div className={classes}>{children}</div>
}

Row.propTypes = {
  /**
   * Justify content alignment
   */
  justify: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'space-around',
    'space-between',
    'space-evenly'
  ]),
  /**
   * Row content.
   */
  children: PropTypes.any.isRequired
}

Row.defaultProps = {
  justify: 'start'
}
