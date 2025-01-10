import { styled } from '@pigment-css/react'

import Tokens from '../../../lib/tokens'

interface ContainerProps {
  /** Children of Container */
  children: React.ReactNode
}

const StyledContainer = styled('div')<ContainerProps>({
  margin: '0 auto',
  padding: `0 ${Tokens.sizes.breakpoints.large * 0.75}`,
  '@media (min-width: 48rem)': {
    width: `${Tokens.sizes.breakpoints.medium * 0.875}rem`,
    padding: 0
  }
})

const Container = ({ children, ...props }: ContainerProps) => {
  return <StyledContainer {...props}>{children}</StyledContainer>
}

export default Container
