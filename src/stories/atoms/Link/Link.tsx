import styled from '@emotion/styled'

import Tokens from '../../../lib/tokens'

export interface LinkProps {
  /** URL of the link */
  href: string
  /** Label of the link */
  label: string
  /** Target of the link */
  target?: string
  /** Rel of the link */
  rel?: string
  /** Function to call when the link is clicked */
  onClick?: () => void
}

const Link = ({
  href = '#',
  label = 'Click here to visit',
  target = '',
  rel = '',
  onClick = undefined,
  ...props
}: LinkProps) => {
  const StyledLink = styled.a`
    cursor: pointer;
    line-height: ${Tokens.sizes.lineHeight};
  `

  return (
    <StyledLink
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      {...props}
    >
      {label}
    </StyledLink>
  )
}
export default Link
