import { styled } from '@pigment-css/react'
import Tokens from '../../../lib/tokens'

interface SpacerProps {
  /** Size of the spacer on small screens */
  smallScreen?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  /** Size of the spacer on medium screens */
  mediumScreen?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  /** Size of the spacer on large screens */
  largeScreen?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
}

const StyledSpacer = styled('div')<SpacerProps>({
  display: 'block',
  variants: [
    {
      props: {
        smallScreen: 'xsmall'
      },
      style: {
        height: `${Tokens.sizes['xsmall']}rem`
      }
    },
    {
      props: {
        smallScreen: 'small'
      },
      style: {
        height: `${Tokens.sizes['small']}rem`
      }
    },
    {
      props: {
        smallScreen: 'medium'
      },
      style: {
        height: `${Tokens.sizes['medium']}rem`
      }
    },
    {
      props: {
        smallScreen: 'large'
      },
      style: {
        height: `${Tokens.sizes['large']}rem`
      }
    },
    {
      props: {
        smallScreen: 'xlarge'
      },
      style: {
        height: `${Tokens.sizes['xlarge']}rem`
      }
    },
    {
      props: {
        mediumScreen: 'xsmall'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes['xsmall']}rem`
        }
      }
    },
    {
      props: {
        mediumScreen: 'small'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes['small']}rem`
        }
      }
    },
    {
      props: {
        mediumScreen: 'medium'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes['medium']}rem`
        }
      }
    },
    {
      props: {
        mediumScreen: 'large'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes['large']}rem`
        }
      }
    },
    {
      props: {
        mediumScreen: 'xlarge'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes['xlarge']}rem`
        }
      }
    },
    {
      props: {
        largeScreen: 'xsmall'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes['xsmall']}rem`
        }
      }
    },
    {
      props: {
        largeScreen: 'small'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes['small']}rem`
        }
      }
    },
    {
      props: {
        largeScreen: 'medium'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes['medium']}rem`
        }
      }
    },
    {
      props: {
        largeScreen: 'large'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes['large']}rem`
        }
      }
    },
    {
      props: {
        largeScreen: 'xlarge'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes['xlarge']}rem`
        }
      }
    }
  ]
})

const Spacer = ({
  smallScreen = 'small',
  mediumScreen = 'small',
  largeScreen = 'small',
  ...props
}: SpacerProps) => {
  return (
    <StyledSpacer
      smallScreen={smallScreen}
      mediumScreen={mediumScreen}
      largeScreen={largeScreen}
      {...props}
      aria-hidden="true"
    />
  )
}

export default Spacer
