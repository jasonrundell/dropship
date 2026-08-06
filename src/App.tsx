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
} from './index'
import { THEME_NAMES } from './lib/schema'
import * as styles from './App.css'

/**
 * The Zen Garden panel.
 *
 * `Panel` is written once. It is rendered once per theme, and the only thing
 * that differs between renders is the `data-theme` attribute on the wrapper.
 * Any visual difference you see below comes entirely from token values.
 */
const Panel = () => (
  <Container>
    <Heading level={2}>Specimen</Heading>
    <Spacer smallScreen="xsmall" />
    <Heading level={4}>Identical markup, different tokens</Heading>
    <Spacer smallScreen="small" />

    <Row gap="0.75rem" align="center">
      <Button label="Primary" primary />
      <Button label="Secondary" />
      <Button label="Small" size="small" primary />
    </Row>

    <Card
      media={<div style={{ height: '100%', minHeight: '4rem' }} />}
      title="Card"
      actions={
        <>
          <Button label="Open" primary size="small" />
          <Button label="Later" size="small" />
        </>
      }
    >
      The media, title, body and actions are named grid areas. Where they sit is
      a token.
    </Card>

    <Spacer smallScreen="small" />

    <Box>
      <Heading level={5}>Surface</Heading>
      <Spacer smallScreen="xsmall" />
      <p style={{ margin: 0 }}>
        Body copy on a raised surface, with a <Link href="#" label="link" />{' '}
        inside it.
      </p>
    </Box>

    <Spacer smallScreen="small" />

    <Grid gridTemplateColumns="1fr 1fr" mediumTemplateColumns="1fr 1fr">
      <Box isTight>
        <Heading level={6}>Tight</Heading>
      </Box>
      <Box isTight>
        <Heading level={6}>Tight</Heading>
      </Box>
    </Grid>

    <Spacer smallScreen="small" />

    <Blockquote>
      The same nine components, restyled by nothing but token values.
    </Blockquote>
    <Spacer smallScreen="medium" />
  </Container>
)

const App = () => (
  <div className={styles.gallery}>
    {THEME_NAMES.map((theme) => (
      <section key={theme} data-theme={theme} className={styles.pane}>
        <div className={styles.label}>{theme}</div>
        <Panel />
      </section>
    ))}
  </div>
)

export default App
