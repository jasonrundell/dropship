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
    fontFamily: Tokens.fonts.quotes,
    fontSize: `${Tokens.sizes.fontSize.medium * 2}rem`,
    color: ({ color }) => color,
    opacity: 0.8,
    content: '"❝"',
    top: `-${Tokens.sizes.medium}rem`,
    left: `-${Tokens.sizes.large}rem`
  },
  '&::after': {
    display: 'inline',
    position: 'absolute',
    fontFamily: Tokens.fonts.quotes,
    fontSize: `${Tokens.sizes.fontSize.medium * 2}rem`,
    color: ({ color }) => color,
    opacity: 0.8,
    content: '"❞"',
    right: `-${Tokens.sizes.large}rem`
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
