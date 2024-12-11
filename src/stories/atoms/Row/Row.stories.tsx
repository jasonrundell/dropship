import type { Meta, StoryObj } from '@storybook/react'

import Row from './Row'

const meta: Meta<typeof Row> = {
  title: 'Atoms/Row',
  component: Row,
  tags: ['autodocs'],
  argTypes: {
    justify: {
      control: {
        type: 'select'
      }
    },
    align: {
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
} satisfies Meta<typeof Row>

export default meta
type Story = StoryObj<typeof Row>

export const Default: Story = {
  args: {
    children: 'This is a row'
  }
}

export const Centered: Story = {
  name: 'Centered',
  args: {
    justify: 'center',
    align: 'center',
    children: (
      <>
        <div
          style={{
            backgroundColor: 'yellow',
            padding: '1rem',
            margin: '1rem',
            height: '2rem'
          }}
        >
          One
        </div>
        <div
          style={{
            backgroundColor: 'yellow',
            padding: '1rem',
            margin: '1rem',
            height: '5rem'
          }}
        >
          Two
        </div>
        <div
          style={{
            backgroundColor: 'yellow',
            padding: '1rem',
            margin: '1rem',
            height: '3rem'
          }}
        >
          Three
        </div>
      </>
    )
  }
}
