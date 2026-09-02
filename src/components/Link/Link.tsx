import type { ComponentPropsWithRef, ReactNode } from 'react'

import { link } from './Link.css'
import { mergeClassNames } from '../../lib/mergeProps'

export interface LinkProps extends ComponentPropsWithRef<'a'> {
  /** URL of the link */
  href: string
  /** Label of the link */
  label: string
  /**
   * Additional content rendered after the label, e.g. a trailing icon
   * signalling that the link opens a submenu. `label` always renders first;
   * when both are given, `children` follows it inside the same anchor
   * rather than replacing it.
   */
  children?: ReactNode
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
  children,
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
      {children}
    </a>
  )
}

export default Link
