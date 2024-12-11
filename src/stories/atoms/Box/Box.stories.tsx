import type { Meta, StoryObj } from '@storybook/react'

import Box from './Box'

const meta = {
  title: 'Atoms/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    isTight: { control: false },
    isRoomy: { control: false },
    children: { control: 'text' }
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'pink' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Box>

export default meta

type Story = StoryObj<typeof Box>

export const Default: Story = {
  args: {
    children: 'This is a box'
  }
}

export const Tight: Story = {
  args: {
    isTight: true,
    children: 'This is a tight box'
  }
}

export const Roomy: Story = {
  args: {
    isRoomy: true,
    children: 'This is a roomy box'
  }
}
