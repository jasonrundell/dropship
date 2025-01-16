# Dropship

Dropship is a component library designed to provide reusable UI components for
your projects. It currently includes a small variety of atoms (molecules and
organisms are TBD) to help you build consistent and maintainable user
interfaces.

## View Dropship on Storybook

You can see the latest build of Dropship on Storybook at
[https://dropship-storybook.vercel.app/](https://dropship-storybook.vercel.app/).

## Installation

You can install Dropship via npm for use in your project. Start by installing
the package:

```sh
npm install @jasonrundell/dropship
```

In your project, you'll need to import the base style.css file in order to
render the components correctly:

```js
import '@jasonrundell/dropship/style.css'
```

You can then import individual components as needed:

```js
import { Button } from '@jasonrundell/dropship'

function App() {
  return <Button>Click Me</Button>
}
```

## Atoms

Atoms are the basic building blocks of a user interface. Here are all of the
atoms included in Dropship:

- Blockquote
- Box
- Button
- Container
- Grid
- Heading
- Link
- Row
- Spacer

## Storybook

This project uses Storybook for developing and showcasing components. You can
find stories for various components in the src/stories directory.

## Scripts

Here are some useful scripts you can run:

- `npm run start`: Starts the development server.
- `npm run build`: Builds the project.

## Contributing

If you would like to contribute, please create an issue and then open up a PR
from a fork.

## License

This project is licensed under the MIT License. See the LICENSE file for
details.

## Links

- [NPM @jasonrundell/dropship](https://www.npmjs.com/package/@jasonrundell/dropship)
