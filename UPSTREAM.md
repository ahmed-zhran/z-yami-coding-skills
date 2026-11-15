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
| `implement-spec` | Integration branch is `feature/<spec>` based on the spec's base; ends in one PR for review and `/land` |
| `to-spec` | `**Base:**` and `**Surfaces:**` in the template; reads surface, stack, architecture docs |
| `to-tickets` | Each ticket gets a base (stacking allowed), surface labels; slices follow the surface architecture |
| `code-review` | Default fixed point is the recorded base; architecture docs and `stack.md` are hard standards; cross-surface check; Security and Deep axes |
| `diagnosing-bugs` | "Where the fix lands" table; Phase 7 ships as a PR and writes a solution note |
| `triage` | Finds the affected version for bugs and sets the base |
| `tdd` | "What must be tested": risky logic always gets a test |
| `improve-codebase-architecture` | Reports drift from the architecture docs and overdue shortcuts |
| `pr` | Calls `unslop`; states the base; `Part of #n` unless the base is the default branch |
| `handoff` | Absorbs `claude-handoff` as `--bg` (Claude Code or Cursor background agent) |
| `git-guardrails-claude-code` → `git-guardrails` | Moved from `misc/`; Cursor support; allows normal work-branch pushes; careful and freeze modes |
| `setup-ts-deep-modules` | Moved from `in-progress/` to `engineering/`; now model-invoked so `surface-architecture` can call it |
| `software-factory` | Moved from `in-progress/` to `engineering/` (promoted); content unchanged |
| `resolving-merge-conflicts` | Restored from upstream history (removed in v1.3.0), needed for restacking |

## Added

branch-lineage, start-work, land, release, ship-ticket, ticket-flow, ship-release, release-flow, herdr, herdr-guide, sync-skills, changelog, surface-map, extract-surface, stack-decision, surface-architecture, security-review, deep-review, debt, learnings, reflect, mermaid-validator, unslop, caveman, skill-eval. `herdr` and `herdr-guide` are vendored; the pins and the update check are in `.agents/external-skills.md`. Credits for adapted ones are in each `SKILL.md` frontmatter and the README.

## Dropped

scaffold-exercises, migrate-to-shoehorn (course- and library-specific), loop-me, writing-beats, writing-fragments, writing-shape, chief-of-staff (not about coding), claude-handoff (merged into handoff). Upstream's issue templates and triage workflows (community management for a public repo).
