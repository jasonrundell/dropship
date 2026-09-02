import type { ComponentPropsWithRef, ReactNode } from 'react'

import { container } from './Container.css'
import { mergeClassNames } from '../../lib/mergeProps'

export interface ContainerProps extends ComponentPropsWithRef<'div'> {
  /** Children of Container */
  children: ReactNode
}

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={mergeClassNames(container, className)} {...props}>
      {children}
    </div>
  )
}

export default Container
