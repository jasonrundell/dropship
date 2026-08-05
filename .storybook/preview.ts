import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      // Surface violations in the Storybook UI without failing the build;
      // the unit tests are what gate accessibility regressions.
      test: 'todo'
    }
  }
}

export default preview
