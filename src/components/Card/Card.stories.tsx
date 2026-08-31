import type { Meta, StoryObj } from '@storybook/react-vite'

import Card from './Card'
import Button from '../Button/Button'
import Grid from '../Grid/Grid'

/**
 * Card is where a theme stops recolouring and starts rearranging.
 *
 * Its four slots — media, title, body, actions — render into *named grid
 * areas*, and the active theme supplies the `layout.cardAreas` string that
 * places them. Switch designs in the toolbar and these stories rearrange
 * themselves without a single prop changing: Hangar pins the media left,
 * Broadsheet runs it full-bleed above the text, Arcade pushes it right, and
 * Cascade puts the title and actions on one row beneath it.
 */
const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    media: { control: false },
    actions: { control: false },
    title: { control: 'text' },
    children: { control: 'text' },
    titleAs: {
      control: 'inline-radio',
      options: ['h2', 'h3', 'h4', 'h5', 'h6']
    }
  }
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The media slot already paints itself with `color.accent`, so an empty block
 * is enough to show where the current design has put it — and it stays
 * token-driven rather than shipping a placeholder image.
 */
const media = <div style={{ minHeight: '7rem', height: '100%' }} />

const actions = (
  <>
    <Button label="Primary" primary size="small" />
    <Button label="Secondary" size="small" />
  </>
)

/** A title and body only. The common case, and the one that stacks. */
export const Default: Story = {
  args: {
    title: 'Tokens drive form',
    children:
      'Components decide what is on the card and in what reading order. The theme decides where each part sits.'
  }
}

/**
 * All four slots filled. This is the story to watch while changing the design
 * in the toolbar — the markup below is identical in every one of them.
 */
export const WithMedia: Story = {
  args: {
    media,
    title: 'Placement is a token',
    children:
      'Media, title, body, and actions are named grid areas. One token value moves the media; the DOM order never changes, so the tab order cannot disagree with what is on screen.',
    actions
  }
}

/** Slots left undefined are omitted from the DOM, leaving no empty cell behind. */
export const TitleOnly: Story = {
  args: {
    title: 'Nothing but a heading'
  }
}

/** Actions without media — a card that is mostly a call to action. */
export const WithActions: Story = {
  args: {
    title: 'Ready to install',
    children: 'No runtime dependencies, and no styling library alongside it.',
    actions
  }
}

/**
 * Three text-only cards in a row. Without media there is no media track to
 * reserve, so the templated layout is dropped and each card stacks — the case
 * that exposed the `hasMedia` variant.
 */
export const InAGrid: Story = {
  args: {},
  render: () => (
    <Grid
      gridTemplateColumns="1fr"
      mediumTemplateColumns="1fr 1fr"
      largeTemplateColumns="repeat(3, 1fr)"
    >
      <Card title="Surface">
        Colour, type, and the scales behind them. The part everyone expects a
        token to own.
      </Card>
      <Card title="Structure">
        Radius, border weight and style, and how elevation is expressed — a soft
        blur, a hard offset, or nothing at all.
      </Card>
      <Card title="Placement">
        Components render into named grid areas, so a token decides where each
        part sits.
      </Card>
    </Grid>
  )
}

/**
 * The title renders as `h3` by default. Set `titleAs` so the card fits the
 * heading outline of the page it lands on, without changing how it looks.
 */
export const CustomTitleLevel: Story = {
  args: {
    title: 'Rendered as an h2',
    titleAs: 'h2',
    children:
      'Heading level is a document-structure decision, not a visual one, so it is a prop rather than a token.'
  }
}
