import { toCssValue } from '../../lib/dtcg'
import type { DtcgNode, DtcgToken } from '../../lib/dtcg'
import type { ThemeName } from '../../lib/schema'
import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import * as styles from './Trace.css'

import hangar from '../../tokens/hangar.tokens.json'
import broadsheet from '../../tokens/broadsheet.tokens.json'
import arcade from '../../tokens/arcade.tokens.json'
import cascade from '../../tokens/cascade.tokens.json'

/**
 * The receipt for a rendered component.
 *
 * The Tokens reference answers "what values does this design use". This answers
 * the harder question: *where did the thing I am looking at come from*. For
 * each visible characteristic of the card below it shows the DTCG source in the
 * theme document, and what `toCssValue` turns that into — the same function the
 * build calls to generate the stylesheet.
 *
 * Nothing on this page is transcribed. If a token file changes, so does every
 * snippet here, which is the only way a demonstration of a compiler can be
 * trusted.
 */

const DOCS: Record<ThemeName, DtcgNode> = {
  hangar: hangar as unknown as DtcgNode,
  broadsheet: broadsheet as unknown as DtcgNode,
  arcade: arcade as unknown as DtcgNode,
  cascade: cascade as unknown as DtcgNode
}

type Traced = {
  /** Written as a reader would describe it, not as the token names it. */
  seen: string
  /** Dotted path into the theme document. */
  path: string
}

/**
 * Every entry is a token `Card.css.ts` actually consumes, chosen so that each
 * one lands on a different DTCG `$type`. Between them they exercise the whole
 * value pipeline — a colour, three flavours of dimension, a composite shadow, a
 * font stack, and the non-standard layout string.
 */
const TRACED: Traced[] = [
  { seen: 'The panel it sits on', path: 'color.surface' },
  { seen: 'The space inside its edge', path: 'space.md' },
  { seen: 'How sharp its corners are', path: 'radius.lg' },
  { seen: 'The weight of its outline', path: 'borderWidth.hairline' },
  { seen: 'How far it lifts off the page', path: 'shadow.md' },
  { seen: "The title's typeface", path: 'font.heading' },
  { seen: 'Where the media block sits', path: 'layout.cardAreas' }
]

type TokenTrace = {
  /** The token's own node, exactly as it appears in the theme document. */
  source: string
  /** What the compiler emits for it. */
  css: string
  /** The custom property that carries it. */
  property: string
  /** Resolved `$type`, which may be inherited from an ancestor group. */
  type: string
}

/**
 * Walks a dotted path into a theme document, collecting the group-level `$type`
 * on the way down — DTCG lets a group declare a type that its descendants
 * inherit, so a token node alone is not enough to compile it.
 */
const trace = (doc: DtcgNode, path: string): TokenTrace => {
  const keys = path.split('.')
  let node: unknown = doc
  let inherited: string | undefined

  for (const key of keys) {
    const group = node as DtcgNode
    if (typeof group.$type === 'string') inherited = group.$type
    node = group[key]
  }

  const token = node as DtcgToken

  return {
    source: JSON.stringify(token, null, 2),
    css: toCssValue(token, inherited),
    property: `--topiary-${keys.join('-')}`,
    type: token.$type ?? inherited ?? 'unknown'
  }
}

const media = <div style={{ minHeight: '6rem', height: '100%' }} />

const Trace = ({ theme }: { theme: ThemeName }) => {
  const doc = DOCS[theme]
  const file = `src/tokens/${theme}.tokens.json`

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h2 className={styles.title}>How a design is made</h2>
        <p className={styles.lede}>
          Below is one card, and then the seven token values that painted it.
          Every snippet is read out of the theme document at render time and put
          through the compiler, so what you see is what the build sees. Change
          the design in the toolbar and the card, the source, and the compiled
          output all move together.
        </p>
        <p className={styles.active}>
          Tracing <strong>{theme}</strong> &mdash; {file}
        </p>
      </header>

      <div className={styles.specimen}>
        <Card
          media={media}
          title="One card, seven tokens"
          actions={
            <>
              <Button label="Primary" primary size="small" />
              <Button label="Secondary" size="small" />
            </>
          }
        >
          Nothing about this card is written per design. It has the same props
          in all four.
        </Card>
        <p className={styles.caption}>
          The specimen. Each row below accounts for one thing you can see in it.
        </p>
      </div>

      <ol className={styles.rows}>
        {TRACED.map(({ seen, path }) => {
          const { source, css, property, type } = trace(doc, path)

          return (
            <li key={path} className={styles.row}>
              <div className={styles.rowHead}>
                <span className={styles.seen}>{seen}</span>
                <code className={styles.path}>{path}</code>
                <code className={styles.type}>${type}</code>
              </div>

              <div className={styles.stages}>
                <div className={styles.stage}>
                  <span className={styles.stageLabel}>
                    Source &mdash; {file}
                  </span>
                  <pre className={styles.code}>
                    <code>{source}</code>
                  </pre>
                </div>

                <div className={styles.stage}>
                  <span className={styles.stageLabel}>
                    Compiled &mdash; toCssValue()
                  </span>
                  <pre className={styles.code}>
                    <code>
                      <span className={styles.property}>{property}</span>: {css}
                      ;
                    </code>
                  </pre>
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <p className={styles.footnote}>
        The right-hand column is the public API. Redefine any of those
        properties in your own stylesheet and every component that reads them
        follows, with no rebuild &mdash; which is all a design is here. The
        left-hand column is what you write instead if you would rather ship a
        whole design than patch one.
      </p>
    </div>
  )
}

export default Trace
