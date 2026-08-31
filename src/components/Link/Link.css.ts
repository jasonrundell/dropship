import { style } from '@vanilla-extract/css'

import { vars } from '../../lib/theme.css'

export const link = style({
  color: vars.color.primary,
  fontFamily: vars.font.body,
  lineHeight: vars.lineHeight.normal,
  textDecorationLine: 'underline',
  textDecorationThickness: vars.borderWidth.hairline,
  textUnderlineOffset: vars.space['3xs'],
  borderRadius: vars.radius.sm,
  cursor: 'pointer',
  transitionProperty: 'text-decoration-thickness',
  transitionDuration: vars.duration.fast,
  transitionTimingFunction: vars.easing.standard,
  ':hover': {
    textDecorationThickness: vars.borderWidth.thin
  },
  ':focus-visible': {
    outline: `${vars.borderWidth.thick} solid ${vars.color.focus}`,
    outlineOffset: vars.space['3xs']
  }
})
