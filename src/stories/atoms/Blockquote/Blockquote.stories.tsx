import type { Meta, StoryObj } from '@storybook/react'
import Tokens from '../../../lib/tokens'

import Blockquote from './Blockquote'

const meta: Meta<typeof Blockquote> = {
  title: 'Atoms/Blockquote',
  component: Blockquote,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    children: { control: 'text' }
  }
} satisfies Meta<typeof Blockquote>

export default meta
type Story = StoryObj<typeof Blockquote>

export const Default: Story = {
  args: {
    children: 'This is a blockquote'
  }
}

export const WithColor: Story = {
  args: {
    color: Tokens.colors.primary.$value.hex,
    children: 'This is a blockquote'
  }
}

export const WithMultipleParagraphs: Story = {
  args: {
    color: Tokens.colors.primary.$value.hex,
    children: (
      <>
        <p>
          It is not the strongest of the species that survive, nor the most
          intelligent, but the one most responsive to change.
        </p>
        <p>
          Adaptability is key to survival in any situation. Those who learn to
          navigate the challenges of life with grace will emerge stronger.
        </p>
      </>
    )
  }
}
