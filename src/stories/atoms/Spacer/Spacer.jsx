import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { sizes, sizeKeys } from '../../../shared/sizes'
import { breakpoints } from '../../../shared/breakpoints'

export const StylesSpacer = styled.div`
  display: block;
  height: ${(props) => sizes[props.smallScreen]}rem;

  @media (min-width: ${breakpoints.medium}rem) {
    height: ${(props) => sizes[props.mediumScreen]}rem;
  }

  @media (min-width: ${breakpoints.large}rem) {
    height: ${(props) => sizes[props.largeScreen]}rem;
  }
`

export const Spacer = ({
  smallScreen,
  mediumScreen,
  largeScreen,
  ...props
}) => {
  //return <div css={style} aria-hidden="true" {...props} />
  return (
    <StylesSpacer
      smallScreen={smallScreen}
      mediumScreen={mediumScreen}
      largeScreen={largeScreen}
      {...props}
      aria-hidden="true"
    />
  )
}

Spacer.defaultProps = {
  smallScreen: 'normal',
  mediumScreen: 'normal',
  largeScreen: 'normal'
}

Spacer.propTypes = {
  smallScreen: PropTypes.oneOf(sizeKeys),
  mediumScreen: PropTypes.oneOf(sizeKeys),
  largeScreen: PropTypes.oneOf(sizeKeys)
}
