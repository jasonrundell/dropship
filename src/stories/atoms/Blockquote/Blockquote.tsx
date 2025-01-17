import { styled } from '@pigment-css/react'

import Tokens from '../../../lib/tokens'

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
    fontFamily: Tokens.fonts.quotes.family,
    fontSize: `${Tokens.sizes.fonts.medium.value * 2}${Tokens.sizes.fonts.medium.unit}`,
    color: ({ color }) => color,
    opacity: 0.8,
    content: '"❝"',
    top: `-${Tokens.sizes.medium.value}${Tokens.sizes.fonts.medium.unit}`,
    left: `-${Tokens.sizes.large.value}${Tokens.sizes.fonts.large.unit}`
  },
  '&::after': {
    display: 'inline',
    position: 'absolute',
    fontFamily: Tokens.fonts.quotes.family,
    fontSize: `${Tokens.sizes.fonts.medium.value * 2}${Tokens.sizes.fonts.medium.unit}`,
    color: ({ color }) => color,
    opacity: 0.8,
    content: '"❞"',
    right: `-${Tokens.sizes.large.value}${Tokens.sizes.fonts.large.unit}`
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
