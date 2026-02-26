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
  fontSize: `${Tokens.sizes.fonts[size].$value.value}${Tokens.sizes.fonts[size].$value.unit}`,
  padding: `${Tokens.sizes.padding[size].$value.value / 2}${Tokens.sizes.fonts[size].$value.unit} ${Tokens.sizes.padding[size].$value.value}${Tokens.sizes.fonts[size].$value.unit}`
})

const StyledButton = styled('button')<{
  size: 'small' | 'medium' | 'large'
  primary: boolean
}>({
  cursor: 'pointer',
  display: 'inline-block',
  lineHeight: Tokens.sizes.lineHeight.$value.value,
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
        backgroundColor: Tokens.colors.primary.$value.hex
      }
    },
    {
      props: {
        primary: false
      },
      style: {
        backgroundColor: Tokens.colors.secondary.$value.hex
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
