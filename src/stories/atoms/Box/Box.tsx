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
  lineHeight: `${Tokens.sizes.lineHeight.$value.value}${Tokens.sizes.lineHeight.$value.unit}`,
  variants: [
    {
      props: {
        isRoomy: true
      },
      style: {
        padding: `${Tokens.sizes.padding.large.$value.value}${Tokens.sizes.padding.large.$value.unit}`
      }
    },
    {
      props: {
        isTight: true
      },
      style: {
        padding: `${Tokens.sizes.padding.xsmall.$value.value}${Tokens.sizes.padding.xsmall.$value.unit}`
      }
    },
    {
      props: {
        isTight: false,
        isRoomy: false
      },
      style: {
        padding: `${Tokens.sizes.padding.small.$value.value}${Tokens.sizes.padding.small.$value.unit}`
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
