# Dropship Modernization Plan

_Audit and Phases 0–3 executed 2026-08-05 · Covers `jasonrundell/dropship` and
`jasonrundell/dropship-components`_

---

## 1. Status

**Phases 0 through 3 are complete**, on branch
`claude/dropship-modernization-plan-inl5by`. The styling migration was pulled
forward from Phase 4 because everything else was blocked behind it.

Remaining: Phase 5 (`dropship-components`), Phase 6 (repo hygiene and release
tooling), Phase 7 (growth).

### What shipped

| Area                  | Before                  | After                                    |
| --------------------- | ----------------------- | ---------------------------------------- |
| `npm run lint`        | crashed on rule load    | passes, 32 files                         |
| Release workflow      | failing since ~2025-12  | rewritten, npm provenance                |
| Chromatic             | red on 18 straight runs | Dependabot/fork runs skipped             |
| Component tests       | 0                       | 135 tests across all 9 atoms, plus axe   |
| Coverage              | not measured            | 100% statements/branches/functions/lines |
| Production advisories | 8 (3 critical, 3 high)  | **0**                                    |
| Runtime dependencies  | 4                       | **0**                                    |
| ES bundle             | 26.5 kB                 | **6.7 kB**                               |
| Styling               | Pigment CSS 0.0.29      | vanilla-extract 1.21                     |
| React                 | 18.3                    | 19.2 (peer `^19`)                        |
| Vite                  | 5.4                     | 8.2                                      |
| Storybook             | 8.4                     | 10.5                                     |
| TypeScript            | 5.6                     | 6.0                                      |
| ESLint                | 9 (crashing)            | 10.8 + React Compiler rules              |

Every commit was verified with lint, typecheck, the full test suite, a
production build, `publint`, `attw`, a Storybook build, and — for the packaging
and framework changes — by packing the tarball and rendering all nine components
through `renderToStaticMarkup` in a scratch consumer project.

### Three findings that changed the plan

**1. Releases were never reaching npm.** GitHub had a `v3.4.0` tag and release
from 2026-02-26 and `package.json` said `3.4.0`, but npm's latest was `3.3.1`
from 2025-01-24. Every `Release` run had failed for roughly eight months — the
workflow still used `actions/checkout@v2`, `actions/setup-node@v1`, and a pin to
EOL Node 18.17.0. Anyone running `npm i @jasonrundell/dropship` was getting
January 2025 code, including the pre-DTCG token API.

**2. Chromatic was not broken — Dependabot was.** All 18 failures were on
`dependabot/*` branches; `main` was 6 for 6. Dependabot PRs cannot read
repository secrets, so `CHROMATIC_PROJECT_TOKEN` resolved to an empty string.
Those runs are now skipped rather than reported as failures nobody could fix.

**3. Pigment CSS had to go before anything else could move.** It accounted for
two of the three critical advisories (via `@wyw-in-js/transform` → `happy-dom`),
its Vite plugin peer-capped at Vite 6 which blocked Vite 7 and 8, upgrading it
to 0.0.31 silently dropped most of the library's extracted CSS (2257 bytes
across 4 rules down to 379 bytes across 2), and its Vite plugin broke v8
coverage instrumentation so components silently vanished from the report. It was
pinned to 0.0.29 and then removed.

That produced a strict ordering — **styling → Storybook → Vite** — since
Storybook 8 also peer-caps at Vite 6, so Storybook 10 had to land before Vite 8,
which was itself only reachable once Pigment was gone.

### Notable outcomes

- **Design tokens are now overridable.** They compile to CSS custom properties
  with stable, readable names (`--dropship-color-primary`) rather than
  build-hashed ones. Setting one in a consumer stylesheet restyles every
  component that uses it, with no rebuild — and gives dark mode somewhere to
  attach. `common.tokens.json` remains the single source of truth.
- **The package has no runtime dependencies.** The built bundle imports only
  `react` and `react/jsx-runtime`; vanilla-extract's runtime helpers are small
  enough to inline. Consumers no longer install a styling peer at all — a
  scratch install pulls 4 packages, down from 136.
- **Packaging is now verified.** `publint` and `attw` gate CI and caught two
  real defects: the CJS entry was a `.js` file inside a `"type": "module"`
  package (so Node parsed it as ESM), and the `types` condition was ordered last
  (so types only resolved via dynamic import).
- **Coverage went 79.5% → 100%** as a side effect of the styling migration. The
  gap had been Pigment's callback props, which only the build-time transform
  could invoke and no test could reach.

---

## 2. Remaining work

### Phase 5 — `dropship-components`

Per your decision this becomes a separate library of unstyled semantic
primitives rather than being archived. Not started. Scope:

- Replace the entire toolchain: React 16 → 19, Enzyme → Testing Library, Jest 23
  → Vitest, Parcel 1 → Vite, Babel 6 presets → none, Travis (Node 7) → GitHub
  Actions.
- **All 21 test files need rewriting.** The suite is built on
  `enzyme-adapter-react-16`, and no Enzyme adapter has ever existed for React 17
  or later, so none of it can be carried forward as-is.
- Decide the published package name and publish to npm for the first time (it
  has never been published — `npm view dropship-components` returns 404).
