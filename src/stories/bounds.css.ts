import { style } from '@vanilla-extract/css'

import { vars } from '../lib/theme.css'

/**
 * Visualisation aids for stories whose component draws little or nothing of its
 * own. A layout primitive is an invisible rectangle on the page, so the story
 * has to lend it something to look at.
 *
 * They are painted from the theme contract for the same reason the components
 * are. A fixed colour would be the one thing on the page that ignores the
 * design picker, and Chromatic snapshots every story against every design — so
 * a hard-coded block would clash four different ways at once instead of one.
 */

/**
 * A frame around the component, held off it by one step of the space scale.
 *
 * `outline` rather than `border`, deliberately: an outline is drawn outside the
 * box and occupies no space, so the frame never shifts the thing it is framing.
 * The padding does the other half of that job — without it the frame lands flush
 * against components that draw an edge of their own, and in a design with heavy
 * borders the two read as a single thick rule.
 */
export const bounds = style({
  background: vars.color.surface,
  outline: `${vars.borderWidth.thin} ${vars.borderStyle.default} ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: vars.space.sm
})

/**
 * A solid block, for where an outline is not enough: Spacer is pure height and
 * has no content to frame, so its size only reads as a filled bar.
 */
export const fill = style({
  background: vars.color.accent,
  color: vars.color.onAccent,
  borderRadius: vars.radius.sm
})

/**
 * A filled block with mass, for children that exist to be arranged. Row's
 * alignment stories need something of a given size to push around.
 */
export const block = style([
  fill,
  {
    padding: vars.space.md,
    margin: vars.space.md
  }
])
