import { style } from '@vanilla-extract/css'

import { media, vars } from '../../lib/theme.css'

export const page = style({
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.normal,
  padding: vars.space.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xl
})

export const intro = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  maxWidth: '46rem'
})

export const title = style({
  margin: 0,
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.heading,
  fontSize: vars.fontSize['2xl'],
  letterSpacing: vars.letterSpacing.heading,
  lineHeight: vars.lineHeight.tight
})

export const lede = style({
  margin: 0,
  color: vars.color.textMuted
})

/** The name of the design currently being traced. */
export const active = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  color: vars.color.primary
})

export const specimen = style({
  maxWidth: '40rem'
})

export const caption = style({
  margin: 0,
  marginTop: vars.space.sm,
  color: vars.color.textMuted,
  fontSize: vars.fontSize.sm
})

export const rows = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg
})

export const row = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm
})

export const rowHead = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: vars.space.sm,
  paddingBottom: vars.space['2xs'],
  borderBottomWidth: vars.borderWidth.hairline,
  borderBottomStyle: vars.borderStyle.default,
  borderBottomColor: vars.color.border
})

/** What a reader can actually see on the specimen above. */
export const seen = style({
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.heading,
  fontSize: vars.fontSize.lg,
  letterSpacing: vars.letterSpacing.heading
})

export const path = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  color: vars.color.primary
})

export const type = style({
  marginLeft: 'auto',
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  color: vars.color.textMuted
})

export const stages = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space.sm,
  alignItems: 'start',
  '@media': {
    [media.md]: {
      // Source on the left, what it compiles to on the right. The order is the
      // direction of the pipeline, so the page reads the way the build runs.
      gridTemplateColumns: '1fr 1fr'
    }
  }
})

export const stage = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2xs'],
  minWidth: 0
})

export const stageLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.xs,
  color: vars.color.textMuted
})

export const code = style({
  margin: 0,
  padding: vars.space.sm,
  background: vars.color.surface,
  color: vars.color.text,
  borderWidth: vars.borderWidth.hairline,
  borderStyle: vars.borderStyle.default,
  borderColor: vars.color.border,
  borderRadius: vars.radius.md,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.normal,
  whiteSpace: 'pre',
  overflowX: 'auto'
})

/** The compiled custom property, which is the half a consumer overrides. */
export const property = style({
  color: vars.color.primary
})

export const footnote = style({
  margin: 0,
  maxWidth: '46rem',
  paddingTop: vars.space.md,
  borderTopWidth: vars.borderWidth.hairline,
  borderTopStyle: vars.borderStyle.default,
  borderTopColor: vars.color.border,
  color: vars.color.textMuted,
  fontSize: vars.fontSize.sm
})
