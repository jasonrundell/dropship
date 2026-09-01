# Topiary: a design system that compiles

_Direction set 2026-08-05. Supersedes the framing in
[MODERNIZATION-PLAN.md](./MODERNIZATION-PLAN.md), which covers the tooling work
that got the repo to a state where this is buildable._

---

## The problem with what exists

Topiary has been maintained for seven years and has never had a thesis.
"Reusable UI components for your projects" is what every component library says.
Nine generic atoms competing against shadcn, Radix, and MUI is a position that
cannot be won and is not interesting to work on.

Two facts point somewhere better.

**The token pipeline is the only non-commodity asset here.**
`common.tokens.json` implements DTCG Format Module 2025.10 — a specification
almost nobody has implemented. Style Dictionary is the incumbent transformer and
is both heavyweight and behind the spec. Open Props earned thousands of stars
doing nothing but shipping design tokens as CSS custom properties. Topiary
already built the rare half of that and then buried it under a Button.

**Zero users is an asset, not a problem.** Two stars, no downloads that matter,
and every open issue is Dependabot. Nothing here can break for anyone. The 4.0.0
major is already staged. This is the moment to be opinionated.

## The thesis

> **Topiary is not a component library. It is a compiler that turns one token
> file into an entire design system.**

One manifest is the source of truth. Everything else is generated and never
written twice:

| Output           | What it is                                       |
| ---------------- | ------------------------------------------------ |
| CSS custom props | The runtime theme, overridable without a rebuild |
| TypeScript       | Typed token constants and unions                 |
| Tailwind theme   | A `@theme` block for Tailwind v4 consumers       |
| Figma variables  | Design-tool sync                                 |
| Lint rules       | Enforcement of the system in consuming code      |
| Agent manifest   | Machine-readable API for AI coding tools         |
| Documentation    | The token reference and component API            |

Components exist to prove the compiler works. They are the demo, not the
product.

The name already carries the metaphor: topiary is one living structure clipped
into unrelated shapes. The markup is the plant; the token file is the
**clipping** — change nothing but the shears and the same growth reads as a
peacock, a spiral, or a hedge.

## Why all of it, and in this order

The three directions considered — token compiler, visual identity, agent-native
— are not competing bets. The compiler is the engine, the visual identity is
what the engine outputs, and the agent manifest is one more compile target from
the same source. They collapse into one system.

The sequence matters more than the scope:

1. **Identity first.** Every demo of everything else is a screenshot of the
   theme. A live theme editor retinting default Material purple is not
   impressive; the same editor retinting something with a point of view is the
   entire pitch. The theme is load-bearing infrastructure, not decoration.
2. **Compiler second.** With a real theme to compile, the outputs are worth
   looking at.
3. **The live surface third.** This is the portfolio piece.
4. **Enforcement fourth.** The first thing that is useful to people who never
   install a single component.
5. **Agent-native last.** Not weak — unscreenshottable. It is the closer.

**The rule that keeps this from becoming three half-built things: every phase
must ship something demonstrable on its own.** If a phase cannot be shown, it is
scoped wrong.

---

## Phase A — Give it a face

The current palette is Material's default purple and teal. The system has no
visual personality, and no amount of pipeline sophistication compensates for a
design system nobody wants to look at.

The token set is also thinner than the thesis requires. Today it covers colours,
sizes, and font families. It has **no radii, no shadows, no motion, no z-index,
no borders, and no opacity scale**. A system whose pitch is "token-native" needs
those before the compiler has anything interesting to compile.

- Design a real palette with a stated point of view, plus a dark theme built as
  a second token set rather than an afterthought.
- Add the missing token categories: `radius`, `shadow`, `motion` (duration and
  easing), `border`, `zIndex`, `opacity`.
- Replace the ad-hoc `sizes` grouping with a proper type scale and space scale.
- Restyle the nine atoms so they demonstrate the system instead of merely
  existing.

**Ships:** a design system that looks like something. Screenshot-ready.

## Phase B — The compiler

Replace the hand-written `tokens.css.ts` bridge with a real transformer.

- `@topiary/compiler`: reads the manifest, emits targets through a plugin
  interface so new targets are additive.
- Launch targets: CSS custom properties, TypeScript constants and types,
  Tailwind v4 `@theme`, a normalised JSON manifest, and Figma variables.
- **Contrast validation as a build step.** Every foreground/background token
  pairing is checked against WCAG AA, and a theme that fails does not compile.
  This is the feature that makes the whole thing more than a formatter, and it
  pays off visibly in Phase C.
- Reference resolution, so tokens can be defined in terms of other tokens
  (`color.link` → `{color.primary}`), which the DTCG spec supports and the
  current flat file does not use.

**Ships:** `topiary build` turning one file into five artifacts, and refusing to
emit an inaccessible theme.

## Phase C — The live surface

This is the portfolio piece. **Storybook is a dev tool, not a portfolio** —
every design system has one, and nobody is impressed by another. Keep it for
development and build the demo site as the actual deliverable.

A site where a visitor can:

- Drag colour, spacing, radius, and type controls and watch every component
  retint live.
- See the generated CSS, Tailwind theme, and TypeScript update in a code panel
  as they do it.
- Get a **live contrast warning** the moment a choice fails WCAG AA — the Phase
  B validator, running in the browser.
- Download the result as a working theme file.

**Ships:** one URL that explains the entire project without a word of prose.

## Phase D — Enforcement

The first output that is useful to people who never install a component.

- `npx topiary doctor` — point it at any codebase and it reports hard-coded
  values that should be tokens: a `#6200ea` that is really
  `--topiary-color-primary`, a `padding: 17px` that is off-scale. With `--fix`.
- An ESLint plugin **generated from the manifest**, so the rules cannot drift
  from the tokens.

**Ships:** a standalone tool with a reason to exist independent of Topiary's
components. This is how a project with two stars finds its first real users.

## Phase E — Agent-native

The manifest is already machine-readable. Expose it.

- An MCP server: query available tokens, component APIs, and whether a given
  snippet violates the system.
- A generated `AGENTS.md` so agents without MCP still get the rules.
- Dogfood it — this repo is developed with an agent, so the feedback loop is
  immediate.

**Ships:** a recorded demo of an agent writing correct Topiary code, and being
corrected when it does not.

## Phase F — Consolidation

A compiler, a CLI, an ESLint plugin, an MCP server, components, and primitives
are six packages. They belong in one monorepo with one release pipeline;
Changesets already handles this.

This also resolves the duplication left over from the primitives rebuild:
`Button`, `Heading`, and `Link` currently exist in both libraries. In the new
architecture the relationship is clean — **primitives are the unstyled markup
layer, Topiary's components are primitives plus compiled tokens.** Topiary
builds on primitives rather than duplicating them.

---

## What this is not

- Not an attempt to match shadcn's component count. The component set stays
  small on purpose.
- Not a design language like Material. The point is that the look is swappable;
  the shipped theme is a demonstration, not a mandate.
- Not a framework. Every output is a plain artifact — CSS, JSON, TypeScript —
  that works without adopting Topiary wholesale.

## Open question

**The aesthetic direction is the one call that cannot be delegated**, because
every later phase is built on top of it.

The name suggests something industrial: drop pods, cargo manifests, aerospace
instrumentation. A high-contrast, tightly gridded, monospace-accented technical
aesthetic would fit the name, suit a developer-tooling audience, and photograph
well — but that is one option among several, and it is a matter of taste rather
than engineering.
