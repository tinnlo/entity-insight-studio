# Entity Insight Studio

Entity Insight Studio is a focused Next.js demo for exploring entity metrics, relationship graphs, and time-based insight from a small fixture-backed dataset.

This public demo rebuilds a production architectural pattern in a public-safe form. It preserves system design, module boundaries, and execution flow while removing proprietary business logic and internal data.

## Portfolio Framing

- `What this demo shows`: a compact analytics studio with an overview dashboard, ownership graph, and scenario explorer over typed local fixtures
- `Which production capability it mirrors`: a production entity-analysis product pattern built around modular data views, reusable visual components, and thin read-only data interfaces
- `What was intentionally generalized or removed`: auth, admin, uploads, deployment variants, internal services, proprietary terminology, and non-public data dependencies
- `Why this repo exists in the portfolio`: to show product framing, information architecture, and frontend/system composition without exposing business-specific implementation detail

## Architectural Throughline

The repo is intentionally narrow. It preserves the strongest ideas from a larger internal analytics product:

- App Router structure
- dashboard composition patterns
- relationship graph visualization
- data-driven charts
- typed data helpers

It removes everything that would distract from a public demo:

- auth and account flows
- admin and upload tooling
- deployment variants
- internal services
- business-specific branding and terminology

## Demo Flows

- `Overview dashboard`: profile, KPIs, peer context, footprint distribution, and tracked assets
- `Relationship graph`: ownership and control structure for the selected entity
- `Scenario explorer`: baseline vs planned pathways against benchmark trajectories

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Recharts
- React Flow

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run verify:fixtures
npm run lint
npm run build
```

## Data Model

All runtime data is checked into `public/demo-data`:

- `entities.json`
- `ownership.json`
- `assets.json`
- `scenarios.json`

The app reads these fixtures through typed helpers in `lib/demo-data.ts`. Thin API routes expose entity options, overview payloads, ownership payloads, and scenario series so the visual components stay simple.

## Scope Notes

- The dataset uses invented entity names with public-style metric shapes.
- The app does not require `.env` configuration.
- The app is designed to render fully from local fixtures.
