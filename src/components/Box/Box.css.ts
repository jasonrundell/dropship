import { recipe } from '@vanilla-extract/recipes'

import { vars } from '../../lib/theme.css'

export const box = recipe({
  base: {
    backgroundColor: vars.color.surface,
    color: vars.color.text,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.md,
    lineHeight: vars.lineHeight.normal,
    borderRadius: vars.radius.lg,
    borderWidth: vars.borderWidth.hairline,
    borderStyle: vars.borderStyle.default,
    borderColor: vars.color.border,
    boxShadow: vars.shadow.md
  },
  variants: {
    density: {
      tight: { padding: vars.space.xs },
      default: { padding: vars.space.md },
      roomy: { padding: vars.space.xl }
    }
  },
  defaultVariants: { density: 'default' }
})
