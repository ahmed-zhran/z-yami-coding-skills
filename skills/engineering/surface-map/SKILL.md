---
name: surface-map
description: "Keep docs/agents/surfaces.md, the map of a monorepo's surfaces (apps, services, packages), accurate: each surface's path, deploy unit, stack, architecture doc, glossary, and the contracts it exposes and consumes. Use when adding, renaming, or removing an app, service, or package, when a cross-surface contract changes, or when the user asks what depends on what in the monorepo."
---

# Surface Map

A **surface** is one deployable or publishable part of a monorepo, scoped by who uses it and where it runs: a web app, a mobile app, an API, a worker, a shared package. The **surface map** (`docs/agents/surfaces.md`) is the one place an agent learns what surfaces exist and how they connect, so a change on one surface can be checked against the others it touches.

A monorepo is the best context an agent can have, because every surface is one grep away. The price is precision: the map must say exactly which **contract** each surface depends on, or the agent sees everything and understands nothing.

## The map

```markdown
# Surfaces

| Surface | Path | Deploys as | Stack | Architecture | Glossary |
|---------|------|------------|-------|--------------|----------|
| api | `api/` | container | FastAPI | [docs/agents/architecture/api.md] | `GLOSSARY.md` |
| clinic | `apps/clinic/` | iOS + Android app | Flutter | [docs/agents/architecture/clinic.md] | `GLOSSARY.md` |

## Contracts

| Contract | Owner | Consumers | Source of truth |
|----------|-------|-----------|-----------------|
| HTTP API v1 | api | clinic, admin | `docs/api/openapi.yaml` |
| Shared types | packages/types | api, admin | `packages/types/src/index.ts` |

## Extraction context

### clinic
Needs from other surfaces: HTTP API v1 (contract), auth token format (ADR-0004), glossary terms Encounter, Appointment.
```

- **Contracts** are the only legitimate coupling between surfaces. Every row names one owner and one source-of-truth file. An import from another surface's internals is a leak, not a contract.
- **Extraction context** is, per surface, the minimum it needs from the others. It is what that surface's repo would have to carry if it were ever split out, and it is what an agent working on that surface should read first.

## Procedure

1. Discover surfaces: workspace config (`pnpm-workspace.yaml`, `package.json` workspaces, `go.work`, Cargo workspace, `melos.yaml`), top-level `apps/`, `services/`, `packages/`, `api/`, and each folder's own build or deploy file.
2. For each surface, fill its row. Leave Stack and Architecture as `TBD` when no decision exists; tell the user to run `/stack-decision` or `/surface-architecture` for that surface rather than guessing.
3. Find contracts: API schemas, shared packages, event or queue payloads, database tables read by more than one surface. Record owner, consumers, source of truth.
4. Find leaks: cross-surface imports that bypass a contract. List them under a `## Leaks` heading with file references, each one a candidate ticket.
5. Write extraction context per surface.
6. Show the user the diff to the map before writing it.

Done when every workspace member has a row, every cross-surface import is either through a listed contract or listed as a leak, and every surface has an extraction-context entry.

## Using the map

- Before changing a contract's source of truth, list its consumers from the map; the change is not done until each consumer is updated or confirmed unaffected.
- Ticket and PR labels use surface names from the map (`surface:<name>`).
- When the user asks to split a surface into its own repo, the extraction context is the input to `/extract-surface`.
