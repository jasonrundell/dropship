import type { Meta, StoryObj } from '@storybook/react'

import Grid from './Grid'

const meta: Meta<typeof Grid> = {
  title: 'Atoms/Grid',
  component: Grid,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    columnGap: { control: 'text' },
    rowGap: { control: 'text' },
    gridTemplateColumns: { control: 'text' },
    mediumTemplateColumns: { control: 'text' },
    largeTemplateColumns: { control: 'text' }
  }
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof Grid>

const sixCols = (
  <>
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
    <div>Six</div>
  </>
)

const twelveCols = (
  <>
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
    <div>Six</div>
    <div>Seven</div>
    <div>Eight</div>
    <div>Nine</div>
    <div>Ten</div>
    <div>Eleven</div>
    <div>Twelve</div>
  </>
)

const blogPosts = (
  <>
    <div>
      <img src="https://placehold.co/150" alt="Post Thumbnail" />
      <h3>Understanding React Hooks</h3>
      <p>
        <small>March 10, 2023</small>
      </p>
      <p>
        React Hooks are functions that let you use state and other React
        features without writing a class...
      </p>
      <a href="#">Read more</a>
    </div>
    <div>
      <img src="https://placehold.co/150" alt="Post Thumbnail" />
      <h3>Getting Started with TypeScript</h3>
      <p>
        <small>April 5, 2023</small>
      </p>
      <p>
        TypeScript is a typed superset of JavaScript that compiles to plain
        JavaScript...
      </p>
      <a href="#">Read more</a>
    </div>
    <div>
      <img src="https://placehold.co/150" alt="Post Thumbnail" />
      <h3>CSS Grid Layout: A Comprehensive Guide</h3>
      <p>
        <small>May 15, 2023</small>
      </p>
      <p>
        CSS Grid Layout is a two-dimensional layout system for the web. It lets
        you layout items in rows and columns...
      </p>
      <a href="#">Read more</a>
    </div>
    <div>
      <img src="https://placehold.co/150" alt="Post Thumbnail" />
      <h3>Introduction to Node.js</h3>
      <p>
        <small>June 20, 2023</small>
      </p>
      <p>
        Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
        It allows you to run JavaScript on the server...
      </p>
      <a href="#">Read more</a>
    </div>
    <div>
      <img src="https://placehold.co/150" alt="Post Thumbnail" />
      <h3>Mastering Flexbox</h3>
      <p>
        <small>July 10, 2023</small>
      </p>
      <p>
        Flexbox is a one-dimensional layout method for laying out items in rows
        or columns...
      </p>
      <a href="#">Read more</a>
    </div>
    <div>
      <img src="https://placehold.co/150" alt="Post Thumbnail" />
      <h3>Building RESTful APIs with Express</h3>
      <p>
        <small>August 25, 2023</small>
      </p>
      <p>
        Express is a minimal and flexible Node.js web application framework that
        provides a robust set of features for web and mobile applications...
      </p>
      <a href="#">Read more</a>
    </div>
  </>
)

export const Default: Story = {
  args: {
    children: sixCols
  }
}

export const ColumnCount3: Story = {
  args: {
    children: sixCols,
    gridTemplateColumns: '1fr 1fr 1fr',
    mediumTemplateColumns: '1fr 1fr 1fr',
    largeTemplateColumns: '1fr 1fr 1fr'
  }
}

export const ColumnCount6: Story = {
  args: {
    children: twelveCols,
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    mediumTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    largeTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr'
  }
}

/** 1 (mobile), 3 (tablet), 6 (desktop) */
export const Mobile1Tablet3Desktop6: Story = {
  args: {
    children: twelveCols,
    gridTemplateColumns: '1fr',
    mediumTemplateColumns: '1fr 1fr 1fr',
    largeTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr'
  }
}

export const ColumnGap3: Story = {
  args: {
    children: sixCols,
    columnGap: '3rem'
  }
}

export const RowGap3: Story = {
  args: {
    children: sixCols,
    rowGap: '3rem'
  }
}

export const BlogPosts: Story = {
  args: {
    children: blogPosts,
    columnGap: '60px',
    rowGap: '60px'
  }
}
