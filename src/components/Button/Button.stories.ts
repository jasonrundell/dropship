import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import Button from './Button'

/**
 * Every button on this page is styled entirely by the active design. There is
 * no colour control, because there is no colour prop — `primary` and `size`
 * select between values the theme supplies. Change the design in the toolbar
 * to see what that buys.
 */
const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { onClick: fn() }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button'
  }
}

export const Secondary: Story = {
  args: {
    label: 'Button'
  }
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button'
  }
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button'
  }
}
