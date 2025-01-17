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
  lineHeight: `${Tokens.sizes.lineHeight.value}${Tokens.sizes.lineHeight.unit}`,
  variants: [
    {
      props: {
        isRoomy: true
      },
      style: {
        padding: `${Tokens.sizes.padding.large.value}${Tokens.sizes.padding.large.unit}`
      }
    },
    {
      props: {
        isTight: true
      },
      style: {
        padding: `${Tokens.sizes.padding.xsmall.value}${Tokens.sizes.padding.xsmall.unit}`
      }
    },
    {
      props: {
        isTight: false,
        isRoomy: false
      },
      style: {
        padding: `${Tokens.sizes.padding.small.value}${Tokens.sizes.padding.small.unit}`
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
