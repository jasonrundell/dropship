import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Blockquote from './Blockquote'
import { blockquote, quoteColorVar } from './Blockquote.css'
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

  it('merges a consumer className instead of replacing its own', () => {
    render(<Blockquote className="consumer-class">Quote</Blockquote>)

    const classes = screen.getByText('Quote').className.split(' ')

    expect(classes).toContain(blockquote)
    expect(classes).toContain('consumer-class')
  })

  it('merges a consumer style with its own computed quote-colour variable', () => {
    render(
      <Blockquote color="#ff0000" style={{ marginTop: '1rem' }}>
        Quote
      </Blockquote>
    )

    const el = screen.getByText('Quote')
    const bareVar = quoteColorVar.match(/--[\w-]+/)?.[0] as string

    expect(el.style.getPropertyValue(bareVar)).toBe('#ff0000')
    expect(el.style.marginTop).toBe('1rem')
  })
})
