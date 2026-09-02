import type { ComponentPropsWithRef, ReactNode } from 'react'

import { container } from './Container.css'

export interface ContainerProps extends ComponentPropsWithRef<'div'> {
  /** Children of Container */
  children: ReactNode
}

const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <div className={container} {...props}>
      {children}
    </div>
  )
}

export default Container
