import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { sizes } from '../../../shared/sizes'

export const Heading = ({ level, label, classNames }) => {
  let titleClass
  let Component
  let style

  const styleH1 = css`
    font-size: ${sizes.largest}rem;
    line-height: ${sizes.largest}rem;
    margin-top: 0;
    margin-bottom: ${sizes.largest}rem;
  `

  const styleH2 = css`
    font-size: ${sizes.large}rem;
    line-height: ${sizes.large}rem;
    margin-top: 0;
    margin-bottom: ${sizes.large}rem;
  `

  const styleH3 = css`
    font-size: ${sizes.normal}rem;
    line-height: ${sizes.normal}rem;
    margin-top: 0;
    margin-bottom: ${sizes.normal}rem;
  `
  const styleH4 = css`
    font-size: ${sizes.small}rem;
    line-height: ${sizes.small}rem;
    margin-top: 0;
    margin-bottom: ${sizes.small}rem;
  `

  const styleH5 = css`
    font-size: ${sizes.smaller}rem;
    line-height: ${sizes.smaller}rem;
    margin-top: 0;
    margin-bottom: ${sizes.smaller}rem;
  `

  const styleH6 = css`
    font-size: ${sizes.smallest}rem;
    line-height: ${sizes.smallest}rem;
    margin-top: 0;
    margin-bottom: ${sizes.smallest}rem;
  `

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
