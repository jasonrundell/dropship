import styled from '@emotion/styled'

import Tokens from '../../../lib/tokens'

export interface ContainerProps {
  /** Children of Container */
  children: React.ReactNode
}

const Container = ({ children, ...props }: ContainerProps) => {
  const StyledContainer = styled.div`
    margin: 0 auto;
    padding: 0 ${Tokens.sizes.breakpoints.large * 0.75};
    @media (min-width: ${Tokens.sizes.breakpoints.medium}rem) {
      width: ${Tokens.sizes.breakpoints.medium * 0.875}rem;
      padding: 0;
    }
  `
  return <StyledContainer {...props}>{children}</StyledContainer>
}

export default Container
