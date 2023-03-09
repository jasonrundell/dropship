import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

const styleH1 = css`
  font-size: 2.5rem;
  line-height: 2.5rem;
  margin-top: 0;
  margin-bottom: 2.5rem;
`

const styleH2 = css`
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
`

const styleH3 = css`
  font-size: 1.25rem;
  line-height: 1.25rem;
  margin-top: 0;
  margin-bottom: 1.25rem;
`
const styleH4 = css`
  font-size: 1rem;
  line-height: 1rem;
  margin-top: 0;
  margin-bottom: 1rem;
`

const styleH5 = css`
  font-size: 0.875rem;
  line-height: 0.875rem;
  margin-top: 0;
  margin-bottom: 0.875rem;
`

const styleH6 = css`
  font-size: 0.75rem;
  line-height: 0.75rem;
  margin-top: 0;
  margin-bottom: 0.75rem;
`

export const Heading = ({ level, label, classNames }) => {
  let titleClass
  let Component
  let style
  switch (level) {
    case 1:
      titleClass = 'h1'
      Component = 'h1'
      style = styleH1
      break
    case 2:
      titleClass = 'h2'
      Component = 'h2'
      style = styleH2
      break
    case 3:
      titleClass = 'h3'
      Component = 'h3'
      style = styleH3
      break
    case 4:
      titleClass = 'h4'
      Component = 'h4'
      style = styleH4
      break
    case 5:
      titleClass = 'h5'
      Component = 'h5'
      style = styleH5
      break
    case 6:
      titleClass = 'h6'
      Component = 'h6'
      style = styleH6
      break
    default:
      titleClass = 'h1'
      Component = 'h1'
      style = styleH1
  }
  return (
    <Component css={style} className={classNames}>
      {label}
    </Component>
  )
}

Heading.propTypes = {
  /**
   * Heading level (1-6).
   */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /**
   * Heading text.
   */
  label: PropTypes.string.isRequired,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string
}

Heading.defaultProps = {
  level: 1
}
