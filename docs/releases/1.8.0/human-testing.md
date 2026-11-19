# Human testing: 1.8.0

Package change: promote `html-artifacts`. Agent-behaviour and install-surface checks.

## Surfaces under test

- skills package (plugin skill set, format-judgment routing)

## Checklist

### skills package

#### html-artifacts promoted

- [x] Plugin lists `html-artifacts`; `claude plugin validate` passes
  - Notes:
- [x] `ask-yami` and docs name when HTML wins vs markdown vs `/improve-codebase-architecture`
  - Notes:
- [x] Durable SoT / GitHub PR body carve-outs are explicit in the skill description
  - Notes:
- [x] skill-eval evidence present (`docs/research/html-artifacts-skill-eval.md`, grade A)
  - Notes:

## Sign-off

- Status: Approved
- Approved / blocked by: Ahmed
- Date: 2026-11-19
- Summary: Small cut on request to ship html-artifacts.
