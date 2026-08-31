import type { ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { composeStories, setProjectAnnotations } from '@storybook/react'

import previewAnnotations from '../.storybook/preview'
import { expectNoAxeViolations } from './test/axe'

/**
 * Every story, checked for accessibility violations.
 *
 * Component tests already assert each atom is axe-clean in isolation. What they
 * cannot see is what happens when those atoms are *composed*: a heading level
 * that skips because a Card sets `titleAs`, a list that is not marked up as
 * one, a page whose structure only exists in a story. Those are exactly the
 * arrangements stories exist to capture, so the stories are the right thing to
 * assert against.
 *
 * This uses Storybook's portable stories rather than `@storybook/addon-vitest`.
 * The addon is the official route, but it requires browser mode and a
 * Playwright install in CI. The one thing that buys — colour contrast measured
 * against real rendering — is already covered more thoroughly by
 * `src/lib/contrast.test.ts`, which checks every pairing in all four designs
 * rather than whichever one happens to be rendered.
 *
 * Stories are discovered rather than listed, so a new story is covered the
 * moment it exists and cannot be forgotten.
 */

// Applies the preview's decorators, parameters, and initial globals, so each
// story renders inside the theme wrapper exactly as it does in Storybook.
setProjectAnnotations([previewAnnotations])

type StoryModule = Parameters<typeof composeStories>[0]

/** A story with its meta, args, and decorators already bound. */
type ComposedStory = () => ReactElement | null

const modules = import.meta.glob(['./**/*.stories.ts', './**/*.stories.tsx'], {
  eager: true
})

// The glob erases each module's type, so the composed result has to be named
// here rather than inferred.
const suites = Object.entries(modules).map(
  ([path, mod]) =>
    [
      path,
      composeStories(mod as StoryModule) as Record<string, ComposedStory>
    ] as const
)

it('finds stories to check', () => {
  // A glob that silently matches nothing would make every assertion below
  // vacuous, and the suite would still pass.
  expect(suites.length, 'no story modules matched the glob').toBeGreaterThan(0)
})

it('renders stories through the preview decorator', () => {
  // If `setProjectAnnotations` stopped taking effect, every story below would
  // still render and still pass — just bare, without the theme wrapper the
  // real Storybook gives them. Then this suite would be quietly checking
  // something other than what ships.
  const [, stories] = suites[0]
  const [Story] = Object.values(stories)
  const { container } = render(<Story />)

  expect(
    container.querySelector('[data-theme]'),
    'preview decorators are not being applied'
  ).not.toBeNull()
})

for (const [path, stories] of suites) {
  const names = Object.keys(stories)

  describe(path, () => {
    it.each(names)('%s has no axe violations', async (name) => {
      const Story = stories[name as keyof typeof stories]
      const { container } = render(<Story />)

      await expectNoAxeViolations(container)
    })
  })
}
