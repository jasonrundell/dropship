---
'@jasonrundell/topiary': major
---

Rename Dropship to Topiary.

The old name said nothing true about the library; the new one is the thesis in a
word. Topiary is one living structure clipped into unrelated shapes — which is
exactly what the library does: the same markup renders as four deliberately
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

- The CSS custom property prefix — the public theming API — is now `--topiary-*`
  instead of `--dropship-*`. Every property keeps its name after the prefix, so
  the migration is a find-and-replace:

  ```diff
  [data-theme='mine'] {
  -  --dropship-color-primary: #0f766e;
  +  --topiary-color-primary: #0f766e;
  }
  ```

Theme names (`hangar`, `broadsheet`, `arcade`, `cascade`), component names,
props, and `data-theme`/`data-part` attributes are all unchanged.
