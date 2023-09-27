import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledLink = styled.a`
  cursor: pointer;
  line-height: 1;
`

export const Link = ({ href, label, onClick, target, rel, classNames }) => (
  <StyledLink
    href={href}
    className={classNames}
    target={target}
    rel={rel}
    onClick={onClick}
  >
    {label}
  </StyledLink>
)

Link.propTypes = {
  /**
   * What url to link to.
   */
  href: PropTypes.string,
  /**
   * Link contents.
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler.
   */
  onClick: PropTypes.func,
  /**
   * Target for the link.
   */
  target: PropTypes.string,
  /**
   * Rel for the link.
   */
  rel: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string
}

Link.defaultProps = {
  href: '#',
  onClick: undefined,
  target: null,
  rel: null,
  classNames: null
}
