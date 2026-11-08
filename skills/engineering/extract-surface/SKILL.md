---
name: extract-surface
description: "Plan splitting one monorepo surface into its own repo, carrying exactly the context it needs from the others."
argument-hint: "The surface to extract"
disable-model-invocation: true
---

Plan the extraction of the surface the user named into its own repository. This skill produces a plan and tickets; it does not move code.

1. Call the Skill tool with "surface-map" and bring `docs/agents/surfaces.md` up to date for this surface first. A stale map makes a wrong plan.
2. From the map, list for this surface: every contract it consumes, every contract it owns, every leak (import that bypasses a contract), its glossary terms, and the ADRs that bind it.
3. Call the Skill tool with "grilling" and settle, one at a time:
   - **Leaks**: each must become a contract or be removed before the split. These are prefactor tickets.
   - **Contract delivery**: how the new repo gets each consumed contract (published package, generated client from a schema, vendored copy with a sync check).
   - **Context carried over**: which glossary terms and ADRs are copied, and which stay as links back to the monorepo.
   - **History**: `git filter-repo` to keep the surface's history, or a fresh start.
   - **CI and release**: what the new repo needs to build, test, version, and deploy on its own.
4. Write the plan as a spec on the issue tracker (same template as `to-spec`), with `**Base:**` set to the current default base, then tell the user to run `/to-tickets` on it. Prefactor tickets (fixing leaks) come first and are blockers for the split itself.

The new repo starts with its own `AGENTS.md` that points to its extraction context, so an agent there knows which outside contracts it depends on and where their sources of truth live.
