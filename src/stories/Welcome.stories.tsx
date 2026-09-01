import type { Meta, StoryObj } from '@storybook/react-vite'
import './page.css'
import logoImage from '../assets/topiary-logo.svg'
import { THEMES } from '../lib/themes'

const meta: Meta = {
  title: 'Welcome',
  parameters: { layout: 'fullscreen' }
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <article>
      <section className="storybook-page">
        <h1>Topiary</h1>
        <div className="storybook-topiary-logo">
          <img
            src={logoImage}
            alt="The Topiary mascot — a topiary peacock in a pot — rendered once in each of the four themes: hangar, broadsheet, arcade, and cascade"
          />
        </div>

        <p className="lede">
          Tokens drive form. Components drive function. Topiary ships four
          designs that render <strong>identical markup</strong> in deliberately
          unrelated ways &mdash; a CSS Zen Garden for component libraries.
        </p>

        <p>
          Use the <strong>Theme</strong> control in the toolbar above to change
          the active design. Every story on this site restyles, including this
          page. Nothing rebuilds and no JavaScript runs: a design is a block of
          CSS custom properties, selected by one attribute.
        </p>

        <div className="callout">
          <p>
            <strong>This Storybook is the development surface.</strong> It
            exists to check that every component answers to every design. The
            showcase is the{' '}
            <a href="https://github.com/jasonrundell/topiary">
              project&rsquo;s landing page
            </a>
            , which renders its whole self from these same components.
          </p>
        </div>

        <p>
          This is a hobby project of <a href="https://jasonrundell.com">mine</a>
          . Why build yet another design system? Because I enjoy building them,
          I always find myself reaching for one, and the fastest way to
          understand components and design systems is to make one.
        </p>
        <p>
          <strong>
            It is not a library to depend on in production. It evolves
            constantly, breaking changes are frequent, and I don&rsquo;t have
            the time to support them.
          </strong>
        </p>

        <h2>The designs</h2>
        <p>
          Each design differs on structural axes &mdash; corner radius, border
          weight, how elevation is expressed, heading typeface &mdash; not just
          colour. A palette swap alone only ever produces the same design in
          different colours.
        </p>
        <ul>
          {THEMES.map((theme) => (
            <li key={theme.name}>
              <strong>{theme.name}</strong> &mdash; {theme.headline}
            </li>
          ))}
        </ul>

        <h2>Contents</h2>
        <ul>
          <li>
            <p>
              <strong>Tokens:</strong> the live token reference. Every swatch is
              painted with the contract&rsquo;s own custom property, so it
              cannot drift from the values the components use.
            </p>
            <blockquote cite="https://tr.designtokens.org/format/#design-token">
              A (Design) Token is information associated with a human readable
              name, at minimum a name/value pair.{' '}
              <a href="https://tr.designtokens.org/format/#design-token">
                tr.designtokens.org
              </a>
            </blockquote>
            <p>
              Topiary&rsquo;s designs are DTCG documents in JSON, one per
              design, compiled to CSS custom properties at build time. You can
              read the format at{' '}
              <a href="https://tr.designtokens.org/">tr.designtokens.org</a>.
            </p>
          </li>
          <li>
            <p>
              <strong>Atoms:</strong> the components. They exist to prove the
              system works &mdash; none of them contains a literal colour or
              dimension, which a test enforces.
            </p>
            <ul>
              <li>Blockquote</li>
              <li>Box</li>
              <li>Button</li>
              <li>Card</li>
              <li>Container</li>
              <li>Grid</li>
              <li>Heading</li>
              <li>Link</li>
              <li>Row</li>
              <li>Spacer</li>
            </ul>
            <p>
              <strong>Start with Card.</strong> It is the one component with
              internal structure, and it renders its four slots into named grid
              areas that the design arranges. Change the theme while looking at
              it and the media block moves &mdash; no prop changed.
            </p>
          </li>
        </ul>

        <h2>Installation</h2>
        <p>
          Install the package, then import the stylesheet once. It carries the
          default design and all four theme blocks.
        </p>
        <pre>
          <code>npm install @jasonrundell/topiary</code>
        </pre>
        <pre>
          <code>import '@jasonrundell/topiary/style.css'</code>
        </pre>
        <p>Then import components as you need them:</p>
        <pre>
          <code>
            {`import { Card, Button } from '@jasonrundell/topiary'

function App() {
  return (
    <Card title="Ready" actions={<Button label="Go" primary />}>
      Styled by whichever design is active.
    </Card>
  )
}`}
          </code>
        </pre>

        <h3>Choosing a design</h3>
        <p>
          Set one attribute. It cascades, so a design can be scoped to any
          subtree.
        </p>
        <pre>
          <code>
            {`<body data-theme="arcade">
  <aside data-theme="broadsheet">…this subtree only…</aside>
</body>`}
          </code>
        </pre>

        <h3>Writing your own</h3>
        <p>
          The custom property names are public API. Override them anywhere and
          every component that uses them follows &mdash; no rebuild.
        </p>
        <pre>
          <code>
            {`[data-theme='mine'] {
  --topiary-color-primary: #0f766e;
  --topiary-radius-md: 0;
  --topiary-shadow-md: 4px 4px 0 0 #000;

  /* Placement is a token too. */
  --topiary-layout-cardAreas: 'title media' 'body media';
  --topiary-layout-cardColumns: 1fr 8rem;
}`}
          </code>
        </pre>

        <h2>Accessibility</h2>
        <p>
          A design that cannot be read is not a design. Every colour pairing the
          components put on screen is checked against WCAG AA for all four
          designs, so one whose colours fail cannot be released. A token cannot
          change reading order, and every component is asserted free of axe
          violations.
        </p>

        <h2>GitHub</h2>
        <p>
          Source at{' '}
          <a href="https://github.com/jasonrundell/topiary">
            github.com/jasonrundell/topiary
          </a>
          .
        </p>

        <h2>Thanks for stopping by!</h2>
        <p>
          &ndash; <a href="https://jasonrundell.com">Jason Rundell</a>
        </p>
      </section>
    </article>
  )
}
