---
name: release-ui-design
description: "Deprecated. Design is external: drop exports under .designs/release-<N>/. Do not run this skill."
disable-model-invocation: true
---

# Release UI design (deprecated)

**Deprecated.** Removed from the ship flow. Do not run this skill.

UI design happens outside the agent (Figma, OpenPencil, or anything else). Drop exports into `.designs/release-<N>/` for branch `release/<N>`. When that folder is non-empty, `/ship-release`, `/ship-spec`, `/ship-ticket`, and `/implement` build UI against those files. When it is missing or empty, they ship without design. See `docs/agents/designs.md`.

There is no design phase, no OpenPencil step, and no `docs/agents/releases/<N>/design.md` pack.
