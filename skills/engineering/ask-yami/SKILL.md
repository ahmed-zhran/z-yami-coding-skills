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

Every spec and ticket carries a `**Base:**` line, written when that issue is created. A spec ticket lands into `spec/<issue>`. That spec lands into the release. The release lands into `main`. A bug ticket lands into the open release, into a hotfix cut from the production tag when the bug has shipped, or into `main` when no release is open. Nothing lands into whatever branch happens to be checked out. `/land` merges into the recorded base, closes the issue, and **restacks** any branch stacked on it. `/branch-lineage` holds the vocabulary and the procedures; the skills below call it.

## The main flow: idea to shipped release

1. **`/release start <N>`** cuts `release/<N>` from `main` and makes it the default base. It refuses while `docs/agents/pending-release.md` still has an open blocking box from the previous release. Skip the release branch for repos that ship straight from `main`. **`/ship-release <N>`** is the one door for the whole cycle below, including this step.
2. **`/grill-with-docs`** sharpens the idea by interview, keeping `GLOSSARY.md` and ADRs current. (No repo under you? `/grill-me`.) Where a surface still has no stack or architecture decision, **`/stack-decision`** and **`/surface-architecture`** settle it before tickets exist.
3. **Branch: can you settle every question in conversation?** If one needs a runnable answer, detour through **`/prototype`**, bridged by **`/handoff`** in both directions.
4. **Branch: is this a multi-session build?**
   - **Yes.** One spec per feature. The doors are the same ones you would type by hand:
     - **One spec**, through its tickets, until `spec/<issue>` lands in the release: **`/ship-spec`**. It keeps an existing usable spec, or publishes one with the `/to-spec` template. It keeps existing tickets, or slices them with the `/to-tickets` rules. Each ready ticket then runs in a fresh session, the same procedure as **`/ship-ticket`**. You approve the breakdown, each ticket pull request, and the spec pull request.
     - **The phases, by hand**: **`/to-spec`** (this conversation, one feature), then **`/to-tickets`**, then **`/ship-ticket <n>`** per ticket. When those tickets have landed, **`/ship-spec <issue>`** lands the spec. Repeat `/ship-spec` once per feature.
     - **One ticket's phases**: **`/start-work <n>`**, **`/implement <n>`**, **you review the PR**, then **`/land <pr>`**.
     - **All of one spec's tickets in one pull request**: **`/implement-spec`**. That is a different door. `/ship-spec` and `/ship-release` give each ticket its own pull request into the spec branch, then land the spec.
     - **The whole release**: **`/ship-release <N>`** names every feature, runs the `/ship-spec` procedure once per feature, then tests and tags. Two features are two specs, finished one after the other.
   - **No.** It is still one ticket, and the ticket already has a `**Base:**`. **`/implement`** builds that ticket and opens the PR into the recorded base. It stops when the issue has no base. You review it, then **`/land`**.
5. **`/release finish <N>`** freezes the release, compiles the changelog and version bump, writes the post-release gate, opens the release PR into `main`, lands it after your approval, tags it, and publishes the notes. Human testing, `code-review`, and `security-review` of the release diff happen before that tag. **`/ship-release`** includes this step. Skip it when `/ship-release` already tagged.
6. **The gate blocks the next release.** `docs/agents/pending-release.md` lands on `main` with open boxes: `/retro`, `/reflect`, `/learnings`, `/debt`, an ADR pass, `/improve-codebase-architecture`, a risk and repo-scale note, any human decision still open, and `/sync-skills`. Clear them by doing the work. The next `/release start` or `/ship-release` refuses while a box is open.

### Context hygiene

Keep steps 2 to 4 (through `/to-spec` and `/to-tickets` for one feature) in **one unbroken context window**. Each `/ship-ticket` or `/implement` then starts fresh, working from its ticket. `/ship-spec` and `/ship-release` keep shaping in one window and put each ready ticket in its own Herdr session. The limit is the **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**; near it, `/compact` at the nearest phase boundary (see Phase boundaries).

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

- **`/setup-z-yami-coding-skills`** (once per repo) configures the tracker, labels, domain docs, the branching policy (including the pending-release gate), and the surface map.
- **`/surface-map`** keeps `docs/agents/surfaces.md`: each surface of the monorepo, its contracts, and the minimum context it needs from the others. The model reaches for it when a contract changes.
- **`/stack-decision`** picks a surface's framework or a library for a slot, and records an ADR and `docs/agents/stack.md`.
- **`/surface-architecture`** picks how code is organised inside a surface (feature modules, page-based, clean, vertical slices), writes its architecture doc, and enforces the dependency rule with lint (via `/setup-ts-deep-modules` for TypeScript).
- **`/extract-surface`** plans splitting a surface into its own repo from its extraction context.
- **`/software-factory`**: run alongside `/grill-me` when designing automation where agents pick up issues and PRs on their own (triggers, runners, orchestrator, human checkpoints).

## Review

- **`/code-review`** reviews a branch against its base: **Standards** (documented standards, the architecture doc, cross-surface impact) and **Spec**, plus **Security** on risky diffs and **Deep** when you ask. `/implement` and `ticket-flow` run it before the pull request. A release diff gets it again, plus **`/security-review`**, before the tag.
- **`/security-review`**: the exploit-focused security axis on its own. `/ship-release` runs it on the release diff before the tag.
- **`/deep-review`**: the strict maintainability audit on its own; big restructurings it finds become follow-up tickets, not scope creep.
- **`/pr`** shapes every PR body (model-invoked).

## Codebase health and learning

- **`/improve-codebase-architecture`**: in a spare moment, find deepening opportunities and drift from the architecture docs. Picking one generates an idea for `/grill-with-docs`. Also one box on the post-release gate.
- **`/debt`**: harvest `shortcut:` comments into a ledger and issues. One box on the post-release gate.
- **`/learnings`**: solution notes in `docs/solutions/`, written after non-obvious fixes and read before work in the same area (model-invoked). One box on the post-release gate: every non-obvious fix from the release has a note, or the gate says there were none.
- **`/reflect`** and **`/retro`**: boxes on the post-release gate. `/retro` improves the environment (checks, tooling). `/reflect` turns the session's lessons into edits to skills and docs.
- **`/sync-skills`**: replace installed skills from this package with the published version. It refuses a locally edited skill file and does not touch skills from anywhere else. One box on the post-release gate.
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
- **`herdr`**: control the Herdr TUI from inside a pane (`HERDR_ENV=1`). `spec-flow` calls it on the TUI so each ready ticket of a spec gets its own pane. `/ship-spec` and `/ship-release` both reach that procedure. The file is a pinned copy; see `.agents/external-skills.md`.
- **`herdr-core`**: control Herdr Desktop terminals with `hc` (`HC_TERMINAL_ID` is set). `spec-flow` calls it on Desktop so each ready ticket gets its own terminal. Run `hc --skill` for the live flags.
- **`herdr-app`**: show and arrange the Herdr Desktop window. `spec-flow` calls it so those terminals appear in the current tab.
- **`herdr-guide`**: help a human install, learn, or troubleshoot Herdr. Not the skill that drives panes or terminals.

## Precondition

**`/setup-z-yami-coding-skills`**: run before your first engineering flow to configure the issue tracker, labels, doc layout, branching policy, and surface map the other skills assume.
