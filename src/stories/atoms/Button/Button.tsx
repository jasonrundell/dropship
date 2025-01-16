import { styled } from '@pigment-css/react'
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

const buttonStyles = (size: 'small' | 'medium' | 'large') => ({
  fontSize: `${Tokens.sizes.fonts[size]}rem`,
  padding: `${Tokens.sizes.padding[size] / 2}rem ${Tokens.sizes.padding[size]}rem`
})

const StyledButton = styled('button')<{
  size: 'small' | 'medium' | 'large'
  primary: boolean
}>({
  cursor: 'pointer',
  display: 'inline-block',
  lineHeight: Tokens.sizes.lineHeight.value,
  variants: [
    {
      props: {
        size: 'small'
      },
      style: buttonStyles('small')
    },
    {
      props: {
        size: 'medium'
      },
      style: buttonStyles('medium')
    },
    {
      props: {
        size: 'large'
      },
      style: buttonStyles('large')
    },
    {
      props: {
        primary: true
      },
      style: {
        backgroundColor: Tokens.colors.primary
      }
    },
    {
      props: {
        primary: false
      },
      style: {
        backgroundColor: Tokens.colors.secondary
      }
    }
  ]
})

/** Primary UI component for user interaction */
const Button = ({
  primary = false,
  size = 'medium',
  label,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton type="button" primary={primary} size={size} {...props}>
      {label}
    </StyledButton>
  )
}

export default Button
