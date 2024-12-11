import styled from '@emotion/styled'

import Tokens from '../../../lib/tokens'

export interface SpacerProps {
  /** Size of the spacer on small screens */
  smallScreen?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  /** Size of the spacer on medium screens */
  mediumScreen?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  /** Size of the spacer on large screens */
  largeScreen?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
}

const Spacer = ({
  smallScreen = 'small',
  mediumScreen = 'small',
  largeScreen = 'small',
  ...props
}: SpacerProps) => {
  const StylesSpacer = styled.div`
    display: block;
    height: ${Tokens.sizes[smallScreen]}rem;

    @media (min-width: ${Tokens.sizes.breakpoints.medium}rem) {
      height: ${Tokens.sizes[mediumScreen]}rem;
    }

    @media (min-width: ${Tokens.sizes.breakpoints.large}rem) {
      height: ${Tokens.sizes[largeScreen]}rem;
    }
  `

  return <StylesSpacer {...props} aria-hidden="true" />
}

export default Spacer
