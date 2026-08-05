/**
 * The token contract.
 *
 * Every theme supplies exactly this shape. It is the interface between the
 * two halves of the system: **tokens drive form, components drive function.**
 * A component may only reach for these names, never a literal value — enforced
 * by `theme-agnostic.test.ts`.
 *
 * The categories are chosen so that themes can differ structurally rather than
 * just chromatically. Radius, border width, border style, shadow, and font
 * family are the axes that let one theme read as brutalist and another as
 * editorial while rendering identical markup. A palette swap alone would only
 * ever produce the same design in different colours.
 */
export type TokenShape = {
  color: {
    /** Page background. */
    background: string
    /** Raised panel background. */
    surface: string
    /** Body text. */
    text: string
    /** De-emphasised text. Must still pass AA against `surface`. */
    textMuted: string
    /** Hairlines, rules, and component outlines. */
    border: string
    /** Principal action colour. */
    primary: string
    /** Text and icons on `primary`. */
    onPrimary: string
    /** Secondary emphasis. */
    accent: string
    /** Text and icons on `accent`. */
    onAccent: string
    /** Focus ring. Deliberately separate from `primary` so themes can make it louder. */
    focus: string
    success: string
    warning: string
    error: string
    /** Text and icons on `error`. */
    onError: string
  }
  /** Spacing scale. Also used for gaps and padding. */
  space: {
    '3xs': string
    '2xs': string
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
  }
  /** Corner radii. `none` is a real choice, not an absence. */
  radius: {
    none: string
    sm: string
    md: string
    lg: string
    full: string
  }
  borderWidth: {
    none: string
    hairline: string
    thin: string
    thick: string
  }
  /** DTCG strokeStyle. Lets a theme use dashed rules where another uses solid. */
  borderStyle: {
    default: string
  }
  /**
   * Elevation. A theme may express this as a soft blur, a hard offset with no
   * blur, or nothing at all — which is most of the difference between a
   * neo-brutalist and a soft aesthetic.
   */
  shadow: {
    none: string
    sm: string
    md: string
    lg: string
  }
  font: {
    body: string
    heading: string
    mono: string
  }
  fontSize: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
  }
  fontWeight: {
    regular: string
    medium: string
    bold: string
    /** Headings often diverge from body weight; themes control that here. */
    heading: string
  }
  lineHeight: {
    tight: string
    normal: string
    loose: string
  }
  letterSpacing: {
    tight: string
    normal: string
    wide: string
    /** Wide tracking on headings reads as technical; tight reads as editorial. */
    heading: string
  }
  duration: {
    fast: string
    normal: string
    slow: string
  }
  easing: {
    standard: string
    entrance: string
    exit: string
  }
  breakpoint: {
    sm: string
    md: string
    lg: string
  }
}

/** Themes shipped with the library. `hangar` is the default. */
export const THEME_NAMES = [
  'hangar',
  'broadsheet',
  'arcade',
  'cascade'
] as const

export type ThemeName = (typeof THEME_NAMES)[number]
