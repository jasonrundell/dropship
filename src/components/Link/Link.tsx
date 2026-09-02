import type { ComponentPropsWithRef } from 'react'

import { link } from './Link.css'
import { mergeClassNames } from '../../lib/mergeProps'

export interface LinkProps extends ComponentPropsWithRef<'a'> {
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
  className,
  ...props
}: LinkProps) => {
  return (
    <a
      className={mergeClassNames(link, className)}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      {...props}
    >
      {label}
    </a>
  )
}

export default Link
