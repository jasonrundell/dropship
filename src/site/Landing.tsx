import {
  Blockquote,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Link,
  Row,
  Spacer
} from '../index'
import { THEMES } from '../lib/themes'
import type { ThemeName } from '../lib/schema'
import * as styles from './Landing.css'

/**
 * Dropship's landing page, and its own demonstration.
 *
 * Every design in the picker renders this exact component tree. Nothing below
 * branches on the active theme — the page has no idea which design is showing.
 * That is the whole claim, made by construction rather than by assertion.
 *
 * Structurally this owes an obvious debt to CSS Zen Garden, which is credited
 * in the footer. The content is Dropship's own.
 */

const INSTALL = `npm install @jasonrundell/dropship`

const USAGE = `import '@jasonrundell/dropship/style.css'
import { Card, Button } from '@jasonrundell/dropship'

<Card title="Ready" actions={<Button label="Go" primary />}>
  Styled by whichever theme is active.
</Card>`

const THEME_OVERRIDE = `/* A theme is a block of custom properties.
   Nothing is rebuilt; nothing is recompiled. */
[data-theme='mine'] {
  --dropship-color-primary: #0f766e;
  --dropship-radius-md: 0;
  --dropship-shadow-md: 4px 4px 0 0 #000;

  /* Placement is a token too. */
  --dropship-layout-cardAreas: 'title media' 'body media';
  --dropship-layout-cardColumns: 1fr 8rem;
}`

type LandingProps = {
  theme: ThemeName
  onSelectTheme: (theme: ThemeName) => void
}

