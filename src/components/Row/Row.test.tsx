import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Row from './Row'
import { justifyVar, row } from './Row.css'
import { expectNoAxeViolations } from '../../test/axe'

describe('Row', () => {
  it('renders all of its children', () => {
    render(
      <Row>
        <div>Left</div>
        <div>Right</div>
      </Row>
    )

    expect(screen.getByText('Left')).toBeVisible()
    expect(screen.getByText('Right')).toBeVisible()
  })

  it.each(['start', 'center', 'end', 'space-between'] as const)(
    'accepts justify=%s',
    (justify) => {
      render(
        <Row justify={justify} data-testid="row">
          <div>Cell</div>
        </Row>
      )

      expect(screen.getByTestId('row')).toBeVisible()
    }
  )

  it.each(['start', 'center', 'end', 'stretch'] as const)(
    'accepts align=%s',
    (align) => {
      render(
        <Row align={align} data-testid="row">
          <div>Cell</div>
        </Row>
      )

      expect(screen.getByTestId('row')).toBeVisible()
    }
  )

  it('applies a caller-supplied gap', () => {
    render(
      <Row gap="3rem" data-testid="row">
        <div>Cell</div>
      </Row>
    )

    expect(screen.getByTestId('row').getAttribute('style')).toContain('3rem')
  })

  it('falls back to the theme gap when none is given', () => {
    render(
      <Row data-testid="row">
        <div>Cell</div>
      </Row>
    )

    // No gap variable is set inline, so the stylesheet's token fallback wins.
    expect(screen.getByTestId('row').getAttribute('style')).not.toContain('gap')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Row>
        <div>Accessible cell</div>
      </Row>
    )

    await expectNoAxeViolations(container)
  })

  it('merges a consumer className instead of replacing its own', () => {
    render(
      <Row className="consumer-class" data-testid="row">
        <div>Cell</div>
      </Row>
    )

    const classes = screen.getByTestId('row').className.split(' ')

    expect(classes).toContain(row)
    expect(classes).toContain('consumer-class')
  })

  it('merges a consumer style with its own computed alignment variables', () => {
    render(
      <Row justify="center" style={{ color: 'red' }} data-testid="row">
        <div>Cell</div>
      </Row>
    )

    const el = screen.getByTestId('row')
    const bareJustifyVar = justifyVar.match(/--[\w-]+/)?.[0] as string

    // The consumer's style must be present alongside — not instead of — the
    // computed inline vars the component sets for justify/align/gap.
    expect(el.style.getPropertyValue(bareJustifyVar)).toBe('center')
    expect(el.style.color).toBe('red')
  })
})
