---
after: 1.1.0
path: docs/agents/branching.md
template: skills/engineering/setup-z-yami-coding-skills/branching.md
keep:
  - default base branch
  - review mode
  - auto-land labels
  - update strategy
  - stacking
---

# Ship levels

Consumers on 1.1.0 or older name a feature branch, or send every ticket at the default base.

In an install, the template is `branching.md` beside `setup-z-yami-coding-skills/SKILL.md`. In this repo it is the `template` path above.

Replace the naming table, the sentences that say where a spec, a spec ticket, and a bug ticket land, and the merge-strategy noun, using that template. A Feature row goes away. Merge commits are for specs, releases, and hotfixes. If the pending-release gate section is missing, add it from the template.

If the consumer file does not exist, write it from the template. Set the default base to the open `release/*` when one exists, otherwise `main`.

Already applied when the naming table has a Spec row and no Feature row, and the merge strategy names specs. Do nothing in that case.
