import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Heading from './Heading'
import { heading } from './Heading.css'
import { expectNoAxeViolations } from '../../test/axe'

describe('Heading', () => {
  it('renders an h1 by default', () => {
    render(<Heading>Page title</Heading>)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Page title'
    )
  })

  it.each([1, 2, 3, 4, 5, 6] as const)(
    'renders an h%s when level is set',
    (level) => {
      render(<Heading level={level}>Section</Heading>)

      const heading = screen.getByRole('heading', { level })
      expect(heading).toHaveTextContent('Section')
      expect(heading.tagName).toBe(`H${level}`)
    }
  )

  it('applies an id so it can be linked to', () => {
    render(<Heading id="introduction">Introduction</Heading>)

    expect(screen.getByRole('heading')).toHaveAttribute('id', 'introduction')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Heading level={2}>Accessible heading</Heading>
    )

    await expectNoAxeViolations(container)
  })

  it('merges a consumer className instead of replacing its own', () => {
    render(<Heading className="consumer-class">Section</Heading>)

    const classes = screen.getByRole('heading').className.split(' ')

    // `recipe()` classes are themselves a space-separated list (base +
    // variant), so every one of its tokens must survive alongside the
    // consumer's.
    expect(classes).toEqual(
      expect.arrayContaining([
        ...heading({ level: 1 }).split(' '),
        'consumer-class'
      ])
    )
  })
})
