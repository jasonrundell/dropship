import { createElement } from 'react'
import type { ReactNode } from 'react'

import { heading } from './Heading.css'

export interface HeadingProps {
  /** Level of the heading */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Optional id */
  id?: string
  /** Children of the heading */
  children: ReactNode
}

const Heading = ({ level = 1, id, children, ...props }: HeadingProps) => {
  return createElement(
    `h${level}`,
    { className: heading({ level }), id, ...props },
    children
  )
}

export default Heading
