import { Meta, StoryObj } from '@storybook/react'

import TokensDisplay from './Tokens'

const meta: Meta<typeof TokensDisplay> = {
  title: 'Tokens',
  component: TokensDisplay
} satisfies Meta<typeof TokensDisplay>

export default meta
type Story = StoryObj<typeof TokensDisplay>

export const Default: Story = {}
