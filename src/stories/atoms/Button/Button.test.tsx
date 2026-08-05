import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from './Button'
import { expectNoAxeViolations } from '../../../test/axe'

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

  it('applies a custom backgroundColor when given one', () => {
    render(<Button label="Save" backgroundColor="rgb(255, 0, 0)" />)

    expect(screen.getByRole('button')).toHaveStyle({
      backgroundColor: 'rgb(255, 0, 0)'
    })
  })

  it('sets no inline style when backgroundColor is omitted', () => {
    render(<Button label="Save" />)

    expect(screen.getByRole('button')).not.toHaveAttribute('style')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Button label="Save changes" />)

    await expectNoAxeViolations(container)
  })
})
