import type { Meta, StoryObj } from '@storybook/react-vite'

import { fill } from '../../stories/bounds.css'
import Spacer from './Spacer'

const meta: Meta<typeof Spacer> = {
  title: 'Atoms/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  argTypes: {
    smallScreen: {
      control: {
        type: 'select'
      }
    },
    mediumScreen: {
      control: {
        type: 'select'
      }
    },
    largeScreen: {
      control: {
        type: 'select'
      }
    }
  },
  // A Spacer is height and nothing else, so the only way to see one is to fill
  // it. The bar is the story: it grows and shrinks with the theme's space
  // scale, which is the whole point of the component.
  decorators: [
    (Story) => (
      <div className={fill}>
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Spacer>

export const Default: Story = {}

export const XSmall: Story = {
  name: 'XSmall',
  args: {
    smallScreen: 'xsmall',
    mediumScreen: 'xsmall',
    largeScreen: 'xsmall'
  }
}

export const Small: Story = {
  args: {
    smallScreen: 'small',
    mediumScreen: 'small',
    largeScreen: 'small'
  }
}

export const Medium: Story = {
  args: {
    smallScreen: 'medium',
    mediumScreen: 'medium',
    largeScreen: 'medium'
  }
}

export const Large: Story = {
  args: {
    smallScreen: 'large',
    mediumScreen: 'large',
    largeScreen: 'large'
  }
}

export const XLarge: Story = {
  name: 'XLarge',
  args: {
    smallScreen: 'xlarge',
    mediumScreen: 'xlarge',
    largeScreen: 'xlarge'
  }
}

/** Small for mobile screens, Medium for medium screens, Large for large screens */
export const SmallMediumLarge: Story = {
  name: 'Small/Medium/Large',
  args: {
    smallScreen: 'small',
    mediumScreen: 'medium',
    largeScreen: 'large'
  }
}
