import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

/**
 * Storybook's own chrome, which is deployed and linked to from the landing
 * page and the README. Left alone it introduces itself as "Storybook" — the
 * browser tab reads `storybook - Storybook` — which tells a visitor nothing
 * about whose it is or what it is for.
 *
 * `base: 'light'` is Storybook's own default rather than a change of
 * appearance; `create` requires a base to build a theme from.
 */
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Dropship',
    brandUrl: 'https://github.com/jasonrundell/dropship',
    brandTarget: '_self'
  })
})
