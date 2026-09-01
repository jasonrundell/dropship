# How to build with Topiary

Two audiences use this guide. **Consumers** install the package and want to
theme it or override a value. **Contributors** work inside this repo and want to
add a component or extend the token contract. Read Part 1 if you're the former;
skip to Part 2 if you're the latter — but read Part 2 even as a consumer,
because it's the fastest way to understand _why_ Topiary is shaped the way it
is.

Everything here is a walkthrough. For the reference material this guide points
back to, see [README.md](../README.md) (public API, scripts, themes) and
[CONTRIBUTING.md](../CONTRIBUTING.md) (setup, PR checklist, releases).

---

## Part 1 — Using Topiary as a consumer

Install it and import the stylesheet once, at your app's entry point:

```sh
npm install @jasonrundell/topiary
```

```js
import '@jasonrundell/topiary/style.css'
```

Then use components like any other React components:

```jsx
import { Button, Card } from '@jasonrundell/topiary'

function App() {
  return (
    <Card title="Welcome" actions={<Button label="Get started" primary />}>
      Tokens drive form. Components drive function.
    </Card>
  )
}
```

### Switching the design

Topiary ships four themes (`hangar`, `broadsheet`, `arcade`, `cascade`). Set
`data-theme` on any ancestor element — no rebuild, no JavaScript required, and
it cascades so you can scope a theme to a subtree:

```html
<body data-theme="arcade">
  <aside data-theme="broadsheet">…this subtree only…</aside>
</body>
```

### Overriding a token

Every CSS custom property Topiary emits is public API. Override one in your own
stylesheet — loaded after `style.css` — to restyle every component that reads
it, with no rebuild:

```css
:root {
  --topiary-color-primary: #0f766e;
  --topiary-radius-md: 0;
}
```

Names follow the contract: `--topiary-color-*`, `--topiary-space-*`,
`--topiary-radius-*`, `--topiary-borderWidth-*`, `--topiary-shadow-*`,
`--topiary-font-*`, `--topiary-fontSize-*`, `--topiary-fontWeight-*`,
`--topiary-lineHeight-*`, `--topiary-letterSpacing-*`, `--topiary-duration-*`,
`--topiary-easing-*`, and `--topiary-breakpoint-*`. The full current list, live,
is in Storybook's Tokens page — it also has a Trace page that follows one
rendered `Card` back to the exact custom properties that painted it.

If you find yourself wanting a fifth theme, or a structurally different look
than the four shipped, that's Part 5 and Part 6 below — the token contract is
the whole point, and it's meant to be extended.

---

## Part 2 — The mental model

Everything else in this guide is downstream of one rule:

> **Tokens drive form. Components drive function.**

A component decides _what_ renders and _in what order_. A theme decides _what it
looks like and where it sits_. The boundary between those two jobs is the token
contract, defined as a TypeScript type — `TokenShape` in
[`src/lib/schema.ts`](../src/lib/schema.ts) — and every theme file supplies
exactly that shape with different values.

Concretely, this means a component stylesheet may only ever reach for `vars`,
imported from [`src/lib/theme.css.ts`](../src/lib/theme.css.ts):

```ts
import { vars } from '../../lib/theme.css'

// vars.color.primary, vars.space.md, vars.radius.lg, vars.shadow.sm, …
```

**Never a literal colour or dimension.** This isn't a style guideline — it's
enforced. [`src/lib/theme-agnostic.test.ts`](../src/lib/theme-agnostic.test.ts)
scans every `src/components/**/*.css.ts` file and fails the build on any hex
colour, `rgb()`/`hsl()` call, or bare `px`/`rem`/`em` literal. If your component
needs a value no token provides yet, that test is telling you the contract has a
gap — see Part 5, not a hex code.

The one other piece of public API besides token names: a multi-part component
gives each of its DOM nodes a `data-part="component-name"` attribute (see
`Card`, Part 4). That's a stable hook for a theme to reach past the tokens with
its own CSS when it truly needs to, so treat renaming one as a breaking change.

---

## Part 3 — Building a component, step by step

Every component lives in `src/components/<Name>/` as four files:

| File               | Purpose                      |
| ------------------ | ---------------------------- |
| `<Name>.tsx`       | The component                |
| `<Name>.css.ts`    | Its styles (vanilla-extract) |
| `<Name>.test.tsx`  | Its tests                    |
| `<Name>.stories.*` | Its Storybook story          |