const Landing = ({ theme, onSelectTheme }: LandingProps) => {
  const active = THEMES.find((entry) => entry.name === theme)

  return (
    <div className={styles.page}>
      <header className={styles.banner}>
        <Container>
          <div className={styles.bannerInner}>
            <span className={styles.wordmark}>Dropship</span>
            <nav className={styles.nav} aria-label="Project">
              <Link href="#designs" label="Designs" />
              <Link href="#install" label="Install" />
              <Link
                href="https://github.com/jasonrundell/dropship"
                label="GitHub"
              />
              <Link
                href="https://dropship-storybook.vercel.app/"
                label="Storybook"
              />
            </nav>
          </div>
        </Container>
      </header>

      <main>
        <section className={styles.section}>
          <Container>
            <span className={styles.eyebrow}>Design system</span>
            <Spacer smallScreen="xsmall" />
            <Heading level={1}>
              Tokens drive form. Components drive function.
            </Heading>
            <Spacer smallScreen="small" />
            <p className={styles.lede}>
              Every design below renders this same page from the same nine
              components. Nothing changes but a token file.
            </p>
            <Spacer smallScreen="medium" />
            <Row gap="0.75rem" align="center">
              <Button
                label="Pick a design"
                primary
                onClick={() => {
                  document
                    .querySelector('#designs')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
              <Button
                label="Install it"
                onClick={() => {
                  document
                    .querySelector('#install')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            </Row>
          </Container>
        </section>

        <section className={styles.section} aria-labelledby="what-changes">
          <Container>
            <Heading level={2} id="what-changes">
              What a design controls
            </Heading>
            <Spacer smallScreen="small" />
            <p className={styles.prose}>
              A design is a set of token values. It never touches the markup, so
              it can never break behaviour, semantics, or reading order — and it
              can still change a great deal more than colour.
            </p>
            <Spacer smallScreen="medium" />

            <Grid
              gridTemplateColumns="1fr"
              mediumTemplateColumns="1fr 1fr"
              largeTemplateColumns="repeat(3, 1fr)"
            >
              <Card title="Surface" titleAs="h3">
                Colour, type, and the scales behind them. The part everyone
                expects a token to own.
              </Card>
              <Card title="Structure" titleAs="h3">
                Radius, border weight and style, and how elevation is expressed
                — a soft blur, a hard offset, or nothing at all.
              </Card>
              <Card title="Placement" titleAs="h3">
                Components render into named grid areas, so a token decides
                where each part sits. These three cards are proving it right
                now.
              </Card>
            </Grid>

            <Spacer smallScreen="medium" />

            <Card
              media={<div style={{ minHeight: '7rem', height: '100%' }} />}
              title="This card is the demonstration"
              titleAs="h3"
              actions={
                <>
                  <Button label="Primary" primary size="small" />
                  <Button label="Secondary" size="small" />
                </>
              }
            >
              Its media, title, body and actions are named grid areas. Pick a
              different design below and watch the media move — the markup does
              not change, only the value of one token.
            </Card>

            <Spacer smallScreen="medium" />
            <Blockquote>
              A palette swap gives you the same design in different colours.
              Changing what a design is allowed to control is what makes two of
              them look unrelated.
            </Blockquote>
          </Container>
        </section>

        <section
          className={styles.section}
          id="designs"
          aria-labelledby="designs-heading"
        >
          <Container>
            <Heading level={2} id="designs-heading">
              Select a design
            </Heading>
            <Spacer smallScreen="small" />
            <p className={styles.prose}>
              Four designs ship with Dropship. Choosing one re-renders nothing —
              it sets a single attribute, and the cascade does the rest.{' '}
              {active ? (
                <>
                  You are looking at{' '}
                  <span className={styles.pickerCurrent}>{active.name}</span>.
                </>
              ) : null}
            </p>
            <Spacer smallScreen="medium" />

            <div className={styles.picker}>
              {THEMES.map((entry) => (
                <button
                  type="button"
                  key={entry.name}
                  className={styles.pickerItem}
                  aria-current={entry.name === theme}
                  onClick={() => onSelectTheme(entry.name)}
                >
                  <span className={styles.pickerName}>{entry.name}</span>
                  <span className={styles.pickerNote}>{entry.headline}</span>
                  <Spacer smallScreen="xsmall" />
                  <span className={styles.swatchRow} aria-hidden="true">
                    {entry.swatches.map((colour) => (
                      <span
                        key={colour}
                        className={styles.swatch}
                        style={{ background: colour }}
                      />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </Container>
        </section>

        <section
          className={styles.section}
          id="install"
          aria-labelledby="install-heading"
        >
          <Container>
            <Heading level={2} id="install-heading">
              Install
            </Heading>
            <Spacer smallScreen="small" />
            <p className={styles.prose}>
              No runtime dependencies, and no styling library to install
              alongside it. Styles compile to plain CSS at build time.
            </p>
            <Spacer smallScreen="small" />
            <pre className={styles.codeBlock}>
              <code>{INSTALL}</code>
            </pre>
            <Spacer smallScreen="small" />
            <pre className={styles.codeBlock}>
              <code>{USAGE}</code>
            </pre>

            <Spacer smallScreen="medium" />
            <Heading level={3}>Write your own design</Heading>
            <Spacer smallScreen="small" />
            <p className={styles.prose}>
              The custom property names are public API. Override them anywhere
              and every component that uses them follows.
            </p>
            <Spacer smallScreen="small" />
            <pre className={styles.codeBlock}>
              <code>{THEME_OVERRIDE}</code>
            </pre>
          </Container>
        </section>

        <section className={styles.section} aria-labelledby="a11y-heading">
          <Container>
            <Heading level={2} id="a11y-heading">
              Every design has to be usable
            </Heading>
            <Spacer smallScreen="small" />
            <Box isRoomy>
              <p className={styles.prose}>
                A design that cannot be read is not a design. Every colour
                pairing these components put on screen is checked against WCAG
                AA in the test suite, so a design whose colours fail cannot be
                released. Components carry real focus rings, a token cannot
                change reading order, and every component is asserted free of
                axe violations. Building this page found four contrast failures
                that no amount of looking had caught.
              </p>
            </Box>
          </Container>
        </section>
      </main>

      <footer className={styles.contentinfo}>
        <Container>
          <p className={styles.prose}>
            Dropship is an homage to{' '}
            <Link href="https://csszengarden.com/" label="CSS Zen Garden" /> by
            Dave Shea, which made the case in 2003 that one document could carry
            any number of designs. This is that idea applied to a component
            library, with design tokens in place of stylesheets. The content and
            code here are Dropship&rsquo;s own.
          </p>
          <Spacer smallScreen="small" />
          <p className={`${styles.prose} ${styles.muted}`}>
            MIT licensed.{' '}
            <Link
              href="https://github.com/jasonrundell/dropship"
              label="Source on GitHub"
            />
            .
          </p>
        </Container>
        <Spacer smallScreen="small" />
      </footer>
    </div>
  )
}

export default Landing
