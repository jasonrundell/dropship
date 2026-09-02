import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from './Button'
import { button } from './Button.css'
import { expectNoAxeViolations } from '../../test/axe'

describe('Button', () => {
  it('renders its label inside a button element', () => {
    render(<Button label="Save changes" />)

    expect(screen.getByRole('button', { name: 'Save changes' })).toBeVisible()
  })

  it('defaults to type="button" so it never submits a surrounding form', () => {
    render(<Button label="Save" />)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button label="Save" onClick={onClick} />)

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is reachable and activatable by keyboard', async () => {
    const onClick = vi.fn()
    render(<Button label="Save" onClick={onClick} />)

    await userEvent.tab()
    expect(screen.getByRole('button')).toHaveFocus()

    await userEvent.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it.each(['small', 'medium', 'large'] as const)(
    'renders at %s size',
    (size) => {
      render(<Button label={`${size} button`} size={size} />)

      expect(
        screen.getByRole('button', { name: `${size} button` })
      ).toBeVisible()
    }
  )

  it.each([true, false])('renders with primary=%s', (primary) => {
    render(<Button label="Save" primary={primary} />)

    expect(screen.getByRole('button')).toBeVisible()
  })

  it('never sets an inline style, whatever variant it is given', () => {
    // Button deliberately exposes no colour prop. A literal passed from the
    // call site would land here as an inline style, outrank the theme, and
    // survive a design change — breaking the one guarantee the system makes.
    render(<Button label="Save" primary size="large" />)

    expect(screen.getByRole('button')).not.toHaveAttribute('style')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Button label="Save changes" />)

    await expectNoAxeViolations(container)
  })

  it("highlights with the theme's alt-surface token on hover", () => {
    // jsdom cannot resolve real :hover styling, so this asserts the source
    // wires the hover rule to the token — the same technique
    // theme-agnostic.test.ts uses to enforce token usage.
    const source = readFileSync(
      join(import.meta.dirname, 'Button.css.ts'),
      'utf8'
    )

    expect(source).toMatch(/:hover['"]?:\s*{[^}]*surfaceAlt/)
  })

  it('merges a consumer className instead of replacing its own', () => {
    render(<Button label="Save" className="consumer-class" />)

    const classes = screen.getByRole('button').className.split(' ')

    expect(classes).toEqual(
      expect.arrayContaining([
        ...button({ primary: false, size: 'medium' }).split(' '),
        'consumer-class'
      ])
    )
  })
})
