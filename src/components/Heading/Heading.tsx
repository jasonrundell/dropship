import { createElement } from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'

import { heading } from './Heading.css'
import { mergeClassNames } from '../../lib/mergeProps'

// h1-h6 all share the HTMLHeadingElement DOM interface, so any one of them is
// a faithful base to extend regardless of which `level` is rendered.
export interface HeadingProps extends ComponentPropsWithRef<'h1'> {
  /** Level of the heading */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Optional id */
  id?: string
  /** Children of the heading */
  children: ReactNode
}

const Heading = ({
  level = 1,
  id,
  className,
  children,
  ...props
}: HeadingProps) => {
  return createElement(
    `h${level}`,
    { className: mergeClassNames(heading({ level }), className), id, ...props },
    children
  )
}

export default Heading
