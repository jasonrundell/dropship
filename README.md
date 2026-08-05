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
| `Button`     | `label`, `primary`, `size` (`small`/`medium`/`large`), `backgroundColor`, `onClick`           |
| `Container`  | —                                                                                             |
| `Grid`       | `columnGap`, `rowGap`, `gridTemplateColumns`, `mediumTemplateColumns`, `largeTemplateColumns` |
| `Heading`    | `level` (1–6), `id`                                                                           |
| `Link`       | `href`, `label`, `target`, `rel`, `onClick`                                                   |
| `Row`        | `justify`, `align`                                                                            |
| `Spacer`     | `smallScreen`, `mediumScreen`, `largeScreen` (`xsmall`–`xlarge`)                              |

## Design tokens

Tokens are defined in `src/lib/common.tokens.json` following the
[DTCG Format Module 2025.10](https://tr.designtokens.org/format/) specification,
and compile to CSS custom properties on `:root`.

Those custom property names are part of the public API. To restyle every
component that uses a token, override it in your own stylesheet — no rebuild
required:

```css
:root {
  --dropship-color-primary: #0f766e;
  --dropship-padding-large: 2.5rem;
}
```

Names follow the token file's structure: `--dropship-color-*`,
`--dropship-size-*`, `--dropship-padding-*`, `--dropship-fontSize-*`,
`--dropship-heading-*`, `--dropship-breakpoint-*`, and `--dropship-font-*`.

## Storybook

This project uses Storybook for developing and showcasing components. Each
component lives in `src/components/<Name>/` alongside its styles
(`<Name>.css.ts`), tests, and story.

## Scripts

| Script                    | Purpose                                                |
| ------------------------- | ------------------------------------------------------ |
| `npm start`               | Start Storybook                                        |
| `npm run dev`             | Start the Vite dev server                              |
| `npm run build`           | Build the library (ESM, CJS, types, CSS)               |
| `npm test`                | Run the test suite                                     |
| `npm run test:watch`      | Run tests in watch mode                                |
| `npm run test:coverage`   | Run tests with coverage thresholds enforced            |
| `npm run lint`            | Lint (zero warnings tolerated)                         |
| `npm run typecheck`       | Typecheck without emitting                             |
| `npm run check:package`   | Build, then validate the package with publint and attw |
| `npm run build-storybook` | Build the static Storybook                             |
| `npm run prettier`        | Format the repository                                  |

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
