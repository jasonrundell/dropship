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
        height: `${Tokens.sizes.xsmall.value}${Tokens.sizes.xsmall.unit}`
      }
    },
    {
      props: {
        smallScreen: 'small'
      },
      style: {
        height: `${Tokens.sizes.small.value}${Tokens.sizes.small.unit}`
      }
    },
    {
      props: {
        smallScreen: 'medium'
      },
      style: {
        height: `${Tokens.sizes.medium.value}${Tokens.sizes.medium.unit}`
      }
    },
    {
      props: {
        smallScreen: 'large'
      },
      style: {
        height: `${Tokens.sizes.large.value}${Tokens.sizes.large.unit}`
      }
    },
    {
      props: {
        smallScreen: 'xlarge'
      },
      style: {
        height: `${Tokens.sizes.xlarge.value}${Tokens.sizes.xlarge.unit}`
      }
    },
    {
      props: {
        mediumScreen: 'xsmall'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes.xsmall.value}${Tokens.sizes.xsmall.unit}`
        }
      }
    },
    {
      props: {
        mediumScreen: 'small'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes.small.value}${Tokens.sizes.small.unit}`
        }
      }
    },
    {
      props: {
        mediumScreen: 'medium'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes.medium.value}${Tokens.sizes.medium.unit}`
        }
      }
    },
    {
      props: {
        mediumScreen: 'large'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes.large.value}${Tokens.sizes.large.unit}`
        }
      }
    },
    {
      props: {
        mediumScreen: 'xlarge'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes.xlarge.value}${Tokens.sizes.xlarge.unit}`
        }
      }
    },
    {
      props: {
        largeScreen: 'xsmall'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes.xsmall.value}${Tokens.sizes.xsmall.unit}`
        }
      }
    },
    {
      props: {
        largeScreen: 'small'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes.small.value}${Tokens.sizes.small.unit}`
        }
      }
    },
    {
      props: {
        largeScreen: 'medium'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes.medium.value}${Tokens.sizes.medium.unit}`
        }
      }
    },
    {
      props: {
        largeScreen: 'large'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes.large.value}${Tokens.sizes.large.unit}`
        }
      }
    },
    {
      props: {
        largeScreen: 'xlarge'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes.xlarge.value}${Tokens.sizes.xlarge.unit}`
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
