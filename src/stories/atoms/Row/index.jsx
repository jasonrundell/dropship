import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '../../../utils/css'
import './row.css'

/**
 * Primary UI component for user interaction
 */
export const Row = ({ justify, children }) => {
  const classes = classNames(
    'storybook-row',
    justify === 'start' && 'storybook-row--start',
    justify === 'end' && 'storybook-row--end',
    justify === 'center' && 'storybook-row--center',
    justify === 'space-around' && 'storybook-row--space-around',
    justify === 'space-between' && 'storybook-row--space-between',
    justify === 'space-evenly' && 'storybook-row--space-evenly'
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
   * Row content
   */
  children: PropTypes.any.isRequired
}

Row.defaultProps = {
  justify: 'start'
}
