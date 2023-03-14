import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { Icon } from '../Icon'

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
  ariaLabel,
  classNames,
  figureClassNames
}) => {
  const styles = css`
    background: transparent;
    border-radius: 50%;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    text-transform: uppercase;

    ${size === 'large'
      ? 'height: 3rem; width: 3rem; line-height: 3rem;'
      : size === 'small'
      ? 'height: 1.5rem; width: 1.5rem; line-height: 1.5rem;'
      : size === 'tiny'
      ? 'height: 1rem; width: 1rem; line-height: 1rem;'
      : 'height: 2rem; width: 2rem; line-height: 2rem;'}

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    svg {
      position: relative;
      bottom: -2px;
      height: 100%;
      width: 100%;
      vertical-align: top;
    }

    path {
      fill: grey;
    }
  `
  const stylesFigure = css`
    text-align: center;
    ${size === 'large'
      ? 'font-size: 1.5rem; line-height: 3rem;'
      : size === 'small'
      ? 'font-size: 0.875rem; line-height: 1.5rem;'
      : size === 'tiny'
      ? 'font-size: 0.75rem; line-height: 1rem;'
      : 'font-size: 1rem; line-height: 1.5rem;'}
  `
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
        css={stylesFigure}
        className={figureClassNames}
        size={size}
        aria-hidden="true"
      >
        {username.substring(0, 1)}
      </div>
    )
  }

  return (
    <div
      css={styles}
      className={classNames}
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
  ariaLabel: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the icon's figure.
   */
  figureClassNames: PropTypes.string
}

Avatar.defaultProps = {
  loading: false,
  username: 'loading',
  src: null,
  size: 'medium',
  ariaBusy: false,
  ariaLabel: null,
  classNames: null,
  figureClassNames: null
}
