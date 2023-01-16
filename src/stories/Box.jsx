import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '../utils/css'
import './box.css'

/**
 * Primary UI component for user interaction
 */
export const Box = ({ isTight, isRoomy, children }) => {
  const classes = classNames(
    'storybook-box',
    isTight && 'storybook-box--tight',
    isRoomy && 'storybook-box--roomy'
  )
  return <div className={classes}>{children}</div>
}

Box.propTypes = {
  /**
   * Smaller padding.
   */
  isTight: PropTypes.bool,
  /**
   * Larger padding.
   */
  isRoomy: PropTypes.bool,
  /**
   * Box can contain any elements.
   */
  children: PropTypes.any.isRequired
}

Box.defaultProps = {
  isTight: false,
  isRoomy: false
}
