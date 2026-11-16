# Human testing: 1.6.1

Package patch: Herdr Focus etiquette. Agent-behaviour checks; no product surface UI.

**How to fill:** edit this file directly, or open it in Herdr `md-preview`.

## Surfaces under test

- skills package (Herdr control skills and `spec-flow` child sessions)

## Checklist

### skills package

#### Focus etiquette

- [x] An agent using `herdr-app` / `hc` stays in its own current space for inspection and shots unless asked to move
  - Notes: shipped as skill text; verified by reading the published skills
- [x] Creating a background tab uses `--focus false` / `--no-focus` by default
  - Notes:
- [x] `space.select` and focus theft are not used for convenience
  - Notes:

## Sign-off

- Status: Approved
- Approved / blocked by: Ahmed
- Date: 2026-11-17
- Summary: Small package patch; behaviour encoded in skills. Cut on request.
