import type { ReactNode } from 'react'

import { container } from './Container.css'

export interface ContainerProps {
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
