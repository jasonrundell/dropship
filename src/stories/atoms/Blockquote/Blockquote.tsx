import styled from '@emotion/styled'

import Tokens from '../../../lib/tokens'

export interface BlockquoteProps {
  /** Optional color of the quotation symbols */
  color?: string
  /** Children of Blockquote */
  children: React.ReactNode
}

const Blockquote = ({ color, children, ...props }: BlockquoteProps) => {
  const StyledBlockquote = styled.blockquote<{ color?: string }>`
    position: relative;
    &::before {
      display: inline;
      position: absolute;
      font-family: ${Tokens.fonts.quotes};
      font-size: ${Tokens.sizes.fontSize.medium * 2}rem;
      color: ${(props) => props.color};
      opacity: 0.8;
      content: '❝';
      top: -${Tokens.sizes.medium}rem;
      left: -${Tokens.sizes.large}rem;
    }
    &::after {
      display: inline;
      position: absolute;
      font-family: ${Tokens.fonts.quotes};
      font-size: ${Tokens.sizes.fontSize.medium * 2}rem;
      color: ${(props) => props.color};
      opacity: 0.8;
      content: '❞';
      right: -${Tokens.sizes.large}rem;
    }
  `

  return (
    <StyledBlockquote color={color} {...props}>
      {children}
    </StyledBlockquote>
  )
}

export default Blockquote
