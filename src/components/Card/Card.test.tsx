import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Card from './Card'
import { expectNoAxeViolations } from '../../test/axe'

describe('Card', () => {
  it('renders every slot it is given', () => {
    render(
      <Card
        media={<img src="/x.png" alt="" />}
        title="A title"
        actions={<button type="button">Act</button>}
      >
        Body copy
      </Card>
    )

    expect(screen.getByRole('heading', { name: 'A title' })).toBeVisible()
    expect(screen.getByText('Body copy')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Act' })).toBeVisible()
  })

  it('omits slots that are not supplied, leaving no empty grid cells', () => {
    const { container } = render(<Card title="Only a title" />)

    expect(container.querySelector('[data-part="card-media"]')).toBeNull()
    expect(container.querySelector('[data-part="card-body"]')).toBeNull()
    expect(container.querySelector('[data-part="card-actions"]')).toBeNull()
    expect(container.querySelector('[data-part="card-title"]')).not.toBeNull()
  })

  it('exposes a stable data-part hook on every slot', () => {
    const { container } = render(
      <Card media="m" title="t" actions="a">
        b
      </Card>
    )

    // These names are public API: a theme may target them with its own CSS
    // when tokens alone are not enough.
    for (const part of [
      'card',
      'card-media',
      'card-title',
      'card-body',
      'card-actions'
    ]) {
      expect(
        container.querySelector(`[data-part="${part}"]`),
        `${part} should be present`
      ).not.toBeNull()
    }
  })

  it('renders the title as an h3 by default', () => {
    render(<Card title="Default" />)

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Default'
    )
  })

  it.each(['h2', 'h4', 'h5', 'h6'] as const)(
    'renders the title as %s when asked',
    (tag) => {
      render(<Card title="Custom" titleAs={tag} />)

      expect(screen.getByRole('heading', { level: Number(tag[1]) })).toBeVisible()
    }
  )

  it('keeps DOM order independent of visual placement', () => {
    // A theme can move the media anywhere via grid areas, but reading order is
    // fixed by the component. This is deliberate: it stops a theme from making
    // tab order disagree with what is on screen.
    const { container } = render(
      <Card media="m" title="t" actions="a">
        b
      </Card>
    )

    const parts = [...container.querySelectorAll('[data-part]')]
      .map((el) => el.getAttribute('data-part'))
      .filter((part) => part !== 'card')

    expect(parts).toEqual([
      'card-media',
      'card-title',
      'card-body',
      'card-actions'
    ])
  })

  it('forwards arbitrary props to the root', () => {
    render(<Card title="t" data-testid="card" id="an-id" />)

    expect(screen.getByTestId('card')).toHaveAttribute('id', 'an-id')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Card
        media={<img src="/x.png" alt="" />}
        title="Accessible card"
        actions={<button type="button">Act</button>}
      >
        Body copy
      </Card>
    )

    await expectNoAxeViolations(container)
  })
})
