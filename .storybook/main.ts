import type { StorybookConfig } from '@storybook/react-vite'
import { withoutVitePlugins } from '@storybook/builder-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // addon-essentials, addon-interactions, and addon-onboarding were absorbed
    // or removed in Storybook 9/10. Docs is the surviving piece this project
    // used; a11y is added so accessibility issues surface in the UI alongside
    // the axe assertions in the unit tests.
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  async viteFinal(config) {
    config.plugins = await withoutVitePlugins(config.plugins, ['vite:dts'])
    config.plugins.push(vanillaExtractPlugin())

    return config
  }
}
export default config
