# Human testing: 1.7.0

Package change: craft draft / unship taste. Agent-behaviour and install-surface checks.

## Surfaces under test

- skills package (plugin skill set, craft draft, live craft seed)

## Checklist

### skills package

#### Craft candidates, not plugin defaults

- [x] Plugin no longer lists `design-taste-frontend`; `claude plugin validate` passes
  - Notes:
- [x] `docs/agents/craft-skills-draft.md` is Proposed-only (includes taste + seo-technical; no prisma/a11y/agent-browser; no codebase-design)
  - Notes:
- [x] Live `docs/agents/craft-skills.md` has no default taste/codebase-design rows until `/empower-crafting`
  - Notes:

## Sign-off

- Status: Approved
- Approved / blocked by: Ahmed
- Date: 2026-11-18
- Summary: Cut on request after plan approval.
