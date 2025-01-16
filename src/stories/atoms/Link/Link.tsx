import { styled } from '@pigment-css/react'

import Tokens from '../../../lib/tokens'

interface LinkProps {
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

const StyledLink = styled('a')({
  cursor: 'pointer',
  lineHeight: Tokens.sizes.lineHeight.value
})

const Link = ({
  href = '#',
  label = 'Click here to visit',
  target = '',
  rel = '',
  onClick = undefined,
  ...props
}: LinkProps) => {
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
