import type { Meta, StoryObj } from '@storybook/react'

import Link from './Link'

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    label: { control: 'text' },
    target: { control: 'text' },
    rel: { control: 'text' }
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'pink' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {}

export const WithHref: Story = {
  args: {
    href: 'https://github.com/jasonrundell/dropship',
    label: 'Visit the Dropship repository'
  }
}

export const WithTarget: Story = {
  name: 'With target _blank',
  args: {
    href: 'https://github.com/jasonrundell/dropship',
    label: 'Visit the Dropship repository',
    target: '_blank'
  }
}

export const WithRel: Story = {
  name: 'With rel noopener noreferrer',
  args: {
    href: 'https://github.com/jasonrundell/dropship',
    label: 'Visit the Dropship repository',
    rel: 'noopener noreferrer'
  }
}
