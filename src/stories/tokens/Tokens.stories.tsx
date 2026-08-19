import type { Meta, StoryObj } from '@storybook/react-vite'

import type { ThemeName } from '../../lib/schema'
import TokensDisplay from './Tokens'
import Trace from './Trace'

/**
 * Two views of the same token layer.
 *
 * `Reference` is the catalogue: every value the active design supplies.
 * `How a design is made` is the trace: for one rendered card, where each of its
 * visible characteristics came from, in DTCG source and compiled CSS.
 */
const meta: Meta = {
  title: 'Tokens',
  parameters: { layout: 'fullscreen' }
} satisfies Meta

export default meta
type Story = StoryObj

/**
 * Every token in the active design, painted with the token itself — and named
 * as that design's, so a screenshot of it cannot be mistaken for the palette.
 */
export const Reference: Story = {
  render: (_args, { globals }) => (
    <TokensDisplay theme={(globals.theme ?? 'hangar') as ThemeName} />
  )
}

/**
 * The specimen and its receipt. Reads the active design out of the toolbar
 * global rather than the DOM, so the snippets track whatever is on screen.
 */
export const HowADesignIsMade: Story = {
  name: 'How a design is made',
  render: (_args, { globals }) => (
    <Trace theme={(globals.theme ?? 'hangar') as ThemeName} />
  )
}
