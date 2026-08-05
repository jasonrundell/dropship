import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Blockquote from './Blockquote'
import { expectNoAxeViolations } from '../../test/axe'

describe('Blockquote', () => {
  it('renders a blockquote element containing its children', () => {
    const { container } = render(<Blockquote>A memorable quote</Blockquote>)

    expect(container.querySelector('blockquote')).toHaveTextContent(
      'A memorable quote'
    )
  })

  it('accepts a color for the quotation marks', () => {
    render(<Blockquote color="#ff0000">Coloured quote</Blockquote>)

    expect(screen.getByText('Coloured quote')).toBeVisible()
  })

  it('forwards arbitrary props to the underlying element', () => {
    render(<Blockquote data-testid="quote">Quote</Blockquote>)

    expect(screen.getByTestId('quote')).toBeVisible()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Blockquote>Accessible quote</Blockquote>)

    await expectNoAxeViolations(container)
  })
})
