import { recipe } from '@vanilla-extract/recipes'

import { vars } from '../../lib/theme.css'

/**
 * Headings carry their own font, weight, and tracking tokens, separate from
 * body text. That separation is what lets Hangar set monospaced headings with
 * wide tracking while Broadsheet sets tightly-tracked serif — from the same
 * markup.
 */
export const heading = recipe({
  base: {
    margin: 0,
    color: vars.color.text,
    fontFamily: vars.font.heading,
    fontWeight: vars.fontWeight.heading,
    lineHeight: vars.lineHeight.tight,
    letterSpacing: vars.letterSpacing.heading,
    textWrap: 'balance',
    // Long unbroken words (and wide-tracked monospace) must not overflow a
    // narrow container.
    overflowWrap: 'break-word'
  },
  variants: {
    level: {
      1: { fontSize: vars.fontSize['3xl'] },
      2: { fontSize: vars.fontSize['2xl'] },
      3: { fontSize: vars.fontSize.xl },
      4: { fontSize: vars.fontSize.lg },
      5: { fontSize: vars.fontSize.md },
      6: { fontSize: vars.fontSize.sm }
    }
  },
  defaultVariants: { level: 1 }
})
