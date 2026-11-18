---
after: 1.6.1
path: docs/agents/craft-skills-draft.md
template: skills/engineering/setup-z-yami-coding-skills/craft-skills-draft.md
keep: []
---

# Craft draft: no packaged taste

Consumers on 1.6.1 or older may still have a draft that lists `design-taste-frontend` / `codebase-design` as in-package defaults, or a live seed that names those skills before `/empower-crafting` ran.

If `docs/agents/` does not exist, do nothing (setup has not run).

1. Replace `docs/agents/craft-skills-draft.md` with the template (draft is package-owned). The new draft is Proposed-only candidates; taste is not shipped by the plugin.
2. If `docs/agents/craft-skills.md` is missing, copy `skills/engineering/setup-z-yami-coding-skills/craft-skills.md` once as an empty seed. If the live file already exists, leave it unchanged (`/empower-crafting` owns it). Tell the human that an old live table still naming package-default taste should be revised with `/empower-crafting` if they want taste installed again.

Already applied when `docs/agents/craft-skills-draft.md` matches the new Proposed-only template shape (no "In package" taste/codebase-design defaults).
