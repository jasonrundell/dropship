import type { Meta, StoryObj } from '@storybook/react'

import Container from './Container'

const meta: Meta<typeof Container> = {
  title: 'Atoms/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' }
  }
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: 'This is a container'
  }
}
