import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Box from './Box'
import { box } from './Box.css'
import { expectNoAxeViolations } from '../../test/axe'

describe('Box', () => {
  it('renders its children', () => {
    render(<Box>Boxed content</Box>)

    expect(screen.getByText('Boxed content')).toBeVisible()
  })

  it('renders with default padding when neither density prop is set', () => {
    const { container } = render(<Box>Default</Box>)

    expect(container.firstElementChild).toBeInstanceOf(HTMLDivElement)
  })

  it('renders in tight density', () => {
    render(<Box isTight>Tight</Box>)

    expect(screen.getByText('Tight')).toBeVisible()
  })

  it('renders in roomy density', () => {
    render(<Box isRoomy>Roomy</Box>)

    expect(screen.getByText('Roomy')).toBeVisible()
  })

  it('forwards arbitrary props to the underlying element', () => {
    render(<Box data-testid="box">Content</Box>)

    expect(screen.getByTestId('box')).toBeVisible()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Box>Accessible content</Box>)

    await expectNoAxeViolations(container)
  })

  it('merges a consumer className instead of replacing its own', () => {
    render(<Box className="consumer-class">Content</Box>)

    const classes = screen.getByText('Content').className.split(' ')

    expect(classes).toEqual(
      expect.arrayContaining([
        ...box({ density: 'default' }).split(' '),
        'consumer-class'
      ])
    )
  })
})
