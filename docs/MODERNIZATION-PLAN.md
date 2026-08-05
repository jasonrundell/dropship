# Dropship Modernization Plan

_Audit date: 2026-08-05 · Covers `jasonrundell/dropship` and
`jasonrundell/dropship-components`_

---

## 1. Where things stand today

### 1.1 `dropship` — `@jasonrundell/dropship`

A React component library (9 atoms) built with Vite in library mode, styled with
Pigment CSS, documented in Storybook, released with `auto`.

**Verified by running the toolchain locally on `main` (Node 22, `npm ci`):**

| Check                | Result                                                             |
| -------------------- | ------------------------------------------------------------------ |
| `npm run build`      | ✅ passes (28 modules, ES + CJS + `.d.ts` + `style.css`)           |
| `npm test`           | ✅ 59 tests pass — but **all 59 are token tests**                  |
| `npm run lint`       | ❌ **crashes before linting a single file**                        |
| CI — Release         | ❌ failing on every run since at least 2025-12                     |
| CI — Chromatic       | ❌ failing on every run since at least 2026-04                     |
| `npm audit`          | ⚠️ 8 advisories — 3 critical, 3 high                                |

**The three things that are actually broken right now:**

1. **Lint is dead.** `eslint@9.39.2` resolved against `typescript-eslint@8`
   throws on rule load:
   `TypeError: Error while loading rule '@typescript-eslint/no-unused-expressions': Cannot read properties of undefined (reading 'allowShortCircuit')`.
   It never lints anything — so nothing has been lint-checked for months.

2. **Releases are not reaching npm.** GitHub has a `v3.4.0` tag and release
   (2026-02-26) and `package.json` says `3.4.0`, but **npm's latest is `3.3.1`
   from 2025-01-24**. Every `Release` workflow run for the last ~8 months
   concluded `failure`. The workflow itself is the likely culprit — it still
   uses `actions/checkout@v2`, `actions/setup-node@v1`, and pins Node
   `18.17.0` (EOL). Anyone doing `npm i @jasonrundell/dropship` today gets
   code from January 2025, including the pre-DTCG token API.

3. **Chromatic is red on every run**, so there is no visual-regression safety
   net, and 7 open Dependabot PRs are stalled behind red CI.

**Version drift** (repo → current):

| Package                  | Repo     | Latest   | Gap        |
| ------------------------ | -------- | -------- | ---------- |
| React / React DOM        | 18.3.1   | 19.2.8   | 1 major    |
| Vite                     | 5.4.x    | 8.2.0    | 3 majors   |
| Storybook                | 8.4.x    | 10.5.6   | 2 majors   |
| TypeScript               | 5.6      | 7.0.2    | 2 majors   |
| ESLint                   | 9.x      | 10.8.0   | 1 major    |
| `@vitejs/plugin-react`   | 4.3.x    | 6.0.5    | 2 majors   |
| Vitest                   | 4.0.18   | 4.1.10   | current ✅ |
| `@pigment-css/react`     | 0.0.29   | 0.0.31   | pre-1.0 ⚠️ |

**Security.** 3 critical advisories, all reachable from direct dependencies:

- `@pigment-css/react` → `@wyw-in-js/transform` → `happy-dom` — **VM context
  escape leading to RCE**. This is a build-time dependency of the styling
  engine, so it runs on every dev/CI build.
- `@pigment-css/vite-plugin` — same chain.
- `vitest` — arbitrary file read/execute when the Vitest UI server is
  listening.

Plus high-severity `vite`, `lodash`, `minimatch`, `picomatch`, `postcss`,
`js-yaml`, `flatted`, `fast-uri`, `brace-expansion`, `ws`.

**Code and packaging issues found by reading the source:**

- **`yaml` is a runtime `dependency`** (`package.json:39`) but is imported
  nowhere in `src/`. It was added as a transitive-resolution workaround and now
  ships to every consumer for nothing — and it carries its own advisory.
- **`vite.config.ts` mixes JSX transforms.** `tsconfig` sets
  `"jsx": "react-jsx"` (automatic runtime), but `vite.config.ts:19-23` sets
  `esbuild.jsxInject`, `jsxFactory`, and `jsxFragment` to the classic runtime.
  The inject forces `import React from 'react'` into every module, which is
  what pushes the CJS bundle to 17 KB and blocks a clean React 19 story.
- **The `exports` map is malformed.** In `package.json:13-21`, `"types"` is
  listed _after_ `"import"`/`"require"`. Condition order is significant —
  `"types"` must come first or TypeScript's `bundler`/`node16` resolution can
  miss it. `"style"` is also not a resolvable condition where it sits.
- **Library source lives in `src/stories/`.** `src/index.ts` exports from
  `./stories/atoms/...`. The Storybook demo folder is doubling as the public
  API surface, which makes it easy to accidentally ship a story asset.
- **No component tests at all.** `vitest.config.ts` sets
  `environment: 'node'` with no jsdom and no Testing Library. 9 components,
  0 render tests. The 59 passing tests all cover `src/lib/tokens.ts`.
