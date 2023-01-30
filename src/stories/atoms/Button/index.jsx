import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

console.log(styles['storybook-button'])

export const Button = ({ primary, backgroundColor, size, label, onClick }) => {
  const mode = primary
    ? styles['storybook-button--primary']
    : styles['storybook-button--secondary']
  return (
    <button
      type="button"
      className={[
        styles['storybook-button'],
        styles[`storybook-button--${size}`],
        mode
      ].join(' ')}
      style={backgroundColor && { backgroundColor }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  /**
   * Denotes if the button is a primary action or not.
   */
  primary: PropTypes.bool,
  /**
   * What background color to use.
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents.
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler.
   */
  onClick: PropTypes.func
}

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined
}
