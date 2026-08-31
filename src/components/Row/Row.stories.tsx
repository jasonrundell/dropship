import type { Meta, StoryObj } from '@storybook/react-vite'

import { block, bounds } from '../../stories/bounds.css'
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
  // Framed so the track the children are being justified and aligned within is
  // visible, rather than only their final positions.
  decorators: [
    (Story) => (
      <div className={bounds}>
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
  args: {
    justify: 'center',
    align: 'center',
    // Three unequal heights, so `align` has something to disagree about.
    children: (
      <>
        <div className={block} style={{ height: '2rem' }}>
          One
        </div>
        <div className={block} style={{ height: '5rem' }}>
          Two
        </div>
        <div className={block} style={{ height: '3rem' }}>
          Three
        </div>
      </>
    )
  }
}
