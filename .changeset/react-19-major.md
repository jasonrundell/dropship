---
'@jasonrundell/topiary': major
---

Require React 19, replace Pigment CSS with vanilla-extract, and fix package
resolution.

**Breaking changes**

- `react` and `react-dom` peer dependencies are now `^19.0.0`. Projects on React
  18 should stay on the 3.x line.
- `@pigment-css/react` is no longer required alongside this package. Topiary now
  has no runtime dependencies at all — remove it from your dependencies if you
  installed it only for Topiary.

**Fixes**

- The CommonJS entry point was a `.js` file inside a `"type": "module"` package,
  so Node parsed it as ESM. It is now `dist/index.cjs`, and
  `require('@jasonrundell/topiary')` works.
- The `types` export condition was ordered last and resolved as ESM types under
  `require`, so types only worked via dynamic import. Type conditions are now
  split per entry, with `dist/index.d.cts` emitted for CommonJS.
- `yaml` was a runtime dependency that no source file imported. Removed.
- Storybook demo assets from `public/` were being copied into the published
  package. They no longer are.

**Improvements**

- Design tokens now compile to CSS custom properties with stable names
  (`--topiary-color-primary`, `--topiary-size-large`, and so on). Overriding one
  in your own stylesheet restyles every component that uses it, with no rebuild.
  See the README for the naming scheme.
- The ES bundle is 6.7 kB, down from 26.5 kB.
