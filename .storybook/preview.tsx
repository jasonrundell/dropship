import type { Decorator, Preview } from '@storybook/react-vite'

import { THEME_NAMES } from '../src/lib/schema'
import { DEFAULT_THEME } from '../src/lib/theme.css'

/**
 * The Zen Garden switch. Every story renders identical markup; changing the
 * theme changes only the token values on the wrapper, and the whole page
 * restyles. If a component fails to respond here, it is hard-coding something.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? DEFAULT_THEME

  /**
   * A story shown alone wants the design's background to reach the bottom of
   * the canvas. A docs block is sized to its own content, so the same
   * viewport-height wrapper cannot fit inside one: it overflows, the block
   * clips to a strip, and because the wrapper leads with padding that strip is
   * mostly empty — which is what made every docs page look blank.
   */
  const fillsCanvas = context.viewMode !== 'docs'

  return (
    <div
      data-theme={theme}
      style={{
        background: 'var(--dropship-color-background)',
        color: 'var(--dropship-color-text)',
        fontFamily: 'var(--dropship-font-body)',
        padding: 'var(--dropship-space-lg)',
        minHeight: fillsCanvas ? '100vh' : undefined
      }}
    >
      <Story />
    </div>
  )
}

const preview: Preview = {
  decorators: [withTheme],
  initialGlobals: { theme: DEFAULT_THEME },
  globalTypes: {
    theme: {
      description: 'Design system theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: THEME_NAMES.map((name) => ({
          value: name,
          title: name[0].toUpperCase() + name.slice(1)
        })),
        dynamicTitle: true
      }
    }
  },
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    // Violations are errors, not suggestions. `src/stories.a11y.test.tsx`
    // runs axe over every story and fails CI on any of them, so the panel
    // here should say the same thing rather than filing them as todos.
    a11y: { test: 'error' },
    options: {
      // Read the front page before the component list.
      storySort: { order: ['Welcome', 'Tokens', 'Atoms'] }
    },
    /**
     * Chromatic snapshots the default design only.
     *
     * Snapshotting all four would catch more — a design can break a
     * component's layout in a way no unit test sees — but it also multiplies
     * every baseline by four, and any change to a shared token rebaselines the
     * lot. One design keeps the diffs readable and the review cheap.
     *
     * The other three are not unguarded: `theme-agnostic.test.ts` proves no
     * component hard-codes a value and that the designs stay structurally
     * distinct, and the toolbar switches between them for a look by eye. Add
     * a design back here when its layout is worth watching, one entry per
     * mode — `broadsheet: { theme: 'broadsheet' }`.
     */
    chromatic: { modes: { [DEFAULT_THEME]: { theme: DEFAULT_THEME } } }
  }
}

export default preview
