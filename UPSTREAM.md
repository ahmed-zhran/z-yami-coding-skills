# Upstream

This repo is a hard fork of [mattpocock/skills](https://github.com/mattpocock/skills), with upstream's full history.

- **Forked at:** `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d` (2026-10-31, upstream v1.3.2 plus unreleased changes)
- **Remote:** `upstream` points at `https://github.com/mattpocock/skills.git`

## Syncing

```bash
git fetch upstream
git log --oneline <last-synced>..upstream/main -- skills/   # what changed in skills
git merge upstream/main                                     # then resolve, skill by skill
```

Conflicts land almost entirely in the **changed** skills below. For each, keep upstream's improvement and re-apply the divergence noted here. Update **Forked at** after each sync.

## Kept as upstream

grill-with-docs, wayfinder, prototype, research, domain-modeling, codebase-design, wizard, retro, grill-me, grilling, teach, to-questionnaire, wait-what, writing-for-agents, setup-pre-commit.

## Changed

| Skill | Divergence |
|-------|------------|
| `ask-matt` → `ask-yami` | Renamed; rewritten for lineage, release, surface, review, and learning flows |
| `setup-matt-pocock-skills` → `setup-z-yami-coding-skills` | Renamed; adds Branching (writes `docs/agents/branching.md`) and Surfaces sections, surface labels |
| `implement` | Ponytail's smallest-complete-change ladder; reads architecture and stack docs; changelog entry; ends in a PR into the recorded base (never merges unless `review: auto`) |
| `implement-spec` | The spec branch is `spec/<issue>`, cut from the release. Tickets merge there. One PR lands that branch into the release |
| `to-spec` | `**Base:**` and `**Surfaces:**` in the template; reads surface, stack, architecture docs; cuts `spec/<issue>` from the release after publish |
| `to-tickets` | Each ticket's base is `spec/<issue>` (stacking allowed), surface labels; slices follow the surface architecture |
| `code-review` | Default fixed point is the recorded base; architecture docs and `stack.md` are hard standards; cross-surface check; Security and Deep axes |
| `diagnosing-bugs` | "Where the fix lands" table: an unreleased bug's ticket lands into `spec/<issue>`, not the release; Phase 7 ships as a PR and writes a solution note |
| `triage` | Finds the affected version for bugs and sets the base to the spec branch, not the release |
| `tdd` | "What must be tested": risky logic always gets a test |
| `improve-codebase-architecture` | Reports drift from the architecture docs and overdue shortcuts |
| `pr` | Calls `unslop`; states the base; `Part of #n` unless the base is the default branch |
| `handoff` | Absorbs `claude-handoff` as `--bg` (Claude Code or Cursor background agent) |
| `git-guardrails-claude-code` → `git-guardrails` | Moved from `misc/`; Cursor support; allows normal work-branch pushes; careful and freeze modes |
| `setup-ts-deep-modules` | Moved from `in-progress/` to `engineering/`; now model-invoked so `surface-architecture` can call it |
| `software-factory` | Demoted back to `in-progress/` (beta, opt-in only; not in the plugin) |
| `resolving-merge-conflicts` | Restored from upstream history (removed in v1.3.0), needed for restacking |

## Added

branch-lineage, start-work, land, release, ship-ticket, ticket-flow, ship-spec, spec-flow, ship-release, release-flow, herdr, herdr-guide, sync-skills, empower-crafting, changelog, surface-map, extract-surface, stack-decision, surface-architecture, security-review, deep-review, debt, learnings, reflect, mermaid-validator, unslop, caveman, skill-eval, html-artifacts. `branch-lineage` names the ship levels: `release/<N>`, `spec/<issue>`, `ticket/<issue>-<slug>`. A spec ticket lands into the spec, and the spec lands into the release. A bug ticket lands into the open release, a hotfix cut from the production tag, or `main` when no release is open. `ship-spec` ships one spec through its tickets until that branch lands in the release. `ship-release` runs that procedure once per feature, then tests and tags. `sync-skills` applies migration records under `skills/engineering/sync-skills/migrations/` for consumer files the package writes. The first record rewrites `docs/agents/branching.md` to those levels and keeps that repo's review choices. `herdr`, `herdr-core`, `herdr-app`, `herdr-guide`, and `html-artifacts` are vendored; the pins and the update check are in `.agents/external-skills.md`. Coding-craft candidates (including `design-taste-frontend` / Leonxlnx/taste-skill) live in the craft-skills draft for `/empower-crafting` and are not shipped in the plugin until a consumer approves install. `spec-flow` uses the TUI when `HERDR_ENV` is `1` and Herdr Desktop when `HC_TERMINAL_ID` is set, steers every ticket session it started (screen-read loop for Cursor allowlist dialogs that stay `working`, not status-only waits), and lands lower levels under the ship door's authority (`/ship-ticket` owns the ticket land, `/ship-spec` owns the spec land and lands tickets, `/ship-release` owns the release land and lands tickets and specs). `/ship-spec` and `/ship-release` both reach it. Credits for adapted ones are in each `SKILL.md` frontmatter and the README.

## Dropped

scaffold-exercises, migrate-to-shoehorn (course- and library-specific), loop-me, writing-beats, writing-fragments, writing-shape, chief-of-staff (not about coding), claude-handoff (merged into handoff). Upstream's GitHub triage workflows. Issue templates are in `.github/ISSUE_TEMPLATE`. Who can open a pull request is in `CONTRIBUTING.md`. This fork later unshipped vendored `design-taste-frontend` from the plugin; it remains a craft-skills draft candidate only.
