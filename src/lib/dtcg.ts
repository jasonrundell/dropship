/**
 * Converts DTCG tokens to CSS values.
 *
 * This is the seed of the token compiler: a theme file is a DTCG document, and
 * everything downstream — CSS custom properties, TypeScript constants, a
 * Tailwind theme — is a different rendering of the same tree. Only the CSS
 * target exists so far.
 *
 * Reference: https://tr.designtokens.org/format/ (Format Module 2025.10)
 */

export type Dimension = { value: number; unit: 'rem' | 'px' | 'em' }

export type DtcgColor = {
  colorSpace: string
  components: number[]
  hex: string
  alpha?: number
}

export type DtcgShadow = {
  color: DtcgColor
  offsetX: Dimension
  offsetY: Dimension
  blur: Dimension
  spread: Dimension
}

export type DtcgToken = {
  $type?: string
  $value: unknown
  $description?: string
}

export type DtcgNode = { [key: string]: DtcgNode | DtcgToken | string }

const isToken = (node: unknown): node is DtcgToken =>
  typeof node === 'object' && node !== null && '$value' in node

const dimension = (d: Dimension) => `${d.value}${d.unit}`

const color = (c: DtcgColor) =>
  c.alpha !== undefined && c.alpha < 1
    ? `color-mix(in srgb, ${c.hex} ${Math.round(c.alpha * 100)}%, transparent)`
    : c.hex

/** Quotes family names containing spaces, as CSS requires. */
export const fontFamilyToCss = (families: string[]): string =>
  families.map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', ')

const shadow = (s: DtcgShadow | DtcgShadow[]): string =>
  (Array.isArray(s) ? s : [s])
    .map(
      (layer) =>
        `${dimension(layer.offsetX)} ${dimension(layer.offsetY)} ` +
        `${dimension(layer.blur)} ${dimension(layer.spread)} ${color(layer.color)}`
    )
    .join(', ')

/**
 * Renders one token's `$value` as a CSS value. `$type` is inherited from the
 * nearest ancestor group that declares one, per the DTCG spec.
 */
export function toCssValue(token: DtcgToken, inheritedType?: string): string {
  const type = token.$type ?? inheritedType
  const value = token.$value

  switch (type) {
    case 'color':
      return color(value as DtcgColor)
    case 'dimension':
      return dimension(value as Dimension)
    case 'fontFamily':
      return fontFamilyToCss(value as string[])
    case 'duration':
      return dimension(value as Dimension)
    case 'cubicBezier': {
      const [a, b, c, d] = value as number[]
      return `cubic-bezier(${a}, ${b}, ${c}, ${d})`
    }
    case 'shadow':
      return value === 'none'
        ? 'none'
        : shadow(value as DtcgShadow | DtcgShadow[])
    case 'fontWeight':
    case 'number':
    case 'strokeStyle':
      return String(value)
    default:
      return String(value)
  }
}

/**
 * Walks a DTCG document and returns the same shape with every token replaced
 * by its CSS string. Group-level `$type` is inherited by descendants, and
 * `$`-prefixed metadata keys are dropped.
 */
export function toCssTree<T>(node: DtcgNode, inheritedType?: string): T {
  const type = (node.$type as string | undefined) ?? inheritedType
  const result: Record<string, unknown> = {}

  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue

    result[key] = isToken(child)
      ? toCssValue(child, type)
      : toCssTree(child as DtcgNode, type)
  }

  return result as T
}
