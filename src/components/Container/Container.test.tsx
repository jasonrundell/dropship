import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Container from './Container'
import { container as containerClass } from './Container.css'
import { expectNoAxeViolations } from '../../test/axe'

describe('Container', () => {
  it('renders its children', () => {
    render(<Container>Page content</Container>)

    expect(screen.getByText('Page content')).toBeVisible()
  })

  it('renders a single wrapping div', () => {
    const { container } = render(<Container>Content</Container>)

    expect(container.children).toHaveLength(1)
    expect(container.firstElementChild?.tagName).toBe('DIV')
  })

  it('forwards arbitrary props to the underlying element', () => {
    render(<Container data-testid="container">Content</Container>)

    expect(screen.getByTestId('container')).toBeVisible()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Container>Accessible content</Container>)

    await expectNoAxeViolations(container)
  })

  it('merges a consumer className instead of replacing its own', () => {
    render(<Container className="consumer-class">Content</Container>)

    const classes = screen.getByText('Content').className.split(' ')

    expect(classes).toContain(containerClass)
    expect(classes).toContain('consumer-class')
  })
})
