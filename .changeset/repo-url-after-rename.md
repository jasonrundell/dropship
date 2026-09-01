---
'@jasonrundell/topiary': patch
---

Point `package.json`'s repository, bugs, and homepage fields at
`jasonrundell/topiary` instead of the pre-rename `jasonrundell/dropship`.

The GitHub repository itself was renamed after the rebrand landed, but this
metadata — along with a handful of links in the landing page, Storybook, and
issue templates that pointed at the old Storybook deployment URL — was left
pointing at the old name. GitHub redirects the old URLs, so nothing was
broken, but the published package should point at its actual home.
