---
after: 1.5.0
path: docs/agents/pending-release.md
template: skills/engineering/release/pending-release.md
keep:
  - version and tag line
  - boxes already checked
  - existing blocking lines
---

# Empower crafting on the release gate

Consumers on 1.5.0 or older have a post-release gate without an Empower crafting box.

In an install, the template is `pending-release.md` beside `release/SKILL.md`. In this repo it is the `template` path above.

If `docs/agents/pending-release.md` does not exist, do nothing. A missing file means no gate is pending. If it exists, add the Empower crafting line from the template when that line is absent. Put it **after** the Skills update (`/sync-skills`) line so it stays the last blocking box. Leave it unchecked. Leave every existing box as it is, including a box the user has already checked. Leave the version and tag line as it is.

Already applied when the file is missing, or it contains an Empower crafting line (or `/empower-crafting` / `craft-skills`). Do nothing in that case.
