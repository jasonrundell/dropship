import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

export const Link = ({ href, label, onClick, target, rel, classNames }) => {
  const style = css`
    cursor: pointer;
    line-height: 1;
  `

  return (
    <a
      href={href}
      css={style}
      className={classNames}
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
   * Assign a custom class name or multiple class names to the section.
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
