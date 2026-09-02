---
'@jasonrundell/topiary': minor
---

Close the component-contract gaps an external audit found while evaluating a
migration onto Topiary (`jasonrundell/react-mega-menu`, Phase 0 of
`docs/refactor/topiary-migration.md` in that repo). Seven fixes, all additive or
corrective:

- **className/style now merge instead of replacing.** Every exported component
  built its own class (Row, Grid, and Blockquote also an inline `style`) and
  then spread `...props` after it, so a caller's own `className`/`style`
  silently discarded the component's built-in styling instead of appending to
  it. `src/lib/mergeProps.ts` is the one place this is now implemented, used by
  every component that spreads props.
- **A `zIndex` token category** (`base`/`overlay`/`nav`/`modal`) for stacking a
  fixed nav bar and its dropdown above page content.
- **`color.surfaceAlt`**, a hover/alt-surface colour token, wired into `Link`'s
  and the secondary `Button` variant's `:hover` state.
- **A real contrast floor on the border/surface pair** (WCAG 1.4.11's 3:1, up
  from a `minRatio` of 1 that let any two distinct colours pass). `hangar`'s and
  `cascade`'s `color.border` are darkened just enough to clear it; `broadsheet`
  and `arcade` were already well clear.
- **`media`, `THEME_NAMES`, `DEFAULT_THEME`, and the `ThemeName` type** are now
  exported from the package's public entry, so a consumer can align its own
  build-time responsive styles or theme switcher with Topiary's without guessing
  at values only visible as compiled CSS custom properties.
- **Component prop types extend the matching `React.ComponentPropsWithRef`.**
  `id`, `className`, `aria-*`, `data-*`, and `ref` already forwarded to the
  underlying DOM element at runtime; the types now say so, for every component
  that spreads props (not just `Link`/`Heading`/`Button`).
- **An optional `children` slot on `Link` and `Button`**, alongside the existing
  `label`. `label` always renders first; `children`, when given, follows it in
  the same element — for a trailing icon or anything else a single string can't
  express.
