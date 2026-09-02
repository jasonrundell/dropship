import type { CSSProperties } from 'react'

/**
 * Merging, not replacing.
 *
 * Every component builds its own class (and some also build an inline
 * `style`, e.g. Row's flex alignment or Grid's column templates) as a JSX
 * attribute, then spreads the caller's own `...props` after it so id,
 * `data-*`, `aria-*`, event handlers, and everything else genuinely
 * unknown to the component still reaches the DOM. `className` and `style`
 * are casualties of that spread: "last wins" for a duplicate key means a
 * caller-supplied `className` or `style` does not append to the
 * component's own value, it silently replaces it — dropping the
 * component's built-in styling (colour, hover state, focus outline,
 * everything) with no warning.
 *
 * A consuming component package needs the opposite guarantee: its own
 * stable class name lands *alongside* whatever class the library applies
 * internally, so its own stylesheet can still select the element. These two
 * helpers are the one place that guarantee is implemented, so every
 * component gets it the same way instead of five ad hoc fixes.
 */

/**
 * Joins a component's own class name with a caller-supplied one. The
 * component's class comes first, so a caller's stylesheet still wins ties in
 * the cascade by declaration order, same as any other appended class.
 * `undefined` and empty strings are dropped, so a bare component class with
 * no caller override stays exactly as it was.
 */
export function mergeClassNames(
  ...classNames: Array<string | undefined>
): string {
  return classNames.filter(Boolean).join(' ')
}

/**
 * Merges a component's own computed inline style — typically the output of
 * `assignInlineVars`, setting the theme's CSS custom properties — with a
 * caller-supplied `style` object. The caller's values win on a key conflict:
 * overriding one specific property is a deliberate choice a component
 * should not fight, but every computed value the caller did *not* touch
 * survives instead of being wiped out wholesale.
 */
export function mergeStyle(
  computed: Record<string, string>,
  callerStyle?: CSSProperties
): CSSProperties {
  return callerStyle ? { ...computed, ...callerStyle } : computed
}
