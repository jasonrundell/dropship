import PropTypes from 'prop-types'
import { css } from '@emotion/react'

export const Button = ({ size, label, onClick, classNames }) => {
  const style = css`
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    font-size: ${size === 'large'
      ? '2rem'
      : size === 'medium'
      ? '1.5rem'
      : '1rem'};
    padding: ${size === 'large'
      ? '0.75rem 1.5rem'
      : size === 'medium'
      ? '0.6875rem 1.25rem'
      : '0.625rem 1rem'};
  `

  return (
    <button type="button" css={style} onClick={onClick} className={classNames}>
      {label}
    </button>
  )
}

Button.propTypes = {
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
  onClick: PropTypes.func,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string
}

Button.defaultProps = {
  size: 'medium',
  onClick: undefined
}
