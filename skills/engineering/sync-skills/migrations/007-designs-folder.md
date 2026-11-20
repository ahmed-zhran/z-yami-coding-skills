---
after: 1.8.0
path: docs/agents/designs.md
template: skills/engineering/setup-z-yami-coding-skills/designs.md
keep: []
---

# Migration: external designs folder

Consumers that still expect `docs/agents/releases/<N>/design.md` or `.ui-designs/` as a ship-flow gate should switch to `.designs/release-<N>/`.

If `docs/agents/` does not exist, do nothing (setup has not run).

1. Write `docs/agents/designs.md` from the template when missing. If it already exists, leave it unless it still describes the old design-pack / `.ui-designs/` gate; then replace with the template.
2. Ensure `.designs/` exists (add `.gitkeep` if the folder is absent). Do not create per-release subfolders.
3. Leave any old `docs/agents/releases/<N>/design.md` or `.ui-designs/` alone; ship skills no longer read them. The human may delete them.

Already applied when `docs/agents/designs.md` exists and describes `.designs/release-<N>/`.
