import type { Meta, StoryObj } from '@storybook/react-vite'

import { bounds } from '../../stories/bounds.css'
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
  // Framed so the line the link sits on is visible, which is where a theme's
  // underline and focus ring have to work.
  decorators: [
    (Story) => (
      <div className={bounds}>
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
    href: 'https://github.com/jasonrundell/topiary',
    label: 'Visit the Topiary repository'
  }
}

export const WithTarget: Story = {
  name: 'With target _blank',
  args: {
    href: 'https://github.com/jasonrundell/topiary',
    label: 'Visit the Topiary repository',
    target: '_blank'
  }
}

export const WithRel: Story = {
  name: 'With rel noopener noreferrer',
  args: {
    href: 'https://github.com/jasonrundell/topiary',
    label: 'Visit the Topiary repository',
    rel: 'noopener noreferrer'
  }
}
