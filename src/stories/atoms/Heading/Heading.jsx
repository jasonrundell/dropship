import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { sizes } from '../../../shared/sizes'

const StyledHeading1 = styled.h1`
  font-size: ${sizes.largest}rem;
  line-height: ${sizes.largest}rem;
  margin-top: 0;
  margin-bottom: ${sizes.largest}rem;
`

const StyledHeading2 = styled.h2`
  font-size: ${sizes.large}rem;
  line-height: ${sizes.large}rem;
  margin-top: 0;
  margin-bottom: ${sizes.large}rem;
`

const StyledHeading3 = styled.h3`
  font-size: ${sizes.normal}rem;
  line-height: ${sizes.normal}rem;
  margin-top: 0;
  margin-bottom: ${sizes.normal}rem;
`

const StyledHeading4 = styled.h4`
  font-size: ${sizes.small}rem;
  line-height: ${sizes.small}rem;
  margin-top: 0;
  margin-bottom: ${sizes.small}rem;
`

const StyledHeading5 = styled.h5`
  font-size: ${sizes.smaller}rem;
  line-height: ${sizes.smaller}rem;
  margin-top: 0;
  margin-bottom: ${sizes.smaller}rem;
`

const StyledHeading6 = styled.h6`
  font-size: ${sizes.smallest}rem;
  line-height: ${sizes.smallest}rem;
  margin-top: 0;
  margin-bottom: ${sizes.smallest}rem;
`

export const Heading = ({ level, label, classNames, id }) => {
  let titleClass
  let Component

  switch (level) {
    case 1:
      titleClass = 'h1'
      Component = StyledHeading1
      break
    case 2:
      titleClass = 'h2'
      Component = StyledHeading2
      break
    case 3:
      titleClass = 'h3'
      Component = StyledHeading3
      break
    case 4:
      titleClass = 'h4'
      Component = StyledHeading4
      break
    case 5:
      titleClass = 'h5'
      Component = StyledHeading5
      break
    case 6:
      titleClass = 'h6'
      Component = StyledHeading6
      break
    default:
      titleClass = 'h1'
      Component = StyledHeading1
  }
  return (
    <Component className={classNames} id={id}>
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