Walk through it with a concrete example: a `Badge` — a small label with a
semantic tone, the same shape as `Button`'s `primary`/`size` props.

### 1. Styles first (`Badge.css.ts`)

Reach only for `vars`. Model the tones as a `recipe()` variant set, exactly like
`Button` does for `primary`/`size`:

```ts
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '../../lib/theme.css'

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space['3xs'],
    paddingBlock: vars.space['3xs'],
    paddingInline: vars.space.xs,
    borderRadius: vars.radius.full,
    borderWidth: vars.borderWidth.thin,
    borderStyle: vars.borderStyle.default,
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.medium,
    lineHeight: vars.lineHeight.tight
  },
  variants: {
    tone: {
      neutral: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        borderColor: vars.color.border
      },
      success: {
        backgroundColor: vars.color.success,
        color: vars.color.onPrimary,
        borderColor: vars.color.success
      },
      warning: {
        backgroundColor: vars.color.warning,
        color: vars.color.onPrimary,
        borderColor: vars.color.warning
      },
      error: {
        backgroundColor: vars.color.error,
        color: vars.color.onError,
        borderColor: vars.color.error
      }
    }
  },
  defaultVariants: { tone: 'neutral' }
})
```

### 2. The component (`Badge.tsx`)

No raw colour prop — `tone` selects between values the active theme supplies,
which is the entire reason a colour swap re-themes the badge instead of freezing
it. This mirrors the comment at the top of `Button.tsx`; read that one, it
states the principle explicitly:

```tsx
import { badge } from './Badge.css'

export interface BadgeProps {
  /** Semantic role. Selects a colour from the active theme, never a literal. */
  tone?: 'neutral' | 'success' | 'warning' | 'error'
  /** Badge contents */
  label: string
}

const Badge = ({ tone = 'neutral', label, ...props }: BadgeProps) => (
  <span className={badge({ tone })} {...props}>
    {label}
  </span>
)

export default Badge
```

### 3. Tests (`Badge.test.tsx`)

Coverage is enforced at 100% in CI, so a component needs tests before it can
land. Query by role/text, not implementation details, and every component test
asserts no axe violations:

```tsx
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Badge from './Badge'
import { expectNoAxeViolations } from '../../test/axe'

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge label="New" />)
    expect(screen.getByText('New')).toBeVisible()
  })

  it.each(['neutral', 'success', 'warning', 'error'] as const)(
    'renders with tone=%s',
    (tone) => {
      render(<Badge label="New" tone={tone} />)
      expect(screen.getByText('New')).toBeVisible()
    }
  )

  it('has no axe violations', async () => {
    const { container } = render(<Badge label="New" />)
    await expectNoAxeViolations(container)
  })
})
```

