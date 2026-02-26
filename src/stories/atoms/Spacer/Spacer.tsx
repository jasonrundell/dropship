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
        height: `${Tokens.sizes.xsmall.$value.value}${Tokens.sizes.xsmall.$value.unit}`
      }
    },
    {
      props: {
        smallScreen: 'small'
      },
      style: {
        height: `${Tokens.sizes.small.$value.value}${Tokens.sizes.small.$value.unit}`
      }
    },
    {
      props: {
        smallScreen: 'medium'
      },
      style: {
        height: `${Tokens.sizes.medium.$value.value}${Tokens.sizes.medium.$value.unit}`
      }
    },
    {
      props: {
        smallScreen: 'large'
      },
      style: {
        height: `${Tokens.sizes.large.$value.value}${Tokens.sizes.large.$value.unit}`
      }
    },
    {
      props: {
        smallScreen: 'xlarge'
      },
      style: {
        height: `${Tokens.sizes.xlarge.$value.value}${Tokens.sizes.xlarge.$value.unit}`
      }
    },
    {
      props: {
        mediumScreen: 'xsmall'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes.xsmall.$value.value}${Tokens.sizes.xsmall.$value.unit}`
        }
      }
    },
    {
      props: {
        mediumScreen: 'small'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes.small.$value.value}${Tokens.sizes.small.$value.unit}`
        }
      }
    },
    {
      props: {
        mediumScreen: 'medium'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes.medium.$value.value}${Tokens.sizes.medium.$value.unit}`
        }
      }
    },
    {
      props: {
        mediumScreen: 'large'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes.large.$value.value}${Tokens.sizes.large.$value.unit}`
        }
      }
    },
    {
      props: {
        mediumScreen: 'xlarge'
      },
      style: {
        '@media (min-width: 48rem)': {
          height: `${Tokens.sizes.xlarge.$value.value}${Tokens.sizes.xlarge.$value.unit}`
        }
      }
    },
    {
      props: {
        largeScreen: 'xsmall'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes.xsmall.$value.value}${Tokens.sizes.xsmall.$value.unit}`
        }
      }
    },
    {
      props: {
        largeScreen: 'small'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes.small.$value.value}${Tokens.sizes.small.$value.unit}`
        }
      }
    },
    {
      props: {
        largeScreen: 'medium'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes.medium.$value.value}${Tokens.sizes.medium.$value.unit}`
        }
      }
    },
    {
      props: {
        largeScreen: 'large'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes.large.$value.value}${Tokens.sizes.large.$value.unit}`
        }
      }
    },
    {
      props: {
        largeScreen: 'xlarge'
      },
      style: {
        '@media (min-width: 64rem)': {
          height: `${Tokens.sizes.xlarge.$value.value}${Tokens.sizes.xlarge.$value.unit}`
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
