import styled from '@emotion/styled'
import Tokens from '../../../lib/tokens'

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean
  /** What background color to use */
  backgroundColor?: string
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large'
  /** Button contents */
  label: string
  /** Optional click handler */
  onClick?: () => void
}

/** Primary UI component for user interaction */
const Button = ({
  primary = false,
  size = 'medium',
  label,
  ...props
}: ButtonProps) => {
  const StyledButton = styled.button<{ size?: string }>`
    cursor: pointer;
    display: inline-block;
    line-height: ${Tokens.sizes.lineHeight};
    font-size: ${() =>
      size === 'large'
        ? `${Tokens.sizes.fontSize.large}rem`
        : size === 'medium'
          ? `${Tokens.sizes.fontSize.medium}rem`
          : `${Tokens.sizes.fontSize.small}rem`};
    padding: ${() =>
      size === 'large'
        ? `${Tokens.sizes.padding.large / 2}rem ${Tokens.sizes.padding.large}rem`
        : size === 'medium'
          ? `${Tokens.sizes.padding.medium / 2}rem ${Tokens.sizes.padding.medium}rem`
          : `${Tokens.sizes.padding.small / 2}rem ${Tokens.sizes.padding.small}rem`};
    background-color: ${primary
      ? Tokens.colors.primary
      : Tokens.colors.secondary};
  `
  return (
    <StyledButton type="button" {...props}>
      {label}
    </StyledButton>
  )
}

export default Button