- Stop committing `dist/` to the repository.
- Draw a clear boundary against `dropship`. `Button`, `Heading`, and `Link`
  currently exist in both, and the two libraries need a stated division of
  responsibility before both are on npm.

### Phase 6 — Repo hygiene and release tooling

- **Migrate `auto` → Changesets.** All 22 remaining advisories are dev-only and
  rooted in `auto` (via `@octokit/*`) and `yaml`. `auto` is also heavy for a
  single-package repo.
- **Publish the pending release.** `package.json` is at 3.4.0 while npm is still
  on 3.3.1. The React 19 peer requirement makes the next release a **4.0.0
  major**.
- Move library source out of `src/stories/` into `src/components/`. The
  Storybook demo folder is currently doubling as the public API surface, which
  makes it easy to ship a story asset by accident.
- Add `CONTRIBUTING.md`, issue and PR templates, and `CODEOWNERS`.

### Phase 7 — Growth

- **Dark mode**, now that tokens are CSS custom properties — the mechanism is
  already in place.
- **First molecules**: `Card`, `Field`, `ButtonGroup`.
- **Port semantic atoms** worth keeping from `dropship-components`: `Paragraph`,
  `Image`, `Code`, `Label`, `InputText`, `Form`, `Nav`, lists.
- **Add `eslint-plugin-jsx-a11y`** once it supports ESLint 10. Its latest
  release (6.10.2) is from October 2024 and caps at ESLint 9; forcing the pair
  is what left lint crashing for months. Accessibility is covered meanwhile by
  axe assertions in every component test and by `@storybook/addon-a11y`.

---

## 3. Repository state as found (2026-08-05)

Kept for reference — this is what the audit turned up before any changes.

### 3.1 `dropship` — `@jasonrundell/dropship` 3.4.0

Verified by running the toolchain on `main` (Node 22, `npm ci`):

| Check           | Result                                            |
| --------------- | ------------------------------------------------- |
| `npm run build` | ✅ passed                                         |
| `npm test`      | ✅ 59 tests — but all 59 covered `src/lib/tokens` |
| `npm run lint`  | ❌ crashed before linting a single file           |
| CI — Release    | ❌ failing every run since at least 2025-12       |
| CI — Chromatic  | ❌ failing on every `dependabot/*` run            |
| `npm audit`     | ⚠️ 8 production advisories — 3 critical, 3 high   |

Code and packaging issues found by reading the source:

- `yaml` was a runtime `dependency` but imported nowhere in `src/`.
- `vite.config.ts` set `esbuild.jsxInject`/`jsxFactory`/`jsxFragment` (classic
  runtime) while `tsconfig` set `"jsx": "react-jsx"` (automatic runtime).
- The `exports` map listed `"types"` last and pointed `require` at a `.js` file
  in a `"type": "module"` package.
- Library source lived in `src/stories/`; `src/index.ts` exported from
  `./stories/atoms/...`.
- `vitest.config.ts` used `environment: 'node'` with no jsdom and no Testing
  Library — a component test could not have been written.
- Six components typed `children` as `React.ReactNode` without importing React,
  relying on the deprecated UMD global, which leaked into `dist/index.d.ts`.
- Storybook config targeted `addon-essentials`, `addon-interactions`,
  `addon-onboarding`, and `features.experimentalRSC`, all removed in 9/10.
- `eslint.config.js` ignored only `dist`, so build outputs got linted.
- The Storybook ESLint plugin was configured in a legacy `eslintConfig` block in
  `package.json` that flat config never reads, so its rules never ran.
- No `LICENSE` file, though `README.md` referenced one.
- No `.github/dependabot.yml`, no `engines`, no `sideEffects`, no
  `peerDependencies`, no Node version pin, and CI Node versions disagreed across
  workflows (20 in build/chromatic, 18.17.0 in release).

### 3.2 `dropship-components`

Effectively abandoned. Last commit 2023-03-02; the code is 2018-era.

- React 16.5, Enzyme 3 + `enzyme-adapter-react-16`, Jest 23, Parcel 1 (EOL),
  Babel 6 presets. CI is Travis, targeting Node 7.
- Never published to npm.
- `dist/` committed to the repository.
- 21 unstyled semantic wrappers, most of them one-line `props → element`
  passthroughs: `Abbr`, `Address`, `Article`, `Aside`, `Button`, `Code`, `Div`,
  `Footer`, `Form`, `Heading`, `Hgroup`, `Image`, `InputSubmit`, `InputText`,
  `Label`, `Link`, `Nav`, `OrderedList`, `Paragraph`, `Section`,
  `UnorderedList`.

---

## 4. Guiding principles used

1. **Get to green before getting to new.** A repo where lint crashes and
   releases silently fail cannot absorb a React 19 + Vite 8 + Storybook 10 jump
   safely. The pipeline was fixed first, then upgraded under.
2. **One concern per commit**, each leaving `main` releasable.
3. **Every upgrade lands with a test that would have caught its regression.**
   The 132 pre-existing tests passing unmodified is what demonstrates the
   styling migration preserved behaviour.
4. **Verify against the published artifact, not just the source tree.** Several
   defects were only visible from a packed tarball consumed by another project.
