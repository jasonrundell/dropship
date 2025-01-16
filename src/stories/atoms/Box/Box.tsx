import { styled } from '@pigment-css/react'

import Tokens from '../../../lib/tokens'

export interface BoxProps {
  /** Option to set if box padding is tight */
  isTight?: boolean
  /** Option to set if box padding is roomy */
  isRoomy?: boolean
  /** Children of Box */
  children: React.ReactNode
}

const StyledBox = styled('div')<BoxProps>({
  lineHeight: `${Tokens.sizes.lineHeight}rem`,
  variants: [
    {
      props: {
        isRoomy: true
      },
      style: {
        padding: `${Tokens.sizes.padding.large}rem`
      }
    },
    {
      props: {
        isTight: true
      },
      style: {
        padding: `${Tokens.sizes.padding.xsmall}rem`
      }
    },
    {
      props: {
        isTight: false,
        isRoomy: false
      },
      style: {
        padding: `${Tokens.sizes.padding.small}rem`
      }
    }
  ]
})

const Box = ({
  isTight = false,
  isRoomy = false,
  children,
  ...props
}: BoxProps) => {
  return (
    <StyledBox isTight={isTight} isRoomy={isRoomy} {...props}>
      {children}
    </StyledBox>
  )
}

export default Box
