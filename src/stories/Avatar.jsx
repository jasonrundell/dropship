import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from './Icon'

import './avatar.css'

export const sizes = {
  large: 40,
  medium: 28,
  small: 20,
  tiny: 16
}

export const Avatar = ({ loading, username, src, size, ...props }) => {
  let avatarFigure = <Icon icon="useralt" />
  const a11yProps = {}

  if (loading) {
    a11yProps['aria-busy'] = true
    a11yProps['aria-label'] = 'Loading avatar ...'
  } else if (src) {
    avatarFigure = <img src={src} alt={username} />
  } else {
    a11yProps['aria-label'] = username
    avatarFigure = (
      <div
        className={`storybook-avatar__initial ${
          size && `storybook-avatar__initial--${size}`
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
      className={`storybook-avatar ${size && `storybook-avatar--${size}`}`}
      size={size}
      loading={loading}
      src={src}
      {...a11yProps}
      {...props}
    >
      {avatarFigure}
    </div>
  )
}

Avatar.propTypes = {
  loading: PropTypes.bool,
  username: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizes))
}

Avatar.defaultProps = {
  loading: false,
  username: 'loading',
  src: null,
  size: 'medium'
}
