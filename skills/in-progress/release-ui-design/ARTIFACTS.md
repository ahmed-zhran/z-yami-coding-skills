# Design artifacts

Three paths, three jobs. Do not collapse them.

| Path | Job |
| --- | --- |
| `.ui-designs/<surface>/` | Working canvases: OpenPencil `.fig`, PNG/HTML exports. Drafts live here while design is in flight. |
| `docs/agents/ui-design/` | Durable rules: shared `SYSTEM.md`, per-surface folders. Lives across releases. |
| `docs/agents/releases/<N>/design.md` | This release's **approved** pack only: what changed, links to the two above, stamped Approval. |

`.ui-designs/` is intentional with a leading dot (draft canvas tree). **Do not gitignore it** when the release pack points at those files; tickets and PRs must resolve the links.

**Write rule.** Create `docs/agents/releases/<N>/design.md` only after the human approves. Until then that path must not exist, so `/ship-release` treats the release as having no design phase. Never commit an unchecked Approval section there.

## `.ui-designs/<surface>/`

Example layout:

```text
.ui-designs/
  site/
    landing.fig
    exports/
      landing-hero.png
      landing-doors.png
  web-app/
    chart-viewer.fig
    exports/
```

Surface names match `docs/agents/surfaces.md`.

## `docs/agents/ui-design/`

```text
docs/agents/ui-design/
  SYSTEM.md                 # shared tokens, type, colour, spacing, motion, shared components
  surfaces/
    <surface>/
      README.md             # that surface's patterns, density, nav, screen grammar
```

Bootstrap `SYSTEM.md` from the codebase only when this tree is missing. Later releases extend it.

## Release pack template

Write `docs/agents/releases/<N>/design.md` **only on approval**, already stamped:

```markdown
# Design pack: release/<N>

## Specs

- #<spec-issue>: <title> (UI: yes | skip)
- …

## Surfaces

- <surface>: screens below follow `docs/agents/ui-design/surfaces/<surface>/` and `.ui-designs/<surface>/`

## Screens

| Spec | Screen / state | Frame or export | Notes |
| --- | --- | --- | --- |
| #<n> | landing / hero | `.ui-designs/site/exports/landing-hero.png` | |
| #<n> | landing / empty | … | |

## System pointers

- Shared: `docs/agents/ui-design/SYSTEM.md`
- Surfaces: list paths touched this release

## Approval

- [x] Design approved for release/<N>
- Approved by: <user>
- Date: <YYYY-MM-DD>
```

Approval is complete only when the checkbox is checked and Approved by / Date are filled. That is the only valid state for this file.
