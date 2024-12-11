import styled from '@emotion/styled'

import Tokens from '../../../lib/tokens'

export interface BoxProps {
  /** Option to set if box padding is tight */
  isTight?: boolean
  /** Option to set if box padding is roomy */
  isRoomy?: boolean
  /** Children of Box */
  children: React.ReactNode
}

const Box = ({
  isTight = false,
  isRoomy = false,
  children,
  ...props
}: BoxProps) => {
  const StyledBox = styled.div<{ isTight?: boolean; isRoomy?: boolean }>`
    padding: ${(props) =>
      props.isRoomy
        ? `${Tokens.sizes.padding.large}rem`
        : props.isTight
          ? `${Tokens.sizes.padding.xsmall}rem`
          : `${Tokens.sizes.padding.small}rem`};
    line-height: ${Tokens.sizes.lineHeight}rem;
  `

  return (
    <StyledBox isTight={isTight} isRoomy={isRoomy} {...props}>
      {children}
    </StyledBox>
  )
}

export default Box
