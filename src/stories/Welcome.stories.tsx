import type { Meta, StoryObj } from '@storybook/react'
import './page.css'

const meta: Meta = {
  title: 'Welcome',
  parameters: {
    layout: 'centered'
  }
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <article>
      <section className="storybook-page">
        <h1>Dropship</h1>
        <p>
          Hi, welcome to Dropship. Dropship is a component library designed to
          provide reusable UI components for your projects. It currently
          includes a variety of atoms to help you build consistent and
          maintainable user interfaces.
        </p>
        <p>
          This is a hobby project of <a href="https://jasonrundell.com">mine</a>
          . Why create yet-another-design-system/component library? It's because
          I enjoy building design systems, ui, and I find myself always reaching
          for a component library/design system, so why not understand
          components and design systems better by creating one!
        </p>
        <p>
          <strong>
            By no means, Dropship is not a library you should be using in a
            professional production environment, as it's is always evolving and
            frequently has breaking changes made that I just don't have the time
            to support.
          </strong>
        </p>
        <h2>Contents</h2>
        <ul>
          <li>
            <p>
              <strong>Tokens:</strong> Dropship is grounded in the practice of
              using design tokens to create a consistent (design) system.
            </p>
            <blockquote cite="https://tr.designtokens.org/format/#design-token">
              A (Design) Token is information associated with a human readable
              name, at minimum a name/value pair.
              <br />
              <a href="https://tr.designtokens.org/format/#design-token">
                https://tr.designtokens.org/format/#design-token
              </a>
              )
            </blockquote>
            <p>
              Design Tokens are used to maintain visual consistency across a
              project. Dropship's token source file is in JSON can be consumed
              by various tools and plugins to generate design tokens in
              different formats (see{' '}
              <a href="https://tr.designtokens.org/format/#file-format">
                https://tr.designtokens.org/format/#file-format
              </a>
              ).{' '}
            </p>
            <p>
              You can learn more about design tokens and the DTCG format at{' '}
              <a href="https://tr.designtokens.org/">
                https://tr.designtokens.org/
              </a>
              .
            </p>
          </li>
          <li>
            <strong>Atoms:</strong> Basic building blocks of a user interface.
          </li>
          <ul>
            <li>Blockquote</li>
            <li>Box</li>
            <li>Button</li>
            <li>Container</li>
            <li>Grid</li>
            <li>Heading</li>
            <li>Link</li>
            <li>Row</li>
            <li>Spacer</li>
          </ul>
        </ul>
        <h2>Installation</h2>
        <p>
          You can install Dropship via npm for use in your project. Start by
          installing the package:
        </p>
        <pre>
          <code>npm install @jasonrundell/dropship</code>
        </pre>
        <p>
          In your project, you'll need to import the base style.css file in
          order to render the components correctly:
        </p>
        <pre>
          <code>import '@jasonrundell/dropship/style.css'</code>
        </pre>
        <p>You can then import individual components as needed:</p>
        <pre>
          <code>
            {`import { Button } from '@jasonrundell/dropship'

function App() {
  return <Button>Click Me</Button>
}`}
          </code>
        </pre>
        <h2>GitHub</h2>
        <p>
          You can view the source code for Dropship on GitHub at{' '}
          <a href="https://github.com/jasonrundell/dropship">
            https://github.com/jasonrundell/dropship
          </a>
        </p>
        <h2>Thanks for stopping by!</h2>
        <p>
          &ndash; <a href="https://jasonrundell.com">Jason Rundell</a>
        </p>
      </section>
    </article>
  )
}
