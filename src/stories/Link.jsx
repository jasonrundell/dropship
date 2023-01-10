import React from 'react'
import PropTypes from 'prop-types'
import './link.css'

/**
 * Primary UI component for user interaction
 */
export const Link = ({ primary, to, size, label, onClick, target, rel }) => {
  const mode = primary ? 'storybook-link--primary' : 'storybook-link--secondary'
  return (
    <a
      href={to}
      className={['storybook-link', `storybook-link--${size}`, mode].join(' ')}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {label}
    </a>
  )
}

Link.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What url to link to
   */
  to: PropTypes.string,
  /**
   * How large should the link be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Link contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Target for the link
   */
  target: PropTypes.string,
  /**
   * Rel for the link
   */
  rel: PropTypes.string
}

Link.defaultProps = {
  primary: false,
  to: '#',
  size: 'medium',
  onClick: undefined,
  target: null,
  rel: null
}
