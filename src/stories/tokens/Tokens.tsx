import type { ReactNode } from 'react'

import { vars } from '../../lib/theme.css'
import * as styles from './Tokens.css'

/**
 * Live token reference. Every swatch is painted with the contract's custom
 * property rather than a copied value, so switching the theme in the toolbar
 * restyles this page too — the reference cannot drift from the tokens.
 */

const Section = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => (
  <section className={styles.section}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    <div className={styles.grid}>{children}</div>
  </section>
)

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div className={styles.card}>
    <div className={styles.swatch} style={{ background: value }} />
    <code className={styles.name}>{name}</code>
  </div>
)

const Sample = ({ name, children }: { name: string; children: ReactNode }) => (
  <div className={styles.card}>
    <div className={styles.sample}>{children}</div>
    <code className={styles.name}>{name}</code>
  </div>
)

const entries = (group: Record<string, string>) => Object.entries(group)

const TokensDisplay = () => (
  <div className={styles.page}>
    <Section title="Colour">
      {entries(vars.color).map(([name, value]) => (
        <Swatch key={name} name={`color.${name}`} value={value} />
      ))}
    </Section>

    <Section title="Space">
      {entries(vars.space).map(([name, value]) => (
        <Sample key={name} name={`space.${name}`}>
          <div
            style={{
              height: '0.75rem',
              width: value,
              background: vars.color.primary
            }}
          />
        </Sample>
      ))}
    </Section>

    <Section title="Radius">
      {entries(vars.radius).map(([name, value]) => (
        <Sample key={name} name={`radius.${name}`}>
          <div
            style={{
              height: '2.5rem',
              width: '2.5rem',
              borderRadius: value,
              background: vars.color.accent
            }}
          />
        </Sample>
      ))}
    </Section>

    <Section title="Border width">
      {entries(vars.borderWidth).map(([name, value]) => (
        <Sample key={name} name={`borderWidth.${name}`}>
          <div
            style={{
              height: '2.5rem',
              width: '2.5rem',
              borderWidth: value,
              borderStyle: vars.borderStyle.default,
              borderColor: vars.color.border
            }}
          />
        </Sample>
      ))}
    </Section>

    <Section title="Shadow">
      {entries(vars.shadow).map(([name, value]) => (
        <Sample key={name} name={`shadow.${name}`}>
          <div
            style={{
              height: '2.5rem',
              width: '2.5rem',
              boxShadow: value,
              background: vars.color.surface,
              borderWidth: vars.borderWidth.hairline,
              borderStyle: vars.borderStyle.default,
              borderColor: vars.color.border
            }}
          />
        </Sample>
      ))}
    </Section>

    <Section title="Type scale">
      {entries(vars.fontSize).map(([name, value]) => (
        <Sample key={name} name={`fontSize.${name}`}>
          <span style={{ fontSize: value, fontFamily: vars.font.heading }}>
            Ag
          </span>
        </Sample>
      ))}
    </Section>

    <Section title="Font">
      {entries(vars.font).map(([name, value]) => (
        <Sample key={name} name={`font.${name}`}>
          <span style={{ fontFamily: value, fontSize: vars.fontSize.lg }}>
            Ag
          </span>
        </Sample>
      ))}
    </Section>
  </div>
)

export default TokensDisplay
