# Goals and Features — Entity Insight Studio

## Goal

Demonstrate a full-stack analytics product pattern — a Next.js analytics studio with an overview dashboard, ownership relationship graph, and scenario explorer — backed by a FastAPI service and typed fixture data.

The repo shows how to compose a data-driven analytics UI with clean frontend/backend separation, shared data contracts, and a fixture mode that makes the app fully runnable without any external services or environment configuration.

## What This Solves

Analytics products for entity and ownership data need more than charts: they need information architecture that surfaces the right level of detail for different analytical questions (overview metrics, relationship structure, forward-looking scenarios). This repo shows one compositional pattern for that — modular views, a reusable graph component, and a thin API layer that keeps UI logic decoupled from data access.

---

## Features

### Overview Dashboard

The landing view for a selected entity:
- **Profile panel** — entity identity, classification, and key attributes
- **KPIs** — headline metrics with peer context
- **Footprint distribution** — breakdown chart across asset categories or geographies
- **Tracked assets** — asset inventory with activity and capacity indicators

### Ownership Relationship Graph

Interactive graph view built with React Flow:
- Directed ownership and control structure for the selected entity
- Node-level detail on hover
- Edge weights reflecting ownership stakes
- Mirrors the graph model in `ownership-responsibility-graph` in a visual product layer

### Scenario Explorer

Time-series comparison view built with Recharts:
- Baseline trajectory vs planned/alternative pathways
- Benchmark trajectory overlay
- Designed for transition planning and forward-looking analytics use cases

### Two Runtime Modes

| Mode | How to run | Data source |
|---|---|---|
| Fixture mode | `npm run dev` | `public/demo-data/*.json` via typed helpers |
| API mode | `docker compose up` | FastAPI backend at port 8000 |

The same UI components and data contracts work in both modes. Switching is controlled by the `USE_API` environment variable — no code changes needed.

### FastAPI Backend

Standalone API service with endpoints for:
- Entity options (dropdown population)
- Overview payload (dashboard data)
- Ownership payload (graph data)
- Scenario series (time-series data)

Backed by the same JSON fixtures in API mode, making it trivially swappable for a real database connection.

### Typed Data Layer

`lib/demo-data.ts` — typed helpers for reading fixture data in local mode. The same interfaces are used by the API adapter, so UI components never need to know which data source is active.

### Tech Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Recharts (time-series charts)
- React Flow (relationship graph)
- FastAPI (Python backend)
- Docker + Docker Compose (two-service: web + api)

### Verification

```bash
npm run verify:fixtures   # validates fixture schema consistency
npm run lint              # ESLint
npm run build             # Next.js production build check
pytest api/tests          # FastAPI endpoint tests
ruff check api            # Python linting
```

---

## What This Repo Does Not Cover

- Authentication, account management, or multi-tenant access
- Admin tooling or data upload flows
- The underlying lakehouse pipeline that produces entity and ownership data (see `entity-data-lakehouse`)
- The graph attribution logic behind the ownership view (see `ownership-responsibility-graph`)
