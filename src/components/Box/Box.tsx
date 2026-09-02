import type { ComponentPropsWithRef, ReactNode } from 'react'

import { box } from './Box.css'
import { mergeClassNames } from '../../lib/mergeProps'

export interface BoxProps extends ComponentPropsWithRef<'div'> {
  /** Option to set if box padding is tight */
  isTight?: boolean
  /** Option to set if box padding is roomy */
  isRoomy?: boolean
  /** Children of Box */
  children: ReactNode
}

const Box = ({
  isTight = false,
  isRoomy = false,
  children,
  className,
  ...props
}: BoxProps) => {
  // isRoomy wins when both are set, matching the previous variant ordering.
  const density = isRoomy ? 'roomy' : isTight ? 'tight' : 'default'

  return (
    <div className={mergeClassNames(box({ density }), className)} {...props}>
      {children}
    </div>
  )
}

export default Box
