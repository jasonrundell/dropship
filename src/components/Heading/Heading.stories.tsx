import type { Meta, StoryObj } from '@storybook/react-vite'

import { bounds } from '../../stories/bounds.css'
import Heading from './Heading'

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'select' },
    children: { control: 'text' },
    id: { control: 'text' }
  },
  // Framed so each level's block box — and the space a theme gives it — is
  // visible, not just the glyphs.
  decorators: [
    (Story) => (
      <div className={bounds}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof Heading>

export const H1: Story = {
  name: 'H1',
  args: {
    level: 1,
    children: 'This is an H1 heading'
  }
}

export const H2: Story = {
  name: 'H2',
  args: {
    level: 2,
    children: 'This is an H2 heading'
  }
}

export const H3: Story = {
  name: 'H3',
  args: {
    level: 3,
    children: 'This is an H3 heading'
  }
}

export const H4: Story = {
  name: 'H4',
  args: {
    level: 4,
    children: 'This is an H4 heading'
  }
}

export const H5: Story = {
  name: 'H5',
  args: {
    level: 5,
    children: 'This is an H5 heading'
  }
}

export const H6: Story = {
  name: 'H6',
  args: {
    level: 6,
    children: 'This is an H6 heading'
  }
}
