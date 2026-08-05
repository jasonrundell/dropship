import { recipe } from '@vanilla-extract/recipes'

import { vars } from '../../lib/theme.css'

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space.xs,
    cursor: 'pointer',
    fontFamily: vars.font.body,
    fontWeight: vars.fontWeight.medium,
    lineHeight: vars.lineHeight.tight,
    letterSpacing: vars.letterSpacing.wide,
    // Radius, border, and shadow are where themes diverge most: Arcade renders
    // a square 3px outline with a hard offset shadow, Cascade a pill with a
    // soft blur and no visible edge, Broadsheet a flat rule with neither.
    borderRadius: vars.radius.md,
    borderWidth: vars.borderWidth.thin,
    borderStyle: vars.borderStyle.default,
    borderColor: vars.color.border,
    boxShadow: vars.shadow.sm,
    transitionProperty: 'background-color, box-shadow, transform, border-color',
    transitionDuration: vars.duration.fast,
    transitionTimingFunction: vars.easing.standard,
    ':hover': {
      boxShadow: vars.shadow.md
    },
    ':active': {
      boxShadow: vars.shadow.none
    },
    ':focus-visible': {
      outline: `${vars.borderWidth.thick} solid ${vars.color.focus}`,
      outlineOffset: vars.space['3xs']
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.55,
      boxShadow: vars.shadow.none
    }
  },
  variants: {
    size: {
      small: {
        fontSize: vars.fontSize.xs,
        paddingBlock: vars.space['2xs'],
        paddingInline: vars.space.sm
      },
      medium: {
        fontSize: vars.fontSize.sm,
        paddingBlock: vars.space.xs,
        paddingInline: vars.space.md
      },
      large: {
        fontSize: vars.fontSize.lg,
        paddingBlock: vars.space.sm,
        paddingInline: vars.space.lg
      }
    },
    primary: {
      true: {
        backgroundColor: vars.color.primary,
        color: vars.color.onPrimary,
        borderColor: vars.color.primary
      },
      false: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        borderColor: vars.color.border
      }
    }
  },
  defaultVariants: { size: 'medium', primary: false }
})
