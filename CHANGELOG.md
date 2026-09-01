# @jasonrundell/topiary

## 4.0.0

### Major Changes

- [#136](https://github.com/jasonrundell/dropship/pull/136)
  [`408b387`](https://github.com/jasonrundell/dropship/commit/408b387dc020915475a312f383fcee264fb0fc71)
  Thanks [@jasonrundell](https://github.com/jasonrundell)! - Remove `Button`'s
  `backgroundColor` prop.

  It applied the value as an inline style, which is the one place a colour can
  outrank the theme. A button given `backgroundColor="#6200ea"` kept that colour
  through every design change, so the component looked re-themeable and was not
  — exactly the failure `theme-agnostic.test.ts` exists to prevent everywhere
  else.

  `primary` and `size` remain. Both select between values the active theme
  supplies, which is the distinction that matters: a variant is a choice within
  the system, a literal colour is an escape from it.

  **Migration.** Restyle through the custom properties instead, which reach
  every component rather than one button and survive a rebuild:

  ```css
  [data-theme='mine'] {
    --topiary-color-primary: #0f766e;
    --topiary-color-onPrimary: #ffffff;
  }
  ```

  For a genuine one-off, the escape hatch is still there — it is just yours to
  write, and it no longer sits in the public API advertising itself as the
  supported route.

- [#136](https://github.com/jasonrundell/dropship/pull/136)
  [`408b387`](https://github.com/jasonrundell/dropship/commit/408b387dc020915475a312f383fcee264fb0fc71)
  Thanks [@jasonrundell](https://github.com/jasonrundell)! - Require React 19,
  replace Pigment CSS with vanilla-extract, and fix package resolution.

  **Breaking changes**

  - `react` and `react-dom` peer dependencies are now `^19.0.0`. Projects on
    React 18 should stay on the 3.x line.
  - `@pigment-css/react` is no longer required alongside this package. Topiary
    now has no runtime dependencies at all — remove it from your dependencies if
    you installed it only for Topiary.

  **Fixes**

  - The CommonJS entry point was a `.js` file inside a `"type": "module"`
    package, so Node parsed it as ESM. It is now `dist/index.cjs`, and
    `require('@jasonrundell/topiary')` works.
  - The `types` export condition was ordered last and resolved as ESM types
    under `require`, so types only worked via dynamic import. Type conditions
    are now split per entry, with `dist/index.d.cts` emitted for CommonJS.
  - `yaml` was a runtime dependency that no source file imported. Removed.
  - Storybook demo assets from `public/` were being copied into the published
    package. They no longer are.

  **Improvements**

  - Design tokens now compile to CSS custom properties with stable names
    (`--topiary-color-primary`, `--topiary-size-large`, and so on). Overriding
    one in your own stylesheet restyles every component that uses it, with no
    rebuild. See the README for the naming scheme.
  - The ES bundle is 6.7 kB, down from 26.5 kB.

- [#144](https://github.com/jasonrundell/dropship/pull/144)
  [`f38fb4c`](https://github.com/jasonrundell/dropship/commit/f38fb4c5102238d3795b40191f79b55ae407ff9a)
  Thanks [@jasonrundell](https://github.com/jasonrundell)! - Rename Dropship to
  Topiary.

  The old name said nothing true about the library; the new one is the thesis in
  a word. Topiary is one living structure clipped into unrelated shapes — which
  is exactly what the library does: the same markup renders as four deliberately
  unrelated designs, with nothing changing but a token file. The name also keeps
  faith with the project's CSS Zen Garden lineage. It comes with a mascot: a
  topiary peacock, drawn once and rendered in all four themes, because the logo
  should have to prove the claim too.

  **Breaking changes**

  - The package is now `@jasonrundell/topiary`. Update your dependency and
    imports:

    ```diff
    - npm install @jasonrundell/dropship
    + npm install @jasonrundell/topiary
    ```

    ```diff
    - import '@jasonrundell/dropship/style.css'
    - import { Card, Button } from '@jasonrundell/dropship'
    + import '@jasonrundell/topiary/style.css'
    + import { Card, Button } from '@jasonrundell/topiary'
    ```

  - The CSS custom property prefix — the public theming API — is now
    `--topiary-*` instead of `--dropship-*`. Every property keeps its name after
    the prefix, so the migration is a find-and-replace:

    ```diff
    [data-theme='mine'] {
    -  --dropship-color-primary: #0f766e;
    +  --topiary-color-primary: #0f766e;
    }
    ```

  Theme names (`hangar`, `broadsheet`, `arcade`, `cascade`), component names,
  props, and `data-theme`/`data-part` attributes are all unchanged.

- [#136](https://github.com/jasonrundell/dropship/pull/136)
  [`408b387`](https://github.com/jasonrundell/dropship/commit/408b387dc020915475a312f383fcee264fb0fc71)
  Thanks [@jasonrundell](https://github.com/jasonrundell)! - Rebuild the token
  layer as a themeable contract, and ship four themes.

  Topiary now works the way CSS Zen Garden did: **tokens drive form, components
  drive function.** The same markup renders in deliberately unrelated ways
  depending only on which theme is active.

  **Four themes**

  | Theme        | Character                                                                |
  | ------------ | ------------------------------------------------------------------------ |
  | `hangar`     | Default. Instrumentation: monospaced headings, sharp corners, hairlines  |
  | `broadsheet` | Editorial print: serif, ink on paper, rules instead of boxes, no shadows |
  | `arcade`     | Neo-brutalist: heavy outlines, hard offset shadows, saturated colour     |
  | `cascade`    | Soft: generous rounding, blurred elevation, almost no visible borders    |

  **No two designs share a typeface.** Each supplies its own body, heading, and
  monospace face — Hangar sets headings in a monospace, Broadsheet in a serif,
  Arcade in a heavy grotesque, Cascade in a geometric sans — and a test asserts
  all three roles are distinct across all four. Typography is the loudest signal
  a design gives off, so two designs sharing a heading face read as variants of
  one another however far apart their colour and geometry are.

  Switch with a single attribute — no rebuild, no JavaScript, and it cascades,
  so a theme can be scoped to any subtree:

  ```html
  <body data-theme="arcade">
    <aside data-theme="broadsheet">…this subtree only…</aside>
  </body>
  ```

  **A much larger token contract.** The previous set covered colours, sizes, and
  font families. It now also covers `radius`, `borderWidth`, `borderStyle`,
  `shadow`, `fontWeight`, `lineHeight`, `letterSpacing`, `duration`, and
  `easing`. Those structural axes are what let themes look unrelated rather than
  merely recoloured — a palette swap alone only ever produces the same design in
  different colours.

  **Breaking changes**

  - Token custom properties have been renamed and restructured.
    `--topiary-size-*` and `--topiary-padding-*` are replaced by
    `--topiary-space-*`; `--topiary-heading-*` is replaced by
    `--topiary-fontSize-*`. Anything overriding the old names needs updating.
  - The `Tokens` default export and `fontFamilyToCss` are no longer exported
    from the package. Token access is via CSS custom properties, or `vars` from
    the theme module.
  - `src/lib/common.tokens.json` is replaced by per-theme documents under
    `src/tokens/`.

  **Other changes**

  - `Row` gains a `gap` prop; `Grid`'s `columnGap` and `rowGap` now fall back to
    the theme's space scale instead of collapsing to zero.
  - Components gained real focus-visible rings, transitions, and disabled
    styling, all token-driven.
  - Headings no longer overflow narrow containers.

### Minor Changes

- [#136](https://github.com/jasonrundell/dropship/pull/136)
  [`408b387`](https://github.com/jasonrundell/dropship/commit/408b387dc020915475a312f383fcee264fb0fc71)
  Thanks [@jasonrundell](https://github.com/jasonrundell)! - Themes can now
  control layout, and adds `Card`.

  Tokens previously drove appearance only. They now also drive **placement**.
  Components with internal structure render their children into named grid
  areas, and the theme supplies the `grid-template-areas` string that arranges
  them — the direct equivalent of the stable element IDs CSS Zen Garden relied
  on. The component guarantees the slots exist; the theme decides where they go.

  **New: `Card`**, the first component with internal structure. It exposes four
  slots — `media`, `title`, `body`, `actions` — and each shipped theme arranges
  them differently from identical props:

  | Theme        | Arrangement                                    |
  | ------------ | ---------------------------------------------- |
  | `hangar`     | Media pinned left in a fixed column            |
  | `broadsheet` | Full-bleed media above a single column of text |
  | `arcade`     | Media pushed right, text leading               |
  | `cascade`    | Media above, title and actions sharing a row   |

  **New tokens:** `--topiary-layout-cardAreas` and
  `--topiary-layout-cardColumns`. Layout tokens are necessarily per-component,
  since the area names belong to a specific component's slots. DTCG has no
  layout primitive, so these carry a non-standard `$type`.

  **New: `data-part` hooks.** Every `Card` slot carries a stable `data-part`
  attribute (`card`, `card-media`, `card-title`, `card-body`, `card-actions`) as
  a public hook for a theme that needs to reach past the tokens with its own
  CSS. Renaming one is a breaking change.

  A token deliberately cannot change DOM order, so visual order and reading
  order stay coupled and a theme cannot make the tab order disagree with what is
  on screen. A test asserts it.

### Patch Changes

- [#136](https://github.com/jasonrundell/dropship/pull/136)
  [`408b387`](https://github.com/jasonrundell/dropship/commit/408b387dc020915475a312f383fcee264fb0fc71)
  Thanks [@jasonrundell](https://github.com/jasonrundell)! - Every shipped
  design now meets WCAG AA, enforced by the test suite.

  Adds a contrast check over every colour pairing the components actually put on
  screen — text on backgrounds, labels on fills, focus rings on surfaces — for
  all four designs. A design whose colours fail cannot be released.

  It found four real failures the moment it ran, none of which were visible by
  eye:

  | Design  | Pairing                | Was    | Now    |
  | ------- | ---------------------- | ------ | ------ |
  | Arcade  | `primary` on page      | 4.47:1 | 4.72:1 |
  | Cascade | `onAccent` on `accent` | 3.74:1 | 4.63:1 |
  | Cascade | `success` on page      | 3.60:1 | 4.68:1 |
  | Cascade | `warning` on page      | 3.04:1 | 4.69:1 |

  Those token values have been darkened to clear the threshold.

  Two component changes came out of the same work:

  - **`Link` no longer changes colour on hover.** Switching to `accent` made
    `accent` a text colour, which would have forced every design's accent to be
    readable as body copy — impossible for Arcade's yellow. Hover now only
    thickens the underline, leaving `accent` free to be a fill.
  - **`Blockquote`'s rule now uses `primary`** rather than `accent`, for the
    same reason: a fill colour cannot be guaranteed visible as a line.

  **`Card` fix:** a card with no `media` no longer applies the templated layout.
  It was reserving an empty media column and crushing the text beside it, which
  was obvious the moment three text-only cards were put in a row.

- [#136](https://github.com/jasonrundell/dropship/pull/136)
  [`408b387`](https://github.com/jasonrundell/dropship/commit/408b387dc020915475a312f383fcee264fb0fc71)
  Thanks [@jasonrundell](https://github.com/jasonrundell)! - Describe the
  package as what it is.

  The npm description read "Get a React project up and running really fast with
  Topiary" — a generic speed pitch that says nothing true about this package and
  nothing that distinguishes it. It is now:

  > A token-driven React component library: the same markup renders as four
  > deliberately unrelated designs.

  This is the same correction already made to the README and the Storybook
  welcome page, applied to the one surface a potential user actually sees first.

Formerly published as `@jasonrundell/dropship` (3.x and earlier); entries below
the rename keep the historical name.

Releases from v3.4.0 onward are generated by
[Changesets](https://github.com/changesets/changesets). Earlier entries below
were generated by `auto`.

# v3.3.1 (Fri Jan 24 2025)

#### ⚠️ Pushed to `main`

- Adding Dropship logo ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump vite from 5.4.10 to 5.4.14
  [#113](https://github.com/jasonrundell/dropship/pull/113)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v3.3.0 (Fri Jan 17 2025)

#### 🚀 Enhancement

- Refactor tokens to DTCG format
  [#112](https://github.com/jasonrundell/dropship/pull/112)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v3.2.0 (Thu Jan 16 2025)

#### 🚀 Enhancement

- Make components compatible with Nextjs SSR
  [#110](https://github.com/jasonrundell/dropship/pull/110)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v3.1.0 (Wed Dec 11 2024)

#### 🚀 Enhancement

- Fix NPM Package build #106
  [#108](https://github.com/jasonrundell/dropship/pull/108)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v3.0.1 (Wed Dec 11 2024)

#### 🐛 Bug Fix

- Fix NPM Package build #106
  [#107](https://github.com/jasonrundell/dropship/pull/107)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v3.0.0 (Wed Dec 11 2024)

#### 💥 Breaking Change

- Feature/release3 [#105](https://github.com/jasonrundell/dropship/pull/105)
  ([@jasonrundell](https://github.com/jasonrundell))
- Upgrade to Storybook 8.4.2 #103
  [#104](https://github.com/jasonrundell/dropship/pull/104)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.9.3 (Fri Nov 08 2024)

#### 🐛 Bug Fix

- Updating red npm packages
  [#102](https://github.com/jasonrundell/dropship/pull/102)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.9.2 (Tue Nov 05 2024)

#### 🐛 Bug Fix

- React update and removed defaultProps
  [#101](https://github.com/jasonrundell/dropship/pull/101)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.9.1 (Tue Nov 05 2024)

#### 🐛 Bug Fix

- Removing css js [#100](https://github.com/jasonrundell/dropship/pull/100)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.9.0 (Tue Oct 29 2024)

#### 🚀 Enhancement

- Removing empty components
  [#99](https://github.com/jasonrundell/dropship/pull/99)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.7.0 (Mon Oct 28 2024)

#### 🚀 Enhancement

- Version update [#98](https://github.com/jasonrundell/dropship/pull/98)
  ([@jasonrundell](https://github.com/jasonrundell))
- Grid updates and README update with Storybook link
  [#97](https://github.com/jasonrundell/dropship/pull/97)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.6.3 (Tue Oct 22 2024)

#### ⚠️ Pushed to `main`

- Update README.md with installation instructions and links
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.6.2 (Tue Oct 22 2024)

#### ⚠️ Pushed to `main`

- Update README.md ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.6.1 (Tue Oct 22 2024)

#### ⚠️ Pushed to `main`

- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Add README.md with project information and instructions
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.3.0 (Tue Oct 22 2024)

#### 🚀 Enhancement

- Allow spread props [#96](https://github.com/jasonrundell/dropship/pull/96)
  ([@jasonrundell](https://github.com/jasonrundell))

#### ⚠️ Pushed to `main`

- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Reverting node version change
  ([@jasonrundell](https://github.com/jasonrundell))
- Update auto package ([@jasonrundell](https://github.com/jasonrundell))
- Refactor GitHub Actions workflow for Chromatic integration
  ([@jasonrundell](https://github.com/jasonrundell))
- Updating packages ([@jasonrundell](https://github.com/jasonrundell))
- Make config more dry ([@jasonrundell](https://github.com/jasonrundell))
- Package updates for release fix
  ([@jasonrundell](https://github.com/jasonrundell))
- Fixing token name ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump cookie and express
  [#95](https://github.com/jasonrundell/dropship/pull/95)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 3.29.4 to 3.29.5
  [#94](https://github.com/jasonrundell/dropship/pull/94)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump body-parser and express
  [#93](https://github.com/jasonrundell/dropship/pull/93)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump serve-static and express
  [#92](https://github.com/jasonrundell/dropship/pull/92)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump webpack from 5.93.0 to 5.94.0
  [#88](https://github.com/jasonrundell/dropship/pull/88)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump send and express [#90](https://github.com/jasonrundell/dropship/pull/90)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.3 to 4.5.5
  [#89](https://github.com/jasonrundell/dropship/pull/89)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.3.0 (Tue Oct 22 2024)

#### 🚀 Enhancement

- Allow spread props [#96](https://github.com/jasonrundell/dropship/pull/96)
  ([@jasonrundell](https://github.com/jasonrundell))

#### ⚠️ Pushed to `main`

- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Update auto package ([@jasonrundell](https://github.com/jasonrundell))
- Refactor GitHub Actions workflow for Chromatic integration
  ([@jasonrundell](https://github.com/jasonrundell))
- Updating packages ([@jasonrundell](https://github.com/jasonrundell))
- Make config more dry ([@jasonrundell](https://github.com/jasonrundell))
- Package updates for release fix
  ([@jasonrundell](https://github.com/jasonrundell))
- Fixing token name ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump cookie and express
  [#95](https://github.com/jasonrundell/dropship/pull/95)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 3.29.4 to 3.29.5
  [#94](https://github.com/jasonrundell/dropship/pull/94)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump body-parser and express
  [#93](https://github.com/jasonrundell/dropship/pull/93)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump serve-static and express
  [#92](https://github.com/jasonrundell/dropship/pull/92)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump webpack from 5.93.0 to 5.94.0
  [#88](https://github.com/jasonrundell/dropship/pull/88)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump send and express [#90](https://github.com/jasonrundell/dropship/pull/90)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.3 to 4.5.5
  [#89](https://github.com/jasonrundell/dropship/pull/89)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.3.0 (Tue Oct 22 2024)

#### 🚀 Enhancement

- Allow spread props [#96](https://github.com/jasonrundell/dropship/pull/96)
  ([@jasonrundell](https://github.com/jasonrundell))

#### ⚠️ Pushed to `main`

- Update auto package ([@jasonrundell](https://github.com/jasonrundell))
- Refactor GitHub Actions workflow for Chromatic integration
  ([@jasonrundell](https://github.com/jasonrundell))
- Updating packages ([@jasonrundell](https://github.com/jasonrundell))
- Make config more dry ([@jasonrundell](https://github.com/jasonrundell))
- Package updates for release fix
  ([@jasonrundell](https://github.com/jasonrundell))
- Fixing token name ([@jasonrundell](https://github.com/jasonrundell))
- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump cookie and express
  [#95](https://github.com/jasonrundell/dropship/pull/95)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 3.29.4 to 3.29.5
  [#94](https://github.com/jasonrundell/dropship/pull/94)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump body-parser and express
  [#93](https://github.com/jasonrundell/dropship/pull/93)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump serve-static and express
  [#92](https://github.com/jasonrundell/dropship/pull/92)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump webpack from 5.93.0 to 5.94.0
  [#88](https://github.com/jasonrundell/dropship/pull/88)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump send and express [#90](https://github.com/jasonrundell/dropship/pull/90)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.3 to 4.5.5
  [#89](https://github.com/jasonrundell/dropship/pull/89)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.3.0 (Tue Oct 22 2024)

#### 🚀 Enhancement

- Allow spread props [#96](https://github.com/jasonrundell/dropship/pull/96)
  ([@jasonrundell](https://github.com/jasonrundell))

#### ⚠️ Pushed to `main`

- Refactor GitHub Actions workflow for Chromatic integration
  ([@jasonrundell](https://github.com/jasonrundell))
- Updating packages ([@jasonrundell](https://github.com/jasonrundell))
- Make config more dry ([@jasonrundell](https://github.com/jasonrundell))
- Package updates for release fix
  ([@jasonrundell](https://github.com/jasonrundell))
- Fixing token name ([@jasonrundell](https://github.com/jasonrundell))
- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump cookie and express
  [#95](https://github.com/jasonrundell/dropship/pull/95)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 3.29.4 to 3.29.5
  [#94](https://github.com/jasonrundell/dropship/pull/94)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump body-parser and express
  [#93](https://github.com/jasonrundell/dropship/pull/93)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump serve-static and express
  [#92](https://github.com/jasonrundell/dropship/pull/92)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump webpack from 5.93.0 to 5.94.0
  [#88](https://github.com/jasonrundell/dropship/pull/88)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump send and express [#90](https://github.com/jasonrundell/dropship/pull/90)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.3 to 4.5.5
  [#89](https://github.com/jasonrundell/dropship/pull/89)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.3.0 (Tue Oct 22 2024)

#### 🚀 Enhancement

- Allow spread props [#96](https://github.com/jasonrundell/dropship/pull/96)
  ([@jasonrundell](https://github.com/jasonrundell))

#### ⚠️ Pushed to `main`

- Refactor GitHub Actions workflow for Chromatic integration
  ([@jasonrundell](https://github.com/jasonrundell))
- Updating packages ([@jasonrundell](https://github.com/jasonrundell))
- Make config more dry ([@jasonrundell](https://github.com/jasonrundell))
- Package updates for release fix
  ([@jasonrundell](https://github.com/jasonrundell))
- Fixing token name ([@jasonrundell](https://github.com/jasonrundell))
- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump cookie and express
  [#95](https://github.com/jasonrundell/dropship/pull/95)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump rollup from 3.29.4 to 3.29.5
  [#94](https://github.com/jasonrundell/dropship/pull/94)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump body-parser and express
  [#93](https://github.com/jasonrundell/dropship/pull/93)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump serve-static and express
  [#92](https://github.com/jasonrundell/dropship/pull/92)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump webpack from 5.93.0 to 5.94.0
  [#88](https://github.com/jasonrundell/dropship/pull/88)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump send and express [#90](https://github.com/jasonrundell/dropship/pull/90)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.3 to 4.5.5
  [#89](https://github.com/jasonrundell/dropship/pull/89)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.2.3 (Fri Sep 27 2024)

#### ⚠️ Pushed to `main`

- Refactor GitHub Actions workflow for Chromatic integration
  ([@jasonrundell](https://github.com/jasonrundell))
- Updating packages ([@jasonrundell](https://github.com/jasonrundell))
- Make config more dry ([@jasonrundell](https://github.com/jasonrundell))
- Package updates for release fix
  ([@jasonrundell](https://github.com/jasonrundell))
- Fixing token name ([@jasonrundell](https://github.com/jasonrundell))
- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump body-parser and express
  [#93](https://github.com/jasonrundell/dropship/pull/93)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump serve-static and express
  [#92](https://github.com/jasonrundell/dropship/pull/92)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump webpack from 5.93.0 to 5.94.0
  [#88](https://github.com/jasonrundell/dropship/pull/88)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump send and express [#90](https://github.com/jasonrundell/dropship/pull/90)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.3 to 4.5.5
  [#89](https://github.com/jasonrundell/dropship/pull/89)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.2.3 (Mon Jul 29 2024)

#### ⚠️ Pushed to `main`

- Updating packages ([@jasonrundell](https://github.com/jasonrundell))
- Make config more dry ([@jasonrundell](https://github.com/jasonrundell))
- Package updates for release fix
  ([@jasonrundell](https://github.com/jasonrundell))
- Fixing token name ([@jasonrundell](https://github.com/jasonrundell))
- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.2.3 (Fri Jul 26 2024)

#### ⚠️ Pushed to `main`

- Fixing token name ([@jasonrundell](https://github.com/jasonrundell))
- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.2.3 (Fri Jul 26 2024)

#### ⚠️ Pushed to `main`

- Fixing token name ([@jasonrundell](https://github.com/jasonrundell))
- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.2.3 (Fri Jul 26 2024)

#### ⚠️ Pushed to `main`

- Fixing token name ([@jasonrundell](https://github.com/jasonrundell))
- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.2.3 (Fri Jul 26 2024)

#### ⚠️ Pushed to `main`

- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.2.3 (Fri Jul 26 2024)

#### ⚠️ Pushed to `main`

- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.2.3 (Fri Jul 26 2024)

#### ⚠️ Pushed to `main`

- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.2.3 (Fri Jul 26 2024)

#### ⚠️ Pushed to `main`

- Merge branch 'main' of https://github.com/jasonrundell/dropship
  ([@jasonrundell](https://github.com/jasonrundell))
- Package updates ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump express from 4.18.2 to 4.19.2
  [#83](https://github.com/jasonrundell/dropship/pull/83)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.5.2 to 4.5.3
  [#84](https://github.com/jasonrundell/dropship/pull/84)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ejs from 3.1.9 to 3.1.10
  [#85](https://github.com/jasonrundell/dropship/pull/85)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump braces from 3.0.2 to 3.0.3
  [#87](https://github.com/jasonrundell/dropship/pull/87)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ws from 6.2.2 to 6.2.3
  [#86](https://github.com/jasonrundell/dropship/pull/86)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ip from 2.0.0 to 2.0.1
  [#82](https://github.com/jasonrundell/dropship/pull/82)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump vite from 4.4.9 to 4.5.2
  [#81](https://github.com/jasonrundell/dropship/pull/81)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump @adobe/css-tools from 4.3.1 to 4.3.2
  [#79](https://github.com/jasonrundell/dropship/pull/79)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.2.2 (Thu Oct 19 2023)

#### 🐛 Bug Fix

- Bump postcss from 8.4.30 to 8.4.31
  [#76](https://github.com/jasonrundell/dropship/pull/76)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v2.2.1 (Thu Oct 19 2023)

#### 🐛 Bug Fix

- Bump @babel/traverse from 7.23.0 to 7.23.2
  [#77](https://github.com/jasonrundell/dropship/pull/77)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v2.2.0 (Mon Oct 02 2023)

#### 🚀 Enhancement

- Cite and Blockquote added
  [#75](https://github.com/jasonrundell/dropship/pull/75)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.1.0 (Fri Sep 29 2023)

#### 🚀 Enhancement

- Issues/72 add components grid atom and footer a
  [#73](https://github.com/jasonrundell/dropship/pull/73)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.0.2 (Thu Sep 28 2023)

#### 🐛 Bug Fix

- Issues/64 upgrade to storybook 7.3.2
  [#71](https://github.com/jasonrundell/dropship/pull/71)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.0.1 (Wed Sep 27 2023)

#### 🐛 Bug Fix

- Issues/64 upgrade to storybook 7.3.2
  [#70](https://github.com/jasonrundell/dropship/pull/70)
  ([@jasonrundell](https://github.com/jasonrundell))

#### Authors: 1

- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))

---

# v2.0.0 (Wed Sep 27 2023)

#### 💥 Breaking Change

- Babel build added back in
  [#69](https://github.com/jasonrundell/dropship/pull/69)
  ([@jasonrundell](https://github.com/jasonrundell))
- Push correction [#68](https://github.com/jasonrundell/dropship/pull/68)
  ([@jasonrundell](https://github.com/jasonrundell))
- Issues/64 upgrade to storybook 7.3.2
  [#67](https://github.com/jasonrundell/dropship/pull/67)
  ([@jasonrundell](https://github.com/jasonrundell))

#### 🚀 Enhancement

- Issue/45 fix parcel build for emotion
  [#63](https://github.com/jasonrundell/dropship/pull/63)
  ([@jasonrundell](https://github.com/jasonrundell))
- Issue/45 fix parcel build for emotion
  [#62](https://github.com/jasonrundell/dropship/pull/62)
  ([@jasonrundell](https://github.com/jasonrundell))

#### 🔩 Dependency Updates

- Bump semver from 5.7.1 to 5.7.2
  [#60](https://github.com/jasonrundell/dropship/pull/60)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tough-cookie from 4.1.2 to 4.1.3
  [#59](https://github.com/jasonrundell/dropship/pull/59)
  ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jason Rundell ([@jasonrundell](https://github.com/jasonrundell))
