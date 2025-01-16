import { styled } from '@pigment-css/react'

import Tokens from '../../../lib/tokens'

interface ContainerProps {
  /** Children of Container */
  children: React.ReactNode
}

const StyledContainer = styled('div')<ContainerProps>({
  margin: '0 auto',
  padding: `0 ${Tokens.sizes.padding.large}rem`,
  '@media (min-width: 48rem)': {
    maxWidth: `${Tokens.sizes.breakpoints.medium}rem`
  }
})

const Container = ({ children, ...props }: ContainerProps) => {
  return <StyledContainer {...props}>{children}</StyledContainer>
}

export default Container
