---
'@jasonrundell/dropship': major
---

Remove `Button`'s `backgroundColor` prop.

It applied the value as an inline style, which is the one place a colour can
outrank the theme. A button given `backgroundColor="#6200ea"` kept that colour
through every design change, so the component looked re-themeable and was not —
exactly the failure `theme-agnostic.test.ts` exists to prevent everywhere else.

`primary` and `size` remain. Both select between values the active theme
supplies, which is the distinction that matters: a variant is a choice within
the system, a literal colour is an escape from it.

**Migration.** Restyle through the custom properties instead, which reach every
component rather than one button and survive a rebuild:

```css
[data-theme='mine'] {
  --dropship-color-primary: #0f766e;
  --dropship-color-onPrimary: #ffffff;
}
```

For a genuine one-off, the escape hatch is still there — it is just yours to
write, and it no longer sits in the public API advertising itself as the
supported route.
