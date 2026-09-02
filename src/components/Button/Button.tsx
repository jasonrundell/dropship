import type { ComponentPropsWithRef } from 'react'

import { button } from './Button.css'
import { mergeClassNames } from '../../lib/mergeProps'

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  /** Is this the principal call to action on the page? */
  primary?: boolean
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large'
  /** Button contents */
  label: string
  /** Optional click handler */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction.
 *
 * There is deliberately no colour prop. `primary` and `size` select between
 * values the active theme supplies, which is what makes a button re-themeable;
 * a literal colour passed from the call site would survive a design change and
 * quietly break the one guarantee the system makes. Restyle by overriding
 * `--topiary-color-primary` — or any other custom property — instead.
 */
const Button = ({
  primary = false,
  size = 'medium',
  label,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={mergeClassNames(button({ primary, size }), className)}
      {...props}
    >
      {label}
    </button>
  )
}

export default Button
