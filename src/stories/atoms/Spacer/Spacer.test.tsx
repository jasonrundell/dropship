import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import Spacer from './Spacer'
import { expectNoAxeViolations } from '../../../test/axe'

const SIZES = ['xsmall', 'small', 'medium', 'large', 'xlarge'] as const

describe('Spacer', () => {
  it('renders an element', () => {
    const { container } = render(<Spacer />)

    expect(container.firstElementChild).not.toBeNull()
  })

  it('is hidden from assistive technology, being purely decorative', () => {
    const { container } = render(<Spacer />)

    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it.each(SIZES)('accepts %s for the small breakpoint', (size) => {
    const { container } = render(<Spacer smallScreen={size} />)

    expect(container.firstElementChild).toBeVisible()
  })

  it.each(SIZES)('accepts %s for the medium breakpoint', (size) => {
    const { container } = render(<Spacer mediumScreen={size} />)

    expect(container.firstElementChild).toBeVisible()
  })

  it.each(SIZES)('accepts %s for the large breakpoint', (size) => {
    const { container } = render(<Spacer largeScreen={size} />)

    expect(container.firstElementChild).toBeVisible()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Spacer />)

    await expectNoAxeViolations(container)
  })
})
