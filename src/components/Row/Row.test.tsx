import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Row from './Row'
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

  it('has no axe violations', async () => {
    const { container } = render(
      <Row>
        <div>Accessible cell</div>
      </Row>
    )

    await expectNoAxeViolations(container)
  })
})
