import type { ComponentPropsWithRef } from 'react'

import { spacer } from './Spacer.css'
import { mergeClassNames } from '../../lib/mergeProps'

export interface SpacerProps extends ComponentPropsWithRef<'div'> {
  /** Size of the spacer on small screens */
  smallScreen?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  /** Size of the spacer on medium screens */
  mediumScreen?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  /** Size of the spacer on large screens */
  largeScreen?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
}

const Spacer = ({
  smallScreen = 'small',
  mediumScreen = 'small',
  largeScreen = 'small',
  className,
  ...props
}: SpacerProps) => {
  return (
    <div
      className={mergeClassNames(
        spacer({ smallScreen, mediumScreen, largeScreen }),
        className
      )}
      {...props}
      aria-hidden="true"
    />
  )
}

export default Spacer
