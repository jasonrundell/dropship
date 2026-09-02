import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Link from './Link'
import { link } from './Link.css'
import { expectNoAxeViolations } from '../../test/axe'

describe('Link', () => {
  it('renders an anchor with its label as the accessible name', () => {
    render(<Link href="/docs" label="Read the docs" />)

    expect(screen.getByRole('link', { name: 'Read the docs' })).toHaveAttribute(
      'href',
      '/docs'
    )
  })

  it('passes through target and rel', () => {
    render(
      <Link
        href="https://example.com"
        label="External"
        target="_blank"
        rel="noopener noreferrer"
      />
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Link href="#section" label="Jump" onClick={onClick} />)

    await userEvent.click(screen.getByRole('link'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is reachable by keyboard', async () => {
    render(<Link href="/docs" label="Read the docs" />)

    await userEvent.tab()

    expect(screen.getByRole('link')).toHaveFocus()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Link href="/docs" label="Read the docs" />)

    await expectNoAxeViolations(container)
  })

  it("highlights with the theme's alt-surface token on hover", () => {
    // jsdom cannot resolve real :hover styling, so this asserts the source
    // wires the hover rule to the token — the same technique
    // theme-agnostic.test.ts uses to enforce token usage.
    const source = readFileSync(
      join(import.meta.dirname, 'Link.css.ts'),
      'utf8'
    )

    expect(source).toMatch(/:hover['"]?:\s*{[^}]*surfaceAlt/)
  })

  it('merges a consumer className instead of replacing its own', () => {
    render(
      <Link href="/docs" label="Read the docs" className="consumer-class" />
    )

    const classes = screen.getByRole('link').className.split(' ')

    expect(classes).toContain(link)
    expect(classes).toContain('consumer-class')
  })

  it('renders children after the label', () => {
    render(
      <Link href="/docs" label="Read the docs">
        <span data-testid="icon">→</span>
      </Link>
    )

    const anchor = screen.getByRole('link')

    expect(anchor.childNodes[0]).toHaveTextContent('Read the docs')
    expect(anchor.childNodes[1]).toBe(screen.getByTestId('icon'))
  })
})