### 4. Story (`Badge.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import Badge from './Badge'

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs']
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = { args: { label: 'New' } }
export const Success: Story = { args: { label: 'Shipped', tone: 'success' } }
```

You don't need to wire up an accessibility check for the story yourself —
[`src/stories.a11y.test.tsx`](../src/stories.a11y.test.tsx) discovers every
`*.stories.*` file automatically and runs the same axe assertion through the
real theme-switcher decorator. Adding a story adds its check for free.

### 5. Export it

Add the export to [`src/index.ts`](../src/index.ts):

```ts
export { default as Badge } from './components/Badge/Badge'
```

Then update the expected export list in
[`src/index.test.ts`](../src/index.test.ts) — that test exists specifically so a
change to the public API is a deliberate, visible diff rather than an accident.

### 6. Verify

```sh
npm test
npm run lint
npm run typecheck
```

If all four theme files already cover every colour and dimension you used (they
do here — `tone` only reaches into `vars.color`), you're done. If you needed a
value no token provides, that's Part 5.

---

## Part 4 — Components with internal structure

A component made of more than one part — `Card` is the reference — doesn't
hard-code its layout. It renders each part into a **named CSS grid area** and
lets the _theme_ decide where that area sits. This is the direct descendant of
CSS Zen Garden: the component guarantees the slot names exist; the design
decides the arrangement.

Look at [`Card.tsx`](../src/components/Card/Card.tsx) and
[`Card.css.ts`](../src/components/Card/Card.css.ts) together. The shape to copy:

- Each slot gets a `gridArea` in its stylesheet and a `data-part="card-title"`
  (etc.) attribute in the markup. `data-part` names are public API — renaming
  one is a breaking change.
- The _arrangement_ — `grid-template-areas` and `grid-template-columns` — is not
  written in the component. It comes from `vars.layout.cardAreas` and
  `vars.layout.cardColumns`, which each theme supplies its own value for.
- A slot that receives no content is omitted from the DOM entirely
  (`media !== undefined && …`), so an absent slot doesn't leave a hole in the
  grid.
- The theme is never allowed to reorder the underlying markup, only where things
  are drawn — visual order and DOM/reading order stay coupled on purpose, so a
  re-theme can't disagree with tab order or screen-reader order.

Adding a new multi-part component means adding its own `layout.*` tokens to
`TokenShape` (Part 5) and to all four theme files — layout tokens are
necessarily per-component, since the area names name that component's slots.

---

## Part 5 — Adding a token

You'll hit this whenever `theme-agnostic.test.ts` (or your own judgement) tells
you a value your component needs isn't in the contract yet — a new spacing step,
a new semantic colour, a new layout token for a new multi-part component.

1. **Add it to `TokenShape`** in [`src/lib/schema.ts`](../src/lib/schema.ts), in
   the relevant category (or a new one). Document what it's _for_, not what it
   _is_ — see the existing JSDoc comments on that type for the tone to match.
2. **Add a value to all four theme files** —
   `src/tokens/{hangar,broadsheet,arcade,cascade}.tokens.json`. Each is a
   [DTCG Format Module 2025.10](https://tr.designtokens.org/format/) document. A
   colour token looks like:

   ```json
   "primary": {
     "$value": {
       "colorSpace": "srgb",
       "components": [0.7608, 0.2549, 0.0471],
       "hex": "#c2410c"
     }
   }
   ```

   A dimension token looks like:

   ```json
   "md": {
     "$value": { "value": 1, "unit": "rem" }
   }
   ```

   Layout tokens (`grid-template-areas` strings) are the one non-standard case —
   DTCG has no layout primitive, so they carry `"$type": "string"` and a plain
   string `$value`.

3. **Use it** in your component's `.css.ts` via `vars.<category>.<name>`.
4. **Run the tests.**
   [`theme-agnostic.test.ts`](../src/lib/theme-agnostic.test.ts) checks that
   every theme satisfies the contract exactly — miss a theme file, or misspell a
   key, and the suite tells you which theme and which key are out of sync.

---

## Part 6 — Adding a theme

Themes are what make the token contract worth having. Adding a fifth:

1. Copy an existing `src/tokens/<theme>.tokens.json` to a new file and change
   the values.
2. Add the new name to `THEME_NAMES` in
   [`src/lib/schema.ts`](../src/lib/schema.ts).
3. Write a `$description` — at least two sentences (a test checks for a period
   followed by a space, so a single trailing sentence won't pass). The design
   switcher derives its copy from this field, and a test rejects a missing
   description.

Don't just recolour. `theme-agnostic.test.ts` asserts a set of _structural_ axes
— `radius.md`, `borderWidth.thin`, `shadow.md`, `font.heading`,
`letterSpacing.heading`, `layout.cardAreas` — actually differ across every
theme, and that no two themes share a typeface in any font role. A theme that
only changes colours will fail those checks by design: the point of the system
is that themes look unrelated, not recoloured.

---

## Part 7 — Before you open a pull request

```sh
npm run prettier:check
npm run lint            # zero warnings tolerated
npm run typecheck
npm run test:coverage   # 100% thresholds enforced
npm run check:package   # build, then publint + attw
```

CI runs all of these. If your change affects the published package (a new
component, prop, or token — which everything in this guide does), add a
changeset:

```sh
npm run changeset
```

Pick **minor** for a new component, prop, or token; **patch** for a fix that
doesn't change the API; **major** for anything that breaks existing usage.
Commit the generated file in `.changeset/` alongside your work.

Full setup instructions and the project's contribution norms — open an issue
before a PR, fork-based workflow, line-ending config on Windows — are in
[CONTRIBUTING.md](../CONTRIBUTING.md).

## Where to look next

- **Storybook** — every component in every theme, the live token reference, and
  the Trace page that follows one rendered card back to its tokens.
- **[`README.md`](../README.md)** — the public component and token API.
- **[`VISION.md`](./VISION.md)** — where the token pipeline is headed next (a
  real compiler, contrast validation, an ESLint plugin, an agent manifest) —
  useful context if you're extending the contract itself rather than building on
  top of it.
