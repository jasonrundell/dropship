import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { sizes, sizeKeys } from '../../../shared/sizes'
import { breakpoints } from '../../../shared/breakpoints'

export const Spacer = ({ smallScreen, mediumScreen, largeScreen }) => {
  const style = css`
    display: block;
    height: ${sizes[smallScreen] ?? sizes.normal}rem;

    @media (min-width: ${breakpoints.medium}rem) {
      height: ${sizes[mediumScreen] ?? sizes.normal}rem;
    }

    @media (min-width: ${breakpoints.large}rem) {
      height: ${sizes[largeScreen] ?? sizes.normal}rem;
    }
  `

  return <div css={style} aria-hidden="true" />
}

Spacer.defaultProps = {
  smallScreen: sizes.normal,
  mediumScreen: sizes.normal,
  largeScreen: sizes.normal
}

Spacer.propTypes = {
  smallScreen: PropTypes.oneOf(sizeKeys),
  mediumScreen: PropTypes.oneOf(sizeKeys),
  largeScreen: PropTypes.oneOf(sizeKeys)
}
