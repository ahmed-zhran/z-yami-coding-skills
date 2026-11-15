---
name: to-tickets
description: Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the configured tracker (edges as text in one file per ticket locally, or native blocking links on a real tracker).
disable-model-invocation: true
---

# To Tickets

Break a plan, spec, or conversation into a set of **tickets**: tracer-bullet vertical slices, each declaring the tickets that **block** it.

`spec-flow` slices tickets by following this process itself, because this skill is user-invoked and another skill cannot call it. `/ship-spec` and `/ship-release` both reach `spec-flow`. If you change the slice rules or the templates, change the ticket step in `spec-flow` in the same edit.

The issue tracker and triage label vocabulary should have been provided to you. If not, tell the user to run `/setup-z-yami-coding-skills`.

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes a reference (a spec path, an issue number or URL) as an argument, fetch it and read its full body and comments.

### 2. Explore the codebase (optional)

If you have not already explored the codebase, do so to understand the current state of the code. Ticket titles and descriptions should use the project's domain glossary vocabulary, and respect ADRs in the area you're touching. Read `docs/agents/surfaces.md` and the architecture doc of each surface involved: slices follow the surface's architecture (a feature-module surface slices by feature), and a slice that changes a contract names every consumer surface it must update.

Look for opportunities to prefactor the code to make the implementation easier. "Make the change easy, then make the easy change."

### 3. Draft vertical slices

Break the work into **tracer bullet** tickets.

<vertical-slice-rules>

- Each slice cuts a narrow but COMPLETE path through every layer (schema, API, UI, tests): vertical, NOT a horizontal slice of one layer
- A completed slice is demoable or verifiable on its own
- Each slice is sized to fit in a single fresh context window
- Any prefactoring should be done first

</vertical-slice-rules>

Give each ticket its **blocking edges**: the other tickets that must complete before it can start. A ticket with no blockers can start immediately.

**Blocker checker (every ticket, before quiz and again before publish).** Each ticket's blockers are either **none**, or **other tickets of this same spec** (same `**Base:** spec/<spec-issue>`, or another ticket in this breakdown). A blocker whose base is another `spec/<issue>`, a `release/*`, or `main` fails. A fail means the breakdown (or the feature cut, or the release's feature order) is wrong: **fix it, then continue**. Do not publish a failing edge.

- **False or soft order:** drop the edge. Soft "comes after feature X" stays in Further Notes or the body as prose, never as `Blocked by` or a native blocked-by link.
- **Real need for another feature's unlanded code:** recraft until the checker passes: put the shared seam in the earlier spec, move this work into that feature's ticket set, or tell the user the release must ship that feature first under `/ship-release`. Product order across features is **spec order**, not a cross-spec ticket edge.

Re-run the checker after every repair. Quiz and publish run only on a pass.

Give each ticket its **base**: the branch it is cut from and lands into (see the "branch-lineage" skill for the vocabulary). That base is `spec/<spec-issue>`. If the spec has no issue number yet, stop and tell the user to publish it first. If `spec/<spec-issue>` does not exist, cut it from the spec's `**Base:**` and push it. A ticket is **stacked** (based on its blocker's branch) only when it needs the blocker's unlanded code to even start, and `docs/agents/branching.md` allows stacking; otherwise it waits for the blocker to land and shares `spec/<spec-issue>`. Stacking is only onto a blocker that is also a ticket of this same spec. Do not point a ticket at the release.

Give each ticket its **surfaces**: one `surface:<name>` label per surface it touches, from `docs/agents/surfaces.md`.

**Wide refactors are the exception to vertical slicing.** A **wide refactor** is one mechanical change (rename a column, retype a shared symbol) whose **blast radius** fans across the whole codebase, so a single edit breaks thousands of call sites at once and no vertical slice can land green. Don't force it into a tracer bullet; sequence it as **expand–contract**. First expand: add the new form beside the old so nothing breaks. Then migrate the call sites over in batches sized by blast radius (per package, per directory), each batch its own ticket blocked by the expand, keeping CI green batch to batch because the old form still exists. Finally contract: delete the old form once no caller remains, in a ticket blocked by every migrate batch. When even the batches can't stay green alone, keep the sequence but let them share `spec/<spec-issue>`, and have them all block a final integrate-and-verify ticket; green is promised only there.

### 4. Quiz the user

Present the proposed breakdown as a numbered list. For each ticket, show:

- **Title**: short descriptive name
- **Blocked by**: which other tickets (if any) must complete first
- **Base**: the branch it lands into (flag stacked tickets)
- **Surfaces**: the surfaces it touches
- **What it delivers**: the end-to-end behaviour this ticket makes work

Ask the user:

- Does the granularity feel right? (too coarse / too fine)
- Are the blocking edges correct: does each ticket only depend on tickets that genuinely gate it, and only on tickets of this same spec?
- Should any tickets be merged or split further?

Iterate until the user approves the breakdown.

### 5. Publish the tickets to the configured tracker

Publish the approved tickets. **How** depends on the tracker `/setup-z-yami-coding-skills` configured; the tickets are the same either way, only the shape of the blocking edges changes:

- **Local files** → write one file per ticket under `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order (blockers first). Each file's "Blocked by" lists the numbers/titles it depends on. Use the per-ticket file template below: one ticket per file, never a single combined file.
- **A real issue tracker (GitHub, Linear, …)** → publish one issue per ticket in dependency order (blockers first) so each ticket's blocking edges can reference real identifiers. Use the platform's native blocking relationship where it has one; otherwise set each ticket's "Blocked by" to the blocking issues. Run the blocker checker on the set you are about to link; repair until it passes, then link only those same-spec blockers. If the source was an existing issue, make each ticket its sub-issue (tracker doc's operation). Apply the `ready-for-agent` triage label unless instructed otherwise; the tickets are agent-grabbable by construction. Apply each ticket's `surface:<name>` labels. A stacked ticket's `Base:` names the blocker's branch (`ticket/<n>-<slug>`), which exists once the blocker is started.

Each ticket is then worked as `/ship-ticket <n>` (branch, build, review, land), or as the separate doors `/start-work <n>`, `/implement <n>`, review, `/land <pr>`. `/implement-spec` is the other door: one integration branch and one pull request, not one session per ticket.

Work the **frontier**: any ticket whose blockers are all done. For a purely linear chain that means top to bottom.

Do NOT close or modify any parent issue.

<local-ticket-template>

# <NN>: <Ticket title>

**Base:** <branch>

**Surfaces:** <surface names>

**What to build:** the end-to-end behaviour this ticket makes work, from the user's perspective, not a layer-by-layer implementation list.

**Blocked by:** the numbers/titles of the tickets that gate this one, or "None (can start immediately)".

**Status:** ready-for-agent

- [ ] Acceptance criterion 1
- [ ] Acceptance criterion 2

</local-ticket-template>

<issue-template>

**Base:** <branch>

## Parent

A reference to the parent issue on the tracker (if the source was an existing issue, otherwise omit this section).

## What to build

The end-to-end behaviour this ticket makes work, from the user's perspective, not layer-by-layer implementation.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Blocked by

- A reference to each blocking ticket, or "None (can start immediately)". Omit this section when blockers were set as native edges.

</issue-template>

In either form, avoid specific file paths or code snippets: they go stale fast. Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it and note briefly that it came from a prototype. Trim to the decision-rich parts, not a working demo, just the important bits.
