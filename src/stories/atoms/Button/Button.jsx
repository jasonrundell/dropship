import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledButton = styled.button`
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  font-size: ${(props) =>
    props.size === 'large'
      ? '2rem'
      : props.size === 'medium'
      ? '1.5rem'
      : '1rem'};
  padding: ${(props) =>
    props.size === 'large'
      ? '0.75rem 1.5rem'
      : props.size === 'medium'
      ? '0.6875rem 1.25rem'
      : '0.625rem 1rem'};
`

export const Button = ({ size, label, onClick, classNames }) => {
  return (
    <StyledButton
      type="button"
      size={size}
      onClick={onClick}
      className={classNames}
    >
      {label}
    </StyledButton>
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
