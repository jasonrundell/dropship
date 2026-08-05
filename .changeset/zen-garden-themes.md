---
'@jasonrundell/dropship': major
---

Rebuild the token layer as a themeable contract, and ship four themes.

Dropship now works the way CSS Zen Garden did: **tokens drive form, components
drive function.** The same markup renders in deliberately unrelated ways
depending only on which theme is active.

**Four themes**

| Theme        | Character                                                                |
| ------------ | ------------------------------------------------------------------------ |
| `hangar`     | Default. Instrumentation: monospaced headings, sharp corners, hairlines  |
| `broadsheet` | Editorial print: serif, ink on paper, rules instead of boxes, no shadows |
| `arcade`     | Neo-brutalist: heavy outlines, hard offset shadows, saturated colour     |
| `cascade`    | Soft: generous rounding, blurred elevation, almost no visible borders    |

Switch with a single attribute — no rebuild, no JavaScript, and it cascades, so
a theme can be scoped to any subtree:

```html
<body data-theme="arcade">
  <aside data-theme="broadsheet">…this subtree only…</aside>
</body>
```

**A much larger token contract.** The previous set covered colours, sizes, and
font families. It now also covers `radius`, `borderWidth`, `borderStyle`,
`shadow`, `fontWeight`, `lineHeight`, `letterSpacing`, `duration`, and `easing`.
Those structural axes are what let themes look unrelated rather than merely
recoloured — a palette swap alone only ever produces the same design in
different colours.

**Breaking changes**

- Token custom properties have been renamed and restructured.
  `--dropship-size-*` and `--dropship-padding-*` are replaced by
  `--dropship-space-*`; `--dropship-heading-*` is replaced by
  `--dropship-fontSize-*`. Anything overriding the old names needs updating.
- The `Tokens` default export and `fontFamilyToCss` are no longer exported from
  the package. Token access is via CSS custom properties, or `vars` from the
  theme module.
- `src/lib/common.tokens.json` is replaced by per-theme documents under
  `src/tokens/`.

**Other changes**

- `Row` gains a `gap` prop; `Grid`'s `columnGap` and `rowGap` now fall back to
  the theme's space scale instead of collapsing to zero.
- Components gained real focus-visible rings, transitions, and disabled styling,
  all token-driven.
- Headings no longer overflow narrow containers.
