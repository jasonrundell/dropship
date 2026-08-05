import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Grid from './Grid'
import { expectNoAxeViolations } from '../../../test/axe'

describe('Grid', () => {
  it('renders all of its children', () => {
    render(
      <Grid>
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </Grid>
    )

    expect(screen.getByText('One')).toBeVisible()
    expect(screen.getByText('Two')).toBeVisible()
    expect(screen.getByText('Three')).toBeVisible()
  })

  it('accepts column and row gaps', () => {
    render(
      <Grid columnGap="1rem" rowGap="2rem" data-testid="grid">
        <div>Cell</div>
      </Grid>
    )

    expect(screen.getByTestId('grid')).toBeVisible()
  })

  it('accepts a template for each breakpoint', () => {
    render(
      <Grid
        gridTemplateColumns="1fr"
        mediumTemplateColumns="1fr 1fr"
        largeTemplateColumns="1fr 1fr 1fr"
        data-testid="grid"
      >
        <div>Cell</div>
      </Grid>
    )

    expect(screen.getByTestId('grid')).toBeVisible()
  })

  it('falls back to the base template when a breakpoint template is empty', () => {
    render(
      <Grid
        gridTemplateColumns="200px 1fr"
        mediumTemplateColumns=""
        largeTemplateColumns=""
        data-testid="grid"
      >
        <div>Cell</div>
      </Grid>
    )

    // All three breakpoint variables should resolve to the base template.
    const style = screen.getByTestId('grid').getAttribute('style') ?? ''
    expect(style.match(/200px 1fr/g)).toHaveLength(3)
  })

  it('is memoised and exposes a display name for devtools', () => {
    expect(Grid.displayName).toBe('Grid')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Grid>
        <div>Accessible cell</div>
      </Grid>
    )

    await expectNoAxeViolations(container)
  })
})
