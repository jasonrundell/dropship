## New theme: <!-- name, e.g. "monolith" -->

<!-- One sentence: what's the character? "Neo-brutalist", "editorial print",
"instrumentation panel" — the same kind of line used for hangar, broadsheet,
arcade, and cascade. -->

### `$description`

<!-- Paste the `$description` you wrote at the top of
`src/tokens/<name>.tokens.json`. It needs at least two full sentences — the
design picker on the landing page derives its copy straight from this field,
and a test rejects a file without one. -->

### Screenshot

<!-- A screenshot of `npm run dev` with this theme selected (set it as the
active `data-theme`, or add it to `THEME_NAMES` locally and pick it from the
switcher). A token diff alone doesn't show whether the design actually hangs
together — this is a visual system, so show it. -->

### What makes it structurally distinct

<!-- Every shipped theme has to differ from *all three* of the others on
these axes, not only colour — tick the ones this theme changes, and see
`src/lib/theme-agnostic.test.ts` for the exact assertions. -->

- [ ] `radius.md` — corner rounding
- [ ] `borderWidth.thin` — border weight
- [ ] `shadow.md` — how elevation reads: soft blur, hard offset, or none
- [ ] `font.heading` (and `font.body` / `font.mono`) — typefaces no other
      shipped theme already uses in that role
- [ ] `letterSpacing.heading`
- [ ] `layout.cardAreas` / `layout.cardColumns` — where `Card`'s media, title,
      body, and actions sit relative to each other

## Checklist

- [ ] Copied an existing `src/tokens/<theme>.tokens.json` and changed the values
      (or wrote a new one) that satisfies the
      [`TokenShape`](../../src/lib/schema.ts) contract exactly — every key,
      nothing extra
- [ ] Added the new name to `THEME_NAMES` in `src/lib/schema.ts`
- [ ] `npm test` passes — this covers contract parity across all themes,
      structural distinctness, WCAG AA contrast on every colour pairing the
      components actually render, and an axe check on every story rendered under
      the new theme
- [ ] `npm run lint`, `npm run typecheck`, and `npm run test:coverage` pass
- [ ] A changeset is included (`npm run changeset`) — a new theme is a `minor`
      change
- [ ] An issue was opened first describing the design (see
      [CONTRIBUTING.md](../../CONTRIBUTING.md))

New to the token contract or the four-file component pattern? The full
walkthrough is in
[docs/HOW-TO.md § Adding a theme](../../docs/HOW-TO.md#part-6--adding-a-theme).
