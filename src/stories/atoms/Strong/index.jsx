import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

export const Strong = ({ text, classNames }) => {
  const style = css`
    font-weight: 700;
  `
  return (
    <strong css={style} className={classNames}>
      {text}
    </strong>
  )
}

Strong.propTypes = {
  /**
   * Text to bold.
   */
  text: PropTypes.string.isRequired,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string
}

Strong.defaultProps = {}
