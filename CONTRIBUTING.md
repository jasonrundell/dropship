# Contributing to Dropship

Thanks for taking the time to contribute.

## Before you start

Please open an issue describing the change before opening a pull request. That
avoids anyone spending time on work that turns out not to fit.

## Getting set up

Dropship targets Node 22 or newer. If you use `nvm`:

```sh
nvm use          # reads .nvmrc
npm ci
npm start        # opens Storybook on :6006
```

## Making a change

Work on a branch off `main`, from your own fork.

Every component lives in `src/components/<Name>/` and consists of four files:

| File               | Purpose                      |
| ------------------ | ---------------------------- |
| `<Name>.tsx`       | The component                |
| `<Name>.css.ts`    | Its styles (vanilla-extract) |
| `<Name>.test.tsx`  | Its tests                    |
| `<Name>.stories.*` | Its Storybook story          |

`src/stories` holds Storybook-only material — the welcome page and the token
display. Library code does not belong there.

### Styling

Styles are written with [vanilla-extract](https://vanilla-extract.style/) in
`.css.ts` files and compiled to plain CSS at build time. There is no runtime
styling library.

The rule that everything else rests on: **tokens drive form, components drive
function.** A component may reference the token contract and nothing else.

- Use `style()` for static styles and `recipe()` for variant sets.
- **Never write a literal colour or dimension in a component stylesheet.**
  Import `vars` from `src/lib/theme.css.ts` and use a token. This is enforced —
  `src/lib/theme-agnostic.test.ts` fails the build on any hex colour or
  `px`/`rem`/`em` literal in `src/components/**/*.css.ts`.
- For values only known at runtime (a caller-supplied grid template), declare a
  `createVar()` and set it with `assignInlineVars`. Give it a token fallback via
  `fallbackVar` so it still themes when the caller passes nothing.

If you need a value that no token provides, that is a signal the **token
contract** has a gap, not a licence to hard-code. Add it to `TokenShape` in
`src/lib/schema.ts` and to all four theme files.

### Tokens and themes

Each theme is a
[DTCG Format Module 2025.10](https://tr.designtokens.org/format/) document in
`src/tokens/<theme>.tokens.json`. All four supply the same contract with
different values, and tests verify that they do.

Themes are expected to differ on _structural_ axes — `radius`, `borderWidth`,
`shadow`, `font`, `letterSpacing` — not only colour. A test fails if every theme
agrees on one of those, because that would mean the themes are recolourings of
one design rather than different designs.

To add a theme: copy an existing token file, change the values, and add its name
to `THEME_NAMES` in `src/lib/schema.ts`.

### Components with internal structure

A component made of more than one element should render its children into
**named grid areas** and let the theme arrange them, rather than hard-coding a
layout. `Card` is the reference implementation.

- Give each slot a `gridArea` and a `data-part` attribute. `data-part` names are
  public API — a theme may target them with its own CSS when tokens are not
  enough — so treat renaming one as a breaking change.
- Add `grid-template-areas` and `grid-template-columns` tokens to `TokenShape`
  and to all four theme files. Layout tokens are necessarily per-component,
  since the area names belong to a specific component's slots.
- Omit a slot from the DOM entirely when it has no content, so an absent slot
  leaves no empty grid cell.
- Do not let a theme change DOM order. Visual order and reading order stay
  coupled on purpose.

### Tests

Coverage thresholds are set to 100% and enforced in CI, so a new component needs
tests before it will pass.

Test what a consumer can observe — rendered output, roles, and behaviour — not
implementation details. Query by role wherever possible:

```tsx
expect(screen.getByRole('button', { name: 'Save changes' })).toBeVisible()
```

Every component test must also assert there are no accessibility violations:

```tsx
it('has no axe violations', async () => {
  const { container } = render(<YourComponent />)
  await expectNoAxeViolations(container)
})
```

If you add or remove an exported component, update the expected export list in
`src/index.test.ts`. That test exists so a change to the public API is
deliberate.

## Before opening a pull request

```sh
npm run lint          # zero warnings tolerated
npm run typecheck
npm run test:coverage
npm run check:package # build, then publint + attw
```

CI runs all of these.

## Changesets

Releases are managed by [Changesets](https://github.com/changesets/changesets).
Any change that affects the published package needs one:

```sh
npm run changeset
```

Pick the bump type and describe the change for the changelog:

- **patch** — a bug fix that does not change the API
- **minor** — a new component, prop, or token
- **major** — anything that breaks existing usage: removing or renaming an
  export or prop, changing default behaviour, or raising the React peer range

Commit the generated file in `.changeset/` with your work. Changes that touch
nothing published — CI config, docs, tests — do not need one.

Merging to `main` opens a "Version Packages" pull request. Merging _that_
publishes to npm. You do not need to bump the version by hand.

## Code style

Prettier and ESLint are the arbiters, and both run in CI. `npm run prettier`
formats everything.
