import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../Icon'

import styles from './index.module.css'

export const sizes = {
  large: 40,
  medium: 28,
  small: 20,
  tiny: 16
}

export const Avatar = ({
  loading,
  username,
  src,
  size,
  ariaBusy,
  ariaLabel
}) => {
  let avatarFigure = <Icon icon="useralt" />

  if (loading) {
    ariaBusy = true
    ariaLabel = 'Loading avatar ...'
  } else if (src) {
    avatarFigure = <img src={src} alt={username} />
  } else {
    ariaLabel = username
    avatarFigure = (
      <div
        className={`${styles['storybook-avatar__initial']} ${
          size && styles[`storybook-avatar__initial--${size}`]
        }`}
        size={size}
        aria-hidden="true"
      >
        {username.substring(0, 1)}
      </div>
    )
  }

  return (
    <div
      className={`${styles['storybook-avatar']} ${
        size ? styles[`storybook-avatar--${size}`] : ''
      }`}
      size={size}
      loading={loading}
      src={src}
      aria-busy={ariaBusy}
      aria-label={ariaLabel}
    >
      {avatarFigure}
    </div>
  )
}

Avatar.propTypes = {
  /**
   * Use the loading state to indicate that the data Avatar needs is still loading.
   */
  loading: PropTypes.bool,
  /**
   * Avatar falls back to the user's initial when no image is provided. Supply a `username` and omit `src` to see what this looks like.
   */
  username: PropTypes.string,
  /**
   * The image source for the Avatar.
   */
  src: PropTypes.string,
  /**
   * The size of the Avatar.
   */
  size: PropTypes.oneOf(Object.keys(sizes)),
  /**
   * Aria busy attribute
   */
  ariaBusy: PropTypes.bool,
  /**
   * Aria label attribute.
   */
  ariaLabel: PropTypes.string
}

Avatar.defaultProps = {
  loading: false,
  username: 'loading',
  src: null,
  size: 'medium',
  ariaBusy: false,
  ariaLabel: null
}
