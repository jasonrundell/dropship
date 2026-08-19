# Dropship

Dropship is a component library designed to provide reusable UI components for
your projects. It currently includes a small variety of atoms (molecules and
organisms are TBD) to help you build consistent and maintainable user
interfaces.

## View Dropship on Storybook

You can see the latest build of Dropship on Storybook at
[https://dropship-storybook.vercel.app/](https://dropship-storybook.vercel.app/).

## Requirements

- React 19 and React DOM 19 (peer dependencies)
- Node 22 or newer for local development

Dropship has no runtime dependencies of its own — styles compile to plain CSS at
build time, so there is no styling library to install alongside it.

## Installation

```sh
npm install @jasonrundell/dropship
```

Import the stylesheet once, at your application's entry point:

```js
import '@jasonrundell/dropship/style.css'
```

Then import components as needed:

```jsx
import { Button } from '@jasonrundell/dropship'

function App() {
  return <Button label="Click Me" />
}
```

## Atoms

Atoms are the basic building blocks of a user interface. Here are all of the
atoms included in Dropship:

| Component    | Key props                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------- |
| `Blockquote` | `color`                                                                                       |
| `Box`        | `isTight`, `isRoomy`                                                                          |
| `Button`     | `label`, `primary`, `size` (`small`/`medium`/`large`), `onClick`                              |
| `Card`       | `media`, `title`, `children`, `actions`, `titleAs` — slots arranged by the theme              |
| `Container`  | —                                                                                             |
| `Grid`       | `columnGap`, `rowGap`, `gridTemplateColumns`, `mediumTemplateColumns`, `largeTemplateColumns` |
| `Heading`    | `level` (1–6), `id`                                                                           |
| `Link`       | `href`, `label`, `target`, `rel`, `onClick`                                                   |
| `Row`        | `justify`, `align`                                                                            |
| `Spacer`     | `smallScreen`, `mediumScreen`, `largeScreen` (`xsmall`–`xlarge`)                              |

## Themes

Dropship ships four themes that render **identical markup** in deliberately
unrelated ways — a CSS Zen Garden for component libraries. Tokens drive form;
components drive function.

| Theme        | Character                                                                |
| ------------ | ------------------------------------------------------------------------ |
| `hangar`     | Default. Instrumentation: monospaced headings, sharp corners, hairlines  |
| `broadsheet` | Editorial print: serif, ink on paper, rules instead of boxes, no shadows |
| `arcade`     | Neo-brutalist: heavy outlines, hard offset shadows, saturated colour     |
| `cascade`    | Soft: generous rounding, blurred elevation, almost no visible borders    |

Switch themes with a single attribute — no rebuild, no JavaScript, and it
cascades, so you can scope a theme to any subtree:

```html
<body data-theme="arcade">
  <aside data-theme="broadsheet">…this subtree only…</aside>
</body>
```

The four themes differ on _structural_ axes, not just colour — `radius`,
`borderWidth`, `shadow`, `font`, and `letterSpacing`. That is what makes them
look unrelated rather than recoloured, and a test asserts they stay that way.

## Design tokens

Tokens live in `src/tokens/<theme>.tokens.json`, each a
[DTCG Format Module 2025.10](https://tr.designtokens.org/format/) document, and
compile to CSS custom properties.

Those custom property names are public API. Override one in your own stylesheet
to restyle every component that uses it — no rebuild required:

```css
:root {
  --dropship-color-primary: #0f766e;
  --dropship-radius-md: 0;
}
```

Names follow the contract's structure: `--dropship-color-*`,
`--dropship-space-*`, `--dropship-radius-*`, `--dropship-borderWidth-*`,
`--dropship-shadow-*`, `--dropship-font-*`, `--dropship-fontSize-*`,
`--dropship-fontWeight-*`, `--dropship-lineHeight-*`,
`--dropship-letterSpacing-*`, `--dropship-duration-*`, `--dropship-easing-*`,
and `--dropship-breakpoint-*`.

Writing a theme means supplying that same set of tokens with your own values.
The contract is defined in `src/lib/schema.ts`, and a test verifies every theme
satisfies it exactly.

## Storybook

This project uses Storybook for developing and showcasing components. Each
component lives in `src/components/<Name>/` alongside its styles
(`<Name>.css.ts`), tests, and story.

## Scripts

| Script                    | Purpose                                                |
| ------------------------- | ------------------------------------------------------ |
| `npm start`               | Start Storybook                                        |
| `npm run dev`             | Serve the landing page on :5173                        |
| `npm run build`           | Build the library (ESM, CJS, types, CSS)               |
| `npm run build:demo`      | Build the landing page into `demo-dist/`               |
| `npm run preview:demo`    | Serve the built landing page                           |
| `npm test`                | Run the test suite                                     |
| `npm run test:watch`      | Run tests in watch mode                                |
| `npm run test:coverage`   | Run tests with coverage thresholds enforced            |
| `npm run lint`            | Lint (zero warnings tolerated)                         |
| `npm run typecheck`       | Typecheck without emitting                             |
| `npm run check:package`   | Build, then validate the package with publint and attw |
| `npm run build-storybook` | Build the static Storybook                             |
| `npm run prettier`        | Format the repository                                  |
| `npm run prettier:check`  | Check formatting without writing (runs in CI)          |

## Contributing

Please open an issue first, then a pull request from a fork. See
[CONTRIBUTING.md](./CONTRIBUTING.md) for setup, the file layout each component
follows, testing expectations, and how releases work.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE)
file for details.

## Related

Looking for unstyled semantic markup rather than styled components?
[`@jasonrundell/dropship-primitives`](https://github.com/jasonrundell/dropship-components)
is the companion library: polymorphic HTML primitives that ship no CSS.

## Links

- [NPM @jasonrundell/dropship](https://www.npmjs.com/package/@jasonrundell/dropship)
