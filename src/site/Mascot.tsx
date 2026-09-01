import * as styles from './Mascot.css'

/**
 * The Topiary mascot: a topiary peacock, drawn once and painted live by the
 * active design's tokens. The geometry is identical to the static brand
 * lockup in `src/assets/topiary-logo.svg`; the difference is that nothing
 * here carries a value of its own — every fill, stroke, radius, and shadow
 * resolves through the same custom properties the components use, so picking
 * a design re-clips the bird along with the rest of the page.
 */

const LEAF = 'M0 0 C-7 -16 -7 -33 0 -44 C7 -33 7 -16 0 0 Z'
const LEAF_ANGLES = [-86, -63, -40, -17, 17, 40, 63, 86]

const BODY =
  'M60 54 C65 54 68 57.5 68 62 C68 66 66.5 69 65 72 C64.5 76 65 78 68 80 ' +
  'C73 83 76 87 76 92 C76 100 69 106 60 106 C51 106 44 100 44 92 ' +
  'C44 87 47 83 52 80 C55 78 55.5 76 55 72 C53.5 69 52 66 52 62 ' +
  'C52 57.5 55 54 60 54 Z'

const Mascot = () => (
  <figure className={styles.figure}>
    <svg
      className={styles.drawing}
      viewBox="12 36 96 102"
      role="img"
      aria-label="The Topiary mascot — a topiary peacock in a pot — drawn from the active design's tokens"
    >
      {LEAF_ANGLES.map((angle) => (
        <path
          key={angle}
          className={styles.hedge}
          d={LEAF}
          transform={`translate(60 84) rotate(${angle})`}
        />
      ))}
      <path className={styles.hedge} d={BODY} />
      <path
        className={styles.stem}
        d="M60 55 L60 48 M56.5 56 L53 49 M63.5 56 L67 49"
      />
      <circle className={styles.hedge} cx="60" cy="46" r="2.4" />
      <circle className={styles.hedge} cx="52.2" cy="47.6" r="2.4" />
      <circle className={styles.hedge} cx="67.8" cy="47.6" r="2.4" />
      <circle className={styles.eye} cx="56.6" cy="61.5" r="1.7" />
      <circle className={styles.eye} cx="63.4" cy="61.5" r="1.7" />
      <path
        className={styles.beak}
        d="M56.8 65.2 L60 69.8 L63.2 65.2 Q60 63.2 56.8 65.2 Z"
      />
      <rect className={styles.trunk} x="57" y="103" width="6" height="13" />
      <path
        className={styles.pot}
        d="M38 114 H82 V120 H77.5 L74.5 134 H45.5 L42.5 120 H38 Z"
      />
    </svg>
    <figcaption className={styles.caption}>
      even the mascot is tokens
    </figcaption>
  </figure>
)

export default Mascot
