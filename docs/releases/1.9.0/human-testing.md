# Human testing: 1.9.0

Package change: external `.designs/` folder; design phase removed.

## Surfaces under test

- skills package (ship flow, design drop folder)

## Checklist

### skills package

#### External designs, no design phase

- [x] `.designs/` exists; `docs/agents/designs.md` describes `release-<N>/`
  - Notes:
- [x] Promoted ship skills no longer mention `/release-ui-design`, OpenPencil, or `design.md` packs
  - Notes:
- [x] `/release-ui-design` lives under `deprecated/` only
  - Notes:
- [x] `claude plugin validate` passes
  - Notes:

## Sign-off

- Status: Approved
- Approved / blocked by: Ahmed
- Date: 2026-11-20
- Summary: Small cut on request after designs PR merge.
