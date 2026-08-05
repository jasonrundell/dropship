import type { Decorator, Preview } from '@storybook/react-vite'

import { THEME_NAMES } from '../src/lib/schema'
import '../src/lib/theme.css'

/**
 * The Zen Garden switch. Every story renders identical markup; changing the
 * theme changes only the token values on the wrapper, and the whole page
 * restyles. If a component fails to respond here, it is hard-coding something.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? 'hangar'

  return (
    <div
      data-theme={theme}
      style={{
        background: 'var(--dropship-color-background)',
        color: 'var(--dropship-color-text)',
        fontFamily: 'var(--dropship-font-body)',
        padding: 'var(--dropship-space-lg)',
        minHeight: '100vh'
      }}
    >
      <Story />
    </div>
  )
}

const preview: Preview = {
  decorators: [withTheme],
  initialGlobals: { theme: 'hangar' },
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
    a11y: { test: 'todo' }
  }
}

export default preview
