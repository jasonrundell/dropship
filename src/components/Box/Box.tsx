import type { ComponentPropsWithRef, ReactNode } from 'react'

import { box } from './Box.css'

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
  ...props
}: BoxProps) => {
  // isRoomy wins when both are set, matching the previous variant ordering.
  const density = isRoomy ? 'roomy' : isTight ? 'tight' : 'default'

  return (
    <div className={box({ density })} {...props}>
      {children}
    </div>
  )
}

export default Box
