---
name: spec-flow
description: "Ship one spec: publish or keep it, slice its tickets, build each ready ticket in a fresh session, and land spec/<issue> into its base after the user approves. Use when the user runs ship-spec, or when release-flow ships one feature of a release. One feature per run."
---

# Spec flow

One spec, from a usable issue through its tickets to a merged pull request into its base. This run has one spec.

`ship-spec` is the human door. `release-flow` calls this once per feature and waits until that spec has landed before the next feature. `to-spec` and `to-tickets` are the human doors onto publish and slice. They are user-invoked, so this skill contains those outcomes. If you change a template or a slice rule there, change the matching step here in the same edit. `ticket-flow` is what each ticket session runs.

Call the Skill tool with "branch-lineage" before any step that creates, lands, or restacks a branch.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-z-yami-coding-skills`.

## 1. One spec

The caller names an issue, or a feature that has no issue yet.

**An issue was named.** Fetch it. Keep it when the body has `**Base:**`, `**Surfaces:**`, Problem Statement, Solution, User Stories, Implementation Decisions, Testing Decisions, Out of Scope, and Further Notes, the base is the open `release/<N>` (or the base the user names), and the decisions are concrete enough to slice. When a section or the base is missing, say what is missing and stop. This run publishes no second issue.

**No issue was named.** Publish one spec from what is already settled. Do not interview. When the problem, the solution, or the seams are not already in the conversation, stop and tell the user to run `/grill-with-docs`. Explore the repo if you have not. Use the glossary. Read `docs/agents/surfaces.md`, `docs/agents/stack.md`, and each surface's architecture doc when they exist. The base is the default base in `docs/agents/branching.md` (normally the open `release/<N>`), unless the user names another. When that branch does not exist, tell the user to run `/release start <N>` first.

Sketch the seams. Prefer an existing seam, at the highest point you can. Check that choice with the user before publishing.

Publish to the tracker with `ready-for-agent` and a `surface:<name>` label per surface. The body has these sections, in order: `**Base:**`, `**Surfaces:**`, Problem Statement, Solution, User Stories (as an actor, I want, so that; a long numbered list), Implementation Decisions (no file paths; a prototype snippet may be inlined when prose cannot hold the decision), Testing Decisions, Out of Scope, Further Notes. The spec issue's `**Base:**` is where `spec/<issue>` lands, which is the release.

Cut `spec/<issue-number>` from that base when the branch is missing. Record `branch.spec/<issue-number>.base`. Push it. Leave the pull request for step 5.

## 2. Tickets

When this spec already has published tickets whose `**Base:**` is `spec/<issue>`, keep that set. Show the list and continue at step 3.

Otherwise draft tracer-bullet tickets. Each ticket is a narrow complete path through every layer, demoable on its own, and small enough for one fresh context window. Prefactor tickets come first. A wide mechanical change across the codebase is expand, then migrate in batches, then contract, each batch its own ticket. Each ticket records `**Base:** spec/<issue>` (or a blocker's branch when it must stack on unlanded code and `docs/agents/branching.md` allows stacking), `**Surfaces:**`, what it delivers, and what blocks it.

Show one numbered list for this spec. For each ticket show the title, what blocks it, the base, the surfaces, and what it delivers. Wait until the user approves the breakdown. Then publish one issue per ticket, blockers first, with native blocking links where the tracker has them, plus `ready-for-agent` and the surface labels. On a local tracker, one file per ticket. Leave the spec issue open.

## 3. Build the frontier

A ticket is ready when every blocker has landed. Leave a blocked ticket unstarted. A ticket that already has an open pull request into its base is waiting for approval: report that URL and do not start a second session. A ticket that has already landed is done. When every ticket of this spec has landed, continue at step 5.

`/implement-spec` is a different door: one branch and one pull request. This procedure gives each ticket its own session.

When a ready ticket still needs a session, pick one host from the environment and use it for every ticket of this spec.

**TUI.** `HERDR_ENV` is `1`. Call the Skill tool with "herdr". For each ready ticket, open a pane in the current tab and start an agent in a fresh context window whose only task is: call the Skill tool with "ticket-flow" for that issue, and stop when the pull request is open.

**Desktop.** `HC_TERMINAL_ID` is set. Call the Skill tool with "herdr-core", and with "herdr-app" so the person can see the terminal. Run `hc --skill` and `herdr-app --skill` before inventing a flag. For each ready ticket, `herdr-app ls`, then `hc run --bg` in `$PWD`, named `ticket-<issue>` (letters, digits, and hyphens only). Pass `--label herdr.space=<id>` and `--label herdr.tab=<id>` from that listing so the terminal shows in the current tab. Start the same kind of agent this session is, in a fresh context window, with the task in the launch: call the Skill tool with "ticket-flow" for that issue, stop when the pull request is open, and report that URL with `hc send` to `$HC_TERMINAL_ID`. That agent does not land and does not start further agents. If `first_message.sent` is false, read the terminal and send the task once it is ready.

**Neither** variable is set. Stop. Say this session is not inside Herdr TUI or Herdr Desktop. Parallel sessions exist only inside one of those hosts.

When one ticket lands, start the tickets it was blocking.

## 4. You approve each ticket

This session does not land a ticket's pull request. Tell the user the pull request URL and wait. After they approve, tell that session to continue `ticket-flow` from its land step: a message in its Herdr pane, or `hc send` on Desktop. Repeat until every ticket whose base is this `spec/<issue>` has landed.

## 5. Land the spec

When every ticket whose base is this spec has landed, open a pull request from `spec/<issue>` into the spec's recorded base. Tell the user and wait. After they approve, call the Skill tool with "branch-lineage" and follow its **land** procedure with a merge commit. A ticket session never lands the spec.

Done when `spec/<issue>` has landed into its base, the spec issue is closed, and you have reported the merge.
