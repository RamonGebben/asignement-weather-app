# Weather App

A technical assignment: a small weather dashboard for Sopra Steria.

**Live demo:** [https://sopra-steria-weather-app.vercel.app/](https://sopra-steria-weather-app.vercel.app/)

## Quick start

```bash
pnpm install
cp .env.example .env.local   # add your own OPENWEATHERMAP_API_KEY (free tier)
pnpm dev                     # http://localhost:3000
```

Verification, if you want to check it yourself instead of taking my word for it:

```bash
pnpm typecheck
pnpm lint
pnpm format        # pnpm format:write to fix
pnpm test          # Vitest, pure logic
pnpm test:storybook # component behavior + accessibility
pnpm test:e2e      # Playwright, full user flows
pnpm build
pnpm lighthouse    # Lighthouse CI, against the build above
```

All of this (minus `pnpm dev`) runs on every PR via [GitHub Actions](.github/workflows/ci.yml),
which builds once and shares that build between the e2e and Lighthouse jobs. Vercel handles
its own build and deploy on push, so CI here only has to verify.

## Stack

- Next.js (App Router)
- [tRPC](https://trpc.io/) + [TanStack Query](https://tanstack.com/query/latest)
- styled-components, themed via [`@pindakaasman/design-system`](https://github.com/RamonGebben/mise/tree/main/packages/design-system)
- Zod for schema validation
- Vitest, Storybook (interaction + a11y), Playwright

## Folder structure

Code is organized using an Atomic design structure (`atoms -> molecules -> organisms ->
templates`), with a strict rule: a folder's `index` file is its only public
surface and dependencies only point one way down the tiers.
For instance an atom may not import another atom, it may only reach for `src/utils/` or `src/theme/`.

This goes beyond only labeling but about being able to move efficiently and change with confidence.
A change inside one component's folder can't leak into another's. This way you can work fast inside a
single area without being too concerned what else might break as long as contracts and APIs stay the same.
When something outgrows its local scope (a hook, a util, a small component) it can be promoted and moved.
Local by default, promoted to shared only when a second real usage asks for it.

## A few decisions worth calling out

- tRPC and TanStack Query over a hand-rolled REST layer. It gives end-to-end
  type safety from the OpenWeatherMap mapping all the way down to component
  props, and the caching layer opens the door to things like offline-first
  behavior later without extra plumbing.
- The glass UI's contrast is proven, not eyeballed. `theme/glass` has a test
  that computes WCAG contrast ratios for every text tone against the
  darkest and lightest points any sky, blur or noise combination can
  produce, in both color modes.
- No client-side state library. The selected location and other global application state can lives entirely in the
  URL (`?lat&lon&name...`).
- Provider errors get mapped to typed, client-safe tRPC errors (rate limits,
  upstream failures, etc) so the client never has to know or care
  that OpenWeatherMap is the thing behind the API.
- One tool per job in testing. Vitest for pure logic, Storybook for
  component behavior and accessibility, Playwright for the handful of flows
  that need an actual browser. Not everything needs the heaviest tool.

## Tooling I bring to every project

Two things used here aren't one-offs for this assignment:

- [`RamonGebben/mise`](https://github.com/RamonGebben/mise): a set of
  conventions (architecture, TypeScript, testing, verification) packaged as
  Claude Code plugins, so an AI-assisted session applies my own standards
  instead of generic defaults.
- [`@pindakaasman/design-system`](https://github.com/RamonGebben/mise/tree/main/packages/design-system):
  a typed, breakpoint-aware theme package (light/dark tokens) that this app's
  styled-components theme is built on.

Both predate this project and get reused across others. I've built up these
conventions over several years and have been investing in teaching and
enforcing them to an LLM, currently Claude Code, since it's the strongest
harness available right now.
