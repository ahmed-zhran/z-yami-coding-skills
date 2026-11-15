---
after: 1.3.0
path: docs/agents/pending-release.md
template: skills/engineering/release/pending-release.md
keep:
  - version and tag line
  - boxes already checked
  - existing blocking lines
---

# Learnings and debt on the release gate

Consumers on 1.3.0 or older have a post-release gate without a learnings box or a debt box.

In an install, the template is `pending-release.md` beside `release/SKILL.md`. In this repo it is the `template` path above.

If `docs/agents/pending-release.md` does not exist, do nothing. A missing file means no gate is pending. If it exists, add the Learnings line and the Debt line from the template when either is absent. Put them directly under the Reflect line. Leave them unchecked. Leave every existing box as it is, including a box the user has already checked. Leave the version and tag line as it is.

Already applied when the file is missing, or it contains both a Learnings line and a Debt line. Do nothing in that case.
