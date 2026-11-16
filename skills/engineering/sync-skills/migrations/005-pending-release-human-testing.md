---
after: 1.5.0
path: docs/agents/pending-release.md
template: skills/engineering/release/pending-release.md
keep:
  - version and tag line
  - boxes already checked
  - existing blocking lines
---

# Human-testing feedback on the release gate

Consumers on 1.5.0 or older have a post-release gate without a human-testing feedback box.

If `docs/agents/pending-release.md` does not exist, do nothing. A missing file means no gate is pending. If it exists, add the Human-testing feedback line from the template when that line is absent. Put it at the top of the Blocking list (before Retro). Leave it unchecked. Leave every existing box as it is. Leave the version and tag line as it is.

Already applied when the file is missing, or it contains a Human-testing feedback line (or `docs/releases/` human-testing). Do nothing in that case.
