import { styled } from '@pigment-css/react'

import Tokens, { fontFamilyToCss } from '../../../lib/tokens'

interface BlockquoteProps {
  /** Optional color of the quotation symbols */
  color?: string
  /** Children of Blockquote */
  children: React.ReactNode
}

const StyledBlockquote = styled('blockquote')<BlockquoteProps>({
  position: 'relative',
  '&::before': {
    display: 'inline',
    position: 'absolute',
    fontFamily: fontFamilyToCss(Tokens.fonts.quotes.$value),
    fontSize: `${Tokens.sizes.fonts.medium.$value.value * 2}${Tokens.sizes.fonts.medium.$value.unit}`,
    color: ({ color }) => color,
    opacity: 0.8,
    content: '"❝"',
    top: `-${Tokens.sizes.medium.$value.value}${Tokens.sizes.fonts.medium.$value.unit}`,
    left: `-${Tokens.sizes.large.$value.value}${Tokens.sizes.fonts.large.$value.unit}`
  },
  '&::after': {
    display: 'inline',
    position: 'absolute',
    fontFamily: fontFamilyToCss(Tokens.fonts.quotes.$value),
    fontSize: `${Tokens.sizes.fonts.medium.$value.value * 2}${Tokens.sizes.fonts.medium.$value.unit}`,
    color: ({ color }) => color,
    opacity: 0.8,
    content: '"❞"',
    right: `-${Tokens.sizes.large.$value.value}${Tokens.sizes.fonts.large.$value.unit}`
  }
})

const Blockquote = ({ color, children, ...props }: BlockquoteProps) => {
  return (
    <StyledBlockquote color={color} {...props}>
      {children}
    </StyledBlockquote>
  )
}

export default Blockquote
