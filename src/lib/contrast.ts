/**
 * WCAG contrast maths.
 *
 * A design that cannot be read is not a design. This is the check that keeps a
 * theme honest: every foreground/background pairing the components actually
 * produce has to clear WCAG AA, and `contrast.test.ts` fails the build when one
 * does not.
 *
 * Reference: https://www.w3.org/TR/WCAG22/#contrast-minimum
 */

/** WCAG AA thresholds. */
export const AA_NORMAL = 4.5
export const AA_LARGE = 3

const channel = (value: number) => {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export const parseHex = (hex: string): [number, number, number] => {
  const value = hex.replace('#', '')
  const full =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value

  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16)
  ]
}

/** Relative luminance, per WCAG. */
export const luminance = (hex: string): number => {
  const [r, g, b] = parseHex(hex).map(channel)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Contrast ratio between two colours, from 1 to 21. */
export const contrastRatio = (a: string, b: string): number => {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

/**
 * The colour pairings the components actually put on screen.
 *
 * This list is derived from usage, not from every possible combination. A
 * pairing only belongs here if some component really renders one of these
 * colours against the other — otherwise the check constrains token values for
 * no benefit and pushes themes toward the same safe palette.
 *
 * `accent` is deliberately absent as a foreground. It is a fill colour: it
 * appears behind `onAccent` text and as decorative media, never as text
 * itself. That is what lets Arcade use a saturated yellow which could never be
 * readable as body copy on a light page.
 */
export type ContrastPair = {
  foreground: string
  background: string
  /** Where this pairing appears, quoted back in the failure message. */
  where: string
  /**
   * WCAG minimum. Text needs 4.5:1 (1.4.3); non-text UI boundaries such as
   * focus rings need 3:1 (1.4.11).
   */
  minRatio: number
}

export const CONTRAST_PAIRS: ContrastPair[] = [
  {
    foreground: 'text',
    background: 'background',
    where: 'body copy on the page',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'text',
    background: 'surface',
    where: 'body copy on a card or box',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'textMuted',
    background: 'background',
    where: 'de-emphasised copy on the page',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'textMuted',
    background: 'surface',
    where: 'de-emphasised copy on a card',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'onPrimary',
    background: 'primary',
    where: 'a primary button label',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'onAccent',
    background: 'accent',
    where: 'the eyebrow badge',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'onError',
    background: 'error',
    where: 'an error message',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'primary',
    background: 'background',
    where: 'a link on the page',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'primary',
    background: 'surface',
    where: 'a link inside a card',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'error',
    background: 'background',
    where: 'error text on the page',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'success',
    background: 'background',
    where: 'success text on the page',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'warning',
    background: 'background',
    where: 'warning text on the page',
    minRatio: AA_NORMAL
  },
  {
    foreground: 'focus',
    background: 'background',
    where: 'a focus ring on the page',
    minRatio: AA_LARGE
  },
  {
    foreground: 'focus',
    background: 'surface',
    where: 'a focus ring on a card',
    minRatio: AA_LARGE
  },
  {
    foreground: 'border',
    background: 'surface',
    where: 'a card outline',
    minRatio: 1
  }
]
