import type { Meta, StoryObj } from '@storybook/react'

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
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'pink' }}>
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
  name: 'Small',
  args: {
    smallScreen: 'small',
    mediumScreen: 'small',
    largeScreen: 'small'
  }
}

export const Medium: Story = {
  name: 'Medium',
  args: {
    smallScreen: 'medium',
    mediumScreen: 'medium',
    largeScreen: 'medium'
  }
}

export const Large: Story = {
  name: 'Large',
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
