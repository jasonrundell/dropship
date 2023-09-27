import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Icon } from '../Icon/Icon'
import { sizes, sizeKeys } from '../../../shared/sizes'

const StyledAvatar = styled.div`
  background: transparent;
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-transform: uppercase;

  ${(props) =>
    props.size === 'large'
      ? `height: ${sizes.largest}rem; width: ${sizes.largest}rem; line-height: ${sizes.largest}rem;`
      : props.size === 'small'
      ? `height: ${sizes.large}rem; width: ${sizes.large}rem; line-height: ${sizes.large}rem;`
      : props.size === 'tiny'
      ? `height: ${sizes.small}rem; width: ${sizes.small}rem; line-height: ${sizes.small}rem;`
      : `height: ${sizes.larger}rem; width: ${sizes.larger}rem; line-height: ${sizes.larger}rem;`}

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

const StyledFigure = styled.div`
  text-align: center;
  ${(props) =>
    props.size === 'large'
      ? `font-size: ${sizes.large}rem; line-height: ${sizes.large * 2}rem;`
      : props.size === 'small'
      ? `font-size: ${sizes.smaller}rem; line-height: ${sizes.large}rem;`
      : props.size === 'tiny'
      ? `font-size: ${sizes.smallest}rem; line-height: ${sizes.small}rem;`
      : `font-size: ${sizes.normal}rem; line-height: ${sizes.larger}rem;`}
`

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
  let avatarFigure = <Icon icon="useralt" />

  if (loading) {
    ariaBusy = true
    ariaLabel = 'Loading avatar ...'
  } else if (src) {
    avatarFigure = <img src={src} alt={username} />
  } else {
    ariaLabel = username
    avatarFigure = (
      <StyledFigure className={figureClassNames} size={size} aria-hidden="true">
        {username.substring(0, 1)}
      </StyledFigure>
    )
  }

  return (
    <StyledAvatar
      className={classNames}
      size={size}
      loading={loading}
      src={src}
      aria-busy={ariaBusy}
      aria-label={ariaLabel}
    >
      {avatarFigure}
    </StyledAvatar>
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
  size: PropTypes.oneOf(Object.keys(sizeKeys)),
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
  size: 'normal',
  ariaBusy: false,
  ariaLabel: null,
  classNames: null,
  figureClassNames: null
}