- **Storybook config targets a dead API surface.** `addon-essentials`,
  `addon-interactions`, and `addon-onboarding` were absorbed or removed in
  Storybook 9/10 (`@storybook/addon-essentials` latest is `8.6.14`), and
  `features.experimentalRSC` no longer exists.
- **No `LICENSE` file**, though `README.md` says "See the LICENSE file for
  details" and `package.json` declares MIT.
- **No `.github/dependabot.yml`** — only GitHub's default security updates
  are running, which is why the open PRs are all advisory bumps.
- **No `engines`, no `sideEffects`, no `peerDependencies`.** React and
  `@pigment-css/react` are `externals` in the Rollup config but listed as
  regular `dependencies`, so consumers can silently end up with two Reacts.
- **No `.nvmrc` / Node version pin**, and CI Node versions disagree across
  workflows (20 in build/chromatic, 18.17.0 in release).

### 1.2 `dropship-components`

Effectively abandoned. Last commit **2023-03-02**; the code itself is 2018-era.

- **React 16.5**, **Enzyme 3 + `enzyme-adapter-react-16`** (no adapter has ever
  existed for React 17+ — this test suite cannot be carried forward as-is),
  **Jest 23**, **Parcel 1** (EOL), **Babel 6** presets (`babel-preset-env`,
  `babel-preset-react` — both superseded by `@babel/*` scoped packages years
  ago).
- CI is **Travis**, targeting **Node 7**.
- **Never published to npm** — `npm view dropship-components` returns 404. It
  has no consumers.
- `dist/` is committed to the repository.
- Contains 21 unstyled semantic wrappers: `Abbr`, `Address`, `Article`,
  `Aside`, `Button`, `Code`, `Div`, `Footer`, `Form`, `Heading`, `Hgroup`,
  `Image`, `InputSubmit`, `InputText`, `Label`, `Link`, `Nav`, `OrderedList`,
  `Paragraph`, `Section`, `UnorderedList`. Most are one-line
  `props → element` passthroughs.

**Recommendation: archive it.** Modernizing it would mean replacing every
single tool in the stack for a package nobody installs, and `dropship` already
supersedes its `Button`, `Heading`, and `Link`. The one thing worth salvaging
is the _idea list_ — several of those semantic elements are reasonable
candidates for new `dropship` atoms (see Phase 5).

---

## 2. Guiding principles

1. **Get to green before getting to new.** A repo where lint crashes and
   releases silently fail can't absorb a React 19 + Vite 8 + Storybook 10 jump
   safely. Fix the pipeline first, then upgrade under it.
2. **One concern per PR.** Each phase below is a reviewable PR that leaves
   `main` releasable.
3. **Every upgrade lands with a test that would have caught its regression.**
4. **Don't grow the API surface until the foundation is solid.** New components
   come last.

---

## 3. The plan

### Phase 0 — Unbreak the pipeline (highest priority, no version bumps)

Goal: `lint`, `test`, `build`, and `release` all pass on `main`.

- Align `eslint` / `typescript-eslint` to a compatible pair and confirm
  `npm run lint` actually reports on files. Add `--max-warnings=0`.
- Repair the `Release` workflow: `actions/checkout@v4`,
  `actions/setup-node@v4`, drop the Node 18.17.0 pin, `npm ci` instead of
  `npm install -g @storybook/cli && npm install`. Diagnose the underlying
  publish failure and get `3.4.0` (or `3.4.1`) onto npm.
- Repair or temporarily disable the Chromatic workflow so PR CI is meaningful.
- Add a single `ci.yml` that runs lint + test + build on PRs, replacing the
  build-only workflow.
- Add `.nvmrc` and `"engines": { "node": ">=22" }`; use one Node version
  everywhere.
- Add `.github/dependabot.yml` (npm + github-actions ecosystems, weekly,
  grouped minor/patch) so bumps arrive in batches instead of one PR per CVE.

**Exit criteria:** green CI on a PR, and `npm view @jasonrundell/dropship
version` matches `package.json`.

### Phase 1 — Packaging correctness (no behaviour change)

- Fix the `exports` map: `"types"` first, add a proper `"./style.css"` entry,
  keep `main`/`module`/`types` as legacy fallbacks.
- Move `react`, `react-dom`, and the styling runtime from `dependencies` to
  `peerDependencies` (with `peerDependenciesMeta` where optional), matching the
  Rollup `external` list.
- **Remove the unused `yaml` runtime dependency.**
- Add `"sideEffects": ["*.css"]` so bundlers can tree-shake the JS.
- Remove the conflicting `esbuild.jsxInject` / `jsxFactory` / `jsxFragment`
  block so the automatic JSX runtime is used consistently. Expect the bundle to
  shrink.
- Add a `publint` + `@arethetypeswrong/cli` check to CI to keep this honest.

**Exit criteria:** `publint` clean; a scratch Vite app and a scratch Next.js app
both consume the tarball (`npm pack`) without warnings.

### Phase 2 — Test infrastructure

