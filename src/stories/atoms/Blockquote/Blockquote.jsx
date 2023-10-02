import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

export const Blockquote = ({ classNames, color, children }) => {
  const StyledBlockquote = styled.blockquote`
    position: relative;
    &::before {
      display: inline;
      position: absolute;
      font-family:
        Times New Roman,
        Times,
        serif;
      font-size: 3rem;
      color: ${color};
      opacity: 0.8;
      content: '❝';
      top: -1.5rem;
      left: -2.25rem;
    }
    &::after {
      display: inline;
      position: absolute;
      font-family:
        Times New Roman,
        Times,
        serif;
      font-size: 3rem;
      color: ${color};
      opacity: 0.8;
      content: '❞';
      right: -1.5rem;
    }
  `

  return <StyledBlockquote className={classNames}>{children}</StyledBlockquote>
}

Blockquote.propTypes = {
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Color of the quotation marks. Hex, rgb, rgba, hsl, hsla, and css color names are valid.
   */
  color: PropTypes.string,
  /**
   * Box can contain any elements.
   */
  children: PropTypes.any.isRequired
}

Blockquote.defaultProps = {
  classNames: null
}
