import { spacer } from './Spacer.css'

export interface SpacerProps {
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
  ...props
}: SpacerProps) => {
  return (
    <div
      className={spacer({ smallScreen, mediumScreen, largeScreen })}
      {...props}
      aria-hidden="true"
    />
  )
}

export default Spacer