This is the prerequisite for every upgrade after it. Without render tests, a
React 19 or Storybook 10 migration is unverifiable.

- Switch `vitest.config.ts` to `environment: 'jsdom'`, add
  `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`.
- Write render + prop + a11y-role tests for all 9 atoms. Target meaningful
  coverage of the public API, not a percentage.
- Add `vitest --coverage` with a threshold gate in CI.
- Add `axe-core`/`vitest-axe` assertions to each atom's test — the library's
  pitch is "consistent and maintainable UI", and accessibility should be part
  of that contract.

**Exit criteria:** every exported component has a test; coverage gate enforced
in CI.

### Phase 3 — Framework upgrades (sequential, one PR each)

Order matters; each step is independently revertable.

1. **TypeScript 5.6 → 5.9**, then evaluate **7.x** separately. TS 7 is the
   native/Go compiler rewrite — worth adopting, but not in the same PR as a
   React major. Turn on `verbatimModuleSyntax` and `erasableSyntaxOnly`.
2. **Vite 5 → 6 → 7 → 8** and `@vitejs/plugin-react` 4 → 6. Vite 6+ ships the
   Environment API and drops the deprecated CJS Node API the current build
   warns about.
3. **React 18 → 19** and `@types/react` 19. Peer range becomes `>=18 <20` or
   `^19` depending on your answer to Q3 below. Check `React.ReactNode` typing
   changes and the `ref`-as-prop change in each atom.
4. **Storybook 8 → 9 → 10.** Migrate off `addon-essentials`/`addon-interactions`
   /`addon-onboarding`, drop `features.experimentalRSC`, adopt the Vitest-based
   test addon (which replaces the old interaction-test runner and can share the
   Phase 2 test setup).
5. **ESLint 9 → 10**, `typescript-eslint` 8 → latest, add
   `eslint-plugin-jsx-a11y` and `eslint-plugin-react-compiler`.

**Exit criteria:** all green, Chromatic shows no unintended visual diffs, and
the packed tarball still works in the scratch consumer apps.

### Phase 4 — Styling engine decision ⚠️ **needs your call — see Q2**

`@pigment-css/react` is still `0.0.31` after two years and is the source of two
of the three critical advisories. This is the single biggest architectural risk
in the repo. Options are laid out in the questions section; the work is roughly
"rewrite 9 `styled()` calls plus the token bridge," which is a contained,
mechanical change either way — but it's a decision, not a default.

### Phase 5 — Consolidation and growth

- **Archive `dropship-components`** on GitHub (read-only, with a README banner
  pointing at `dropship`).
- Optionally port the genuinely useful semantic atoms from it into `dropship`
  with real styling, tokens, tests, and stories. Best candidates:
  `Paragraph`, `Image`, `Code`, `Blockquote` (already exists), `Label`,
  `InputText`, `Form`, `Nav`, `List`.
- Fill out the atomic-design story the README promises: with atoms solid,
  add the first molecules (`Card`, `Field`, `ButtonGroup`).
- Add dark mode via token-level CSS custom properties.

### Phase 6 — Repo hygiene

- Add the missing `LICENSE` (MIT) file the README already references.
- Add `CONTRIBUTING.md`, issue/PR templates, `CODEOWNERS`.
- Rewrite `README.md` with a real quickstart, per-component prop tables, and
  a token-usage section (the v3.4.0 DTCG breaking change is currently only
  documented in a GitHub release body).
- Move library source out of `src/stories/` into `src/components/`, leaving
  `*.stories.tsx` alongside. Re-point `src/index.ts`.
- Enable npm **provenance** / OIDC trusted publishing in the release workflow.
- Consider migrating `auto` → **Changesets** (`auto` itself carries 4 open
  advisories via `@octokit/*` and is a heavy dependency for a single-package
  repo).

---

## 4. Suggested sequencing

| PR  | Phase | Content                                   | Risk   |
| --- | ----- | ----------------------------------------- | ------ |
| 1   | 0     | Fix lint, CI workflows, Node pin, Dependabot | Low    |
| 2   | 0     | Fix release → publish 3.4.x to npm        | Low    |
| 3   | 1     | Packaging: exports, peers, drop `yaml`, JSX | Medium |
| 4   | 2     | jsdom + RTL + tests for 9 atoms + coverage | Low    |
| 5   | 3.1   | TypeScript 5.9                            | Low    |
| 6   | 3.2   | Vite 6 → 8                                | Medium |
| 7   | 3.3   | React 19                                  | Medium |
| 8   | 3.4   | Storybook 10                              | Medium |
| 9   | 3.5   | ESLint 10 + a11y plugins                  | Low    |
| 10  | 4     | Styling engine (pending decision)         | High   |
| 11  | 5     | Archive `dropship-components`             | Low    |
| 12  | 6     | LICENSE, README, docs, repo layout        | Low    |

Phases 0–2 are the ones that actually matter for reliability. Everything from
Phase 3 on is safe to do incrementally once they're done.

---

## 5. Open questions

See the questions raised alongside this document. Phase 4 in particular cannot
start without a decision on the styling engine.
