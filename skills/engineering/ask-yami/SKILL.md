---
name: ask-yami
description: Ask which skill or flow fits your situation. A router over the skills in this repo.
disable-model-invocation: true
---

# Ask Yami

You don't remember every skill, so ask.

Before stating what a skill does or recommending a step be skipped, read that skill's SKILL.md: the summaries here are for orientation only.

A **flow** is a path through the skills. Most work travels the **main flow**, inside a **release cycle**, on branches that each know their **base**. A few **on-ramps** merge onto it; everything else is design, upkeep, or standalone.

## Branch lineage, in one paragraph

Every spec and ticket carries a `**Base:**` line: the branch its work is cut from and **lands** back into. Tickets land into a release (or a feature branch inside it), the release lands into `main`. Each ticket is a PR into its base that you review; `/land` merges it, closes the issue, and **restacks** any branch stacked on it. `/branch-lineage` holds the vocabulary and the procedures; the skills below call it.

## The main flow: idea to shipped release

1. **`/release start <N>`** cuts `release/<N>` from `main` and makes it the default base. Skip it for repos that ship straight from `main`.
2. **`/grill-with-docs`** sharpens the idea by interview, keeping `GLOSSARY.md` and ADRs current. (No repo under you? `/grill-me`.)
3. **Branch: can you settle every question in conversation?** If one needs a runnable answer, detour through **`/prototype`**, bridged by **`/handoff`** in both directions.
4. **Branch: is this a multi-session build?**
   - **Yes**: **`/to-spec`** (the spec gets the release as its base), then **`/to-tickets`** (each ticket gets blockers, a base, and surface labels). Then work the tickets one of two ways:
     - **One at a time**, a fresh context per ticket: **`/start-work <n>`** (branch and worktree from the ticket's base), **`/implement <n>`** (builds with `/tdd`, reviews with `/code-review`, writes the changelog entry, opens the PR into the base), **you review the PR**, then **`/land <pr>`**.
     - **All at once**: **`/implement-spec`** runs implementer subagents across the ready **frontier** on one `feature/<spec>` branch, then opens one PR into the spec's base for you to review and `/land`.
   - **No**: **`/implement`** right here; it still ends in a PR into the current branch's base.
5. **`/release finish <N>`** freezes the release, compiles the changelog and version bump, opens the release PR into `main`, lands it after your approval, tags it, and publishes the notes.
6. **`/retro`** and **`/reflect`** close the loop: `/retro` improves the environment (checks, tooling), `/reflect` turns the session's lessons into edits to skills and docs.

### Context hygiene

Keep steps 2 to 4 (up to `/to-tickets`) in **one unbroken context window**. Each `/implement` then starts fresh, working from its ticket. The limit is the **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**; near it, `/compact` at the nearest phase boundary (see Phase boundaries).

## On-ramps

- **Something's broken** → where it lives decides the flow:
  - In a PR under review: comment, and `/implement` fixes it on that branch.
  - On an unreleased release branch: an issue based on that branch, `/start-work`, **`/diagnosing-bugs`**, review, `/land`.
  - In a shipped version: **`/release hotfix <tag>`**, then `/start-work`, `/diagnosing-bugs`, review, `/land`, and **`/release hotfix finish`** (patch tag, back-merge into open releases).

  `/diagnosing-bugs` refuses to theorise until it has a **tight feedback loop**, fixes with a regression test, opens the PR, and records non-obvious causes with `/learnings`.
- **Bugs and requests piling up** → **`/triage`**: it verifies each one, finds the affected version (which sets the base), and writes agent-ready issues. Only for issues you didn't create; `/to-tickets` output is already agent-ready.
- **A huge, foggy effort** → **`/wayfinder`** charts a map of decision tickets until the way is clear, then hands off to `/to-spec`.

## Design: project, stack, and code architecture

Decide these before the first ticket of a new surface, and revisit when they stop fitting.

- **`/setup-z-yami-coding-skills`** (once per repo) configures the tracker, labels, domain docs, the branching policy, and the surface map.
- **`/surface-map`** keeps `docs/agents/surfaces.md`: each surface of the monorepo, its contracts, and the minimum context it needs from the others. The model reaches for it when a contract changes.
- **`/stack-decision`** picks a surface's framework or a library for a slot, and records an ADR and `docs/agents/stack.md`.
- **`/surface-architecture`** picks how code is organised inside a surface (feature modules, page-based, clean, vertical slices), writes its architecture doc, and enforces the dependency rule with lint (via `/setup-ts-deep-modules` for TypeScript).
- **`/extract-surface`** plans splitting a surface into its own repo from its extraction context.

## Review

- **`/code-review`** reviews a branch against its base: **Standards** (documented standards, the architecture doc, cross-surface impact) and **Spec**, plus **Security** on risky diffs and **Deep** when you ask. `/implement` runs it for you.
- **`/security-review`**: the exploit-focused security axis on its own.
- **`/deep-review`**: the strict maintainability audit on its own; big restructurings it finds become follow-up tickets, not scope creep.
- **`/pr`** shapes every PR body (model-invoked).

## Codebase health and learning

- **`/improve-codebase-architecture`**: in a spare moment, find deepening opportunities and drift from the architecture docs. Picking one generates an idea for `/grill-with-docs`.
- **`/debt`**: harvest `shortcut:` comments into a ledger and issues.
- **`/learnings`**: solution notes in `docs/solutions/`, written after non-obvious fixes and read before work in the same area (model-invoked).
- **`/reflect`** and **`/retro`**: see step 6 of the main flow.
- **`/skill-eval`**: score a skill and test its trigger before changing it.

## Vocabulary underneath

Model-invoked references, each the single source of truth for its words:

- **`/branch-lineage`**: base, lineage, land, restack, stacked.
- **`/domain-modeling`**: the domain language, `GLOSSARY.md`, ADRs.
- **`/codebase-design`**: module, interface, depth, seam, adapter, leverage, locality.

## Phase boundaries

At the **boundary** between two phases you have five options:

- **Continue**: stay put. Costs nothing, loses nothing.
- **`/clear`**: empty the window, when nothing here matters to what's next.
- **`/handoff`** writes a portable markdown file for a new harness, directory, or colleague; `/handoff --bg` starts a background agent on it.
- **Subagent**: send a tightly-scoped task to its own window and get a report back.
- **`/compact`**: compress this context and seed a fresh session with it. The **default**.

Read [PHASE-BOUNDARIES.md](PHASE-BOUNDARIES.md) for the ordered tree and the reasoning behind each branch.

## Standalone

- **`/grill-me`**, **`/grilling`**: the interview, without and with no wrapper.
- **`/research`**: a background agent reads primary sources and leaves a cited note.
- **`/to-questionnaire`**: when the answer is in someone else's head.
- **`/wizard`**: an interactive script for steps only a human can take.
- **`/resolving-merge-conflicts`**: resolve a conflict by intent, traced to each side's source. `/land` reaches for it during restacks.
- **`/wait-what`**: a reply didn't land; get it re-explained in plain words.
- **`/caveman`**: terse chat replies (never files); pair with `/wait-what` when too terse.
- **`/unslop`**: strip AI tells from prose humans read (model-invoked by `/pr` and `/changelog`).
- **`/teach`**: learn a concept over several sessions.
- **`/writing-for-agents`**: how to write skills, AGENTS.md, and docs agents read.
- **`/mermaid-validator`**: check Mermaid diagrams before committing docs.
- **`/git-guardrails`**, **`/setup-pre-commit`**: one-time safety and quality hooks.

## Precondition

**`/setup-z-yami-coding-skills`**: run before your first engineering flow to configure the issue tracker, labels, doc layout, branching policy, and surface map the other skills assume.
