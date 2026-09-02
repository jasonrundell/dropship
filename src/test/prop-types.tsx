import { createRef } from 'react'

import Blockquote from '../components/Blockquote/Blockquote'
import Box from '../components/Box/Box'
import Button from '../components/Button/Button'
import Container from '../components/Container/Container'
import Grid from '../components/Grid/Grid'
import Heading from '../components/Heading/Heading'
import Link from '../components/Link/Link'
import Row from '../components/Row/Row'
import Spacer from '../components/Spacer/Spacer'

/**
 * Type-level regression fixture for issue #156.
 *
 * Every one of these components already forwards `id`, `className`,
 * `aria-*`, `data-*`, and `ref` to its underlying DOM element at runtime via
 * its `...props` spread — but before each `*Props` interface extended the
 * matching `React.ComponentPropsWithRef<'tag'>`, TypeScript rejected them at
 * the call site. This file is never rendered or imported by anything; its
 * only job is to fail `tsc -p tsconfig.app.json --noEmit` (via `npm run
 * typecheck`) if that gap reopens.
 */

const anchorRef = createRef<HTMLAnchorElement>()
const headingRef = createRef<HTMLHeadingElement>()
const buttonRef = createRef<HTMLButtonElement>()
const divRef = createRef<HTMLDivElement>()
const quoteRef = createRef<HTMLQuoteElement>()

export default function PropTypesFixture() {
  return (
    <>
      <Link
        href="/x"
        label="hi"
        id="link-id"
        className="consumer-class"
        aria-haspopup="true"
        aria-controls="panel-1"
        data-testid="my-link"
        ref={anchorRef}
      />
      <Heading
        id="heading-id"
        className="consumer-class"
        aria-level={2}
        data-testid="my-heading"
        ref={headingRef}
      >
        Section
      </Heading>
      <Button
        label="Save"
        id="button-id"
        className="consumer-class"
        aria-pressed="true"
        data-testid="my-button"
        ref={buttonRef}
      />
      <Box
        id="box-id"
        className="consumer-class"
        aria-hidden="true"
        data-testid="my-box"
        ref={divRef}
      >
        content
      </Box>
      <Container
        id="container-id"
        className="consumer-class"
        data-testid="my-container"
        ref={divRef}
      >
        content
      </Container>
      <Grid
        id="grid-id"
        className="consumer-class"
        data-testid="my-grid"
        ref={divRef}
      >
        <div>cell</div>
      </Grid>
      <Row
        id="row-id"
        className="consumer-class"
        data-testid="my-row"
        ref={divRef}
      >
        <div>cell</div>
      </Row>
      <Spacer
        id="spacer-id"
        className="consumer-class"
        data-testid="my-spacer"
        ref={divRef}
      />
      <Blockquote
        id="blockquote-id"
        className="consumer-class"
        data-testid="my-blockquote"
        ref={quoteRef}
      >
        quote
      </Blockquote>
    </>
  )
}
