---
after: 1.5.0
path: docs/agents/craft-skills-draft.md
template: skills/engineering/setup-z-yami-coding-skills/craft-skills-draft.md
keep: []
---

# Craft skills draft

Consumers on 1.5.0 or older may have no craft-skills files, or may still have the older `implementation-skills*.md` names.

If `docs/agents/` does not exist, do nothing (setup has not run).

1. If `docs/agents/craft-skills-draft.md` is missing, copy the template there. If it already exists, replace it with the template (draft is package-owned; consumer edits belong in the live file via `/empower-crafting`).
2. If `docs/agents/craft-skills.md` is missing, copy `skills/engineering/setup-z-yami-coding-skills/craft-skills.md` to that path once as a seed. If the live file already exists, leave it unchanged.
3. If `docs/agents/implementation-skills-draft.md` or `docs/agents/implementation-skills.md` exists, delete those obsolete paths after the craft files are in place (content lives under the new names).

Already applied when `docs/agents/craft-skills-draft.md` exists, `docs/agents/craft-skills.md` exists or was seeded, and neither obsolete `implementation-skills*.md` path remains under `docs/agents/`.
