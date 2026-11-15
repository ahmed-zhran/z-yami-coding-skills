---
name: spec-flow
description: "Ship one spec: publish or keep it, slice its tickets, build each ready ticket in a fresh session, land those tickets under this session's authority, and land spec/<issue> when the door that owns this level approves. Use when the user runs ship-spec, or when release-flow ships one feature of a release. One feature per run."
---

# Spec flow

One spec, from a usable issue through its tickets to a merged pull request into its base. This run has one spec.

`ship-spec` is the human door. `release-flow` calls this once per feature and waits until that spec has landed before the next feature. `to-spec` and `to-tickets` are the human doors onto publish and slice. They are user-invoked, so this skill contains those outcomes. If you change a template or a slice rule there, change the matching step here in the same edit. `ticket-flow` is what each ticket session runs.

**Authority.** The human door that started the chain owns the land gate for that level. `/ship-spec` owns the spec land: this session lands every ticket pull request, then waits for the user only on the spec pull request into its base. `/ship-release` owns the release land: when `release-flow` calls this, this session also lands the spec pull request itself and reports done. A ticket session never lands the spec.

Call the Skill tool with "branch-lineage" before any step that creates, lands, or restacks a branch.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-z-yami-coding-skills`.

## 1. One spec

The caller names an issue, or a feature that has no issue yet.

**An issue was named.** Fetch it. Keep it when the body has `**Base:**`, `**Surfaces:**`, Problem Statement, Solution, User Stories, Implementation Decisions, Testing Decisions, Out of Scope, and Further Notes, the base is the open `release/<N>` (or the base the user names), and the decisions are concrete enough to slice. When a section or the base is missing, say what is missing and stop. This run publishes no second issue.

**No issue was named.** Publish one spec from what is already settled. Do not interview. When the problem, the solution, or the seams are not already in the conversation, stop and tell the user to run `/grill-with-docs`. Explore the repo if you have not. Use the glossary. Read `docs/agents/surfaces.md`, `docs/agents/stack.md`, and each surface's architecture doc when they exist. The base is the default base in `docs/agents/branching.md` (normally the open `release/<N>`), unless the user names another. When that branch does not exist, tell the user to run `/release start <N>` first.

Sketch the seams. Prefer an existing seam, at the highest point you can. Publish that choice. Escalate to the human in this session only when no seam fits.

Publish to the tracker with `ready-for-agent` and a `surface:<name>` label per surface. The body has these sections, in order: `**Base:**`, `**Surfaces:**`, Problem Statement, Solution, User Stories (as an actor, I want, so that; a long numbered list), Implementation Decisions (no file paths; a prototype snippet may be inlined when prose cannot hold the decision), Testing Decisions, Out of Scope, Further Notes. The spec issue's `**Base:**` is where `spec/<issue>` lands, which is the release.

Cut `spec/<issue-number>` from that base when the branch is missing. Record `branch.spec/<issue-number>.base`. Push it. Leave the pull request for step 5.

## 2. Tickets

When this spec already has published tickets whose `**Base:**` is `spec/<issue>`, keep that set. Show the list. Run the **blocker checker** below on every ticket in the set. Repair until it passes, then continue at step 3.

Otherwise draft tracer-bullet tickets. Each ticket is a narrow complete path through every layer, demoable on its own, and small enough for one fresh context window. Prefactor tickets come first. A wide mechanical change across the codebase is expand, then migrate in batches, then contract, each batch its own ticket. Each ticket records `**Base:** spec/<issue>` (or a same-spec blocker's branch when it must stack on unlanded code and `docs/agents/branching.md` allows stacking), `**Surfaces:**`, what it delivers, and what blocks it. Run the **blocker checker** on the draft before publish. Never create a blocking edge that fails it.

Show one numbered list for this spec. For each ticket show the title, what blocks it, the base, the surfaces, and what it delivers. Publish one issue per ticket, blockers first, with native blocking links where the tracker has them, plus `ready-for-agent` and the surface labels. Only create blocking links the checker accepts. Do not wait for the user to approve the breakdown. On a local tracker, one file per ticket. Leave the spec issue open.

### Blocker checker

For every ticket of this spec, each blocker is either **none**, or **another ticket of this same spec** (`**Base:** spec/<issue>` for this issue, or already landed into this spec). Anything else fails: a blocker on another `spec/<issue>`, on `release/*`, or on `main`.

A fail means the tickets (and maybe the feature cut or the release's feature order) were crafted wrong. **Fix, then continue.** Do not leave a listed fail and build anyway.

1. For each failing edge, decide whether this ticket needs that other ticket's **unlanded** code to deliver its own demo path.
2. **No** (false or soft order): remove the native blocked-by link and any body "Blocked by" line. Soft "comes after feature X" stays prose only.
3. **Yes** (real dependency): the craft is wrong. Recraft until the checker passes: move the shared seam into this spec as ticket(s) of this set, or move this dependent work into the earlier feature's ticket set, or under **release authority** reorder features so the needed spec ships first and re-slice. Feature order across specs is release order, not a cross-spec `blocked_by`.
4. Escalate to the human in this session only when which feature owns the seam, or which feature ships first, is a product choice the docs and settled conversation do not already decide.
5. Re-run the checker. Step 3 starts only on a pass.

## 3. Build the frontier

A ticket is ready when every blocker has landed. Leave a blocked ticket unstarted. A ticket that already has an open pull request into its base is waiting for this session to land it: land it under step 4 and do not start a second session. A ticket that has already landed is done. When every ticket of this spec has landed, continue at step 5.

`/implement-spec` is a different door: one branch and one pull request. This procedure gives each ticket its own session.

When a ready ticket still needs a session, pick one host from the environment and use it for every ticket of this spec. Open, pack, and retire children only through [`CHILD-SESSIONS.md`](CHILD-SESSIONS.md): parent tab stays alone, children live in sibling tabs (max 6 per tab, 2×3 grid), and a finished child's pane is closed so it does not keep a slot.

**TUI.** `HERDR_ENV` is `1`. Follow the TUI path in `CHILD-SESSIONS.md` (Skill tool "herdr").

**Desktop.** `HC_TERMINAL_ID` is set. Follow the Desktop path in `CHILD-SESSIONS.md` (Skill tools "herdr-core" and "herdr-app").

**Neither** variable is set. Stop. Say this session is not inside Herdr TUI or Herdr Desktop. Parallel sessions exist only inside one of those hosts.

**Steer** every ticket session this run started until that session reports its pull request URL or an escalate. Steering is this session's job. The human does not sit in those panes. The generic `hc` / `herdr` manuals say a blocked child needs a person; for children this session started, that person is this session.

Do not wait only on status. Cursor's "Run this command?" / "Not in allowlist" dialog (and "Waiting for approval") often leaves the child status as `working`: the turn does not advance, and `hc wait` sits until its timeout while the dialog is already on screen. While any ticket child is `working` or `blocked`, poll the screen every few seconds (`hc read` / `herdr agent read`). On Desktop you may still use short `hc wait --children any --timeout` check-ins between reads; the read loop is what catches allowlist dialogs. On the TUI use the matching short wait from the herdr skill the same way.

On every read, `blocked`, `error`, timeout check-in, or child report:

1. If the screen shows "Run this command?", "Not in allowlist", or "Waiting for approval": press `hc keys <t> y` (or the matching herdr send-keys) immediately. That is run-once. One `y` clears one queued approval ("Approval 1 of 2"); read again and repeat until the dialog is gone. Do not send shift+tab or choose Run Everything unless the human in this session asks.
2. A question the ticket, the spec, or the docs already answer: answer it in the child's session (`hc send` / `herdr agent prompt`).
3. A change that would break `GLOSSARY.md`, an ADR, `docs/agents/stack.md`, or a surface architecture doc, or a breaking change the ticket did not already settle: that is an **escalate**. Tell the human in *this* session what the child wants, wait for their answer, then relay it to the child.
4. The pull request URL: continue at step 4 for that ticket.

Do not treat `working` as "no person needed" when an approval dialog is on screen. Do not leave a child you started waiting on the human at that pane's keyboard. Do not ask the human to press keys in a child pane.

When one ticket lands, start the tickets it was blocking, and steer those the same way.

## 4. Land each ticket

This session owns every ticket land for this spec. When a ticket's pull request is open, wait until CI is green, then tell that session to continue `ticket-flow` from its land step: a message in its Herdr pane, or `hc send` on Desktop. Do not ask the user to approve a ticket pull request. After that ticket has landed, retire its child pane (and an empty child tab) per `CHILD-SESSIONS.md`. Repeat until every ticket whose base is this `spec/<issue>` has landed.

## 5. Land the spec

When every ticket whose base is this spec has landed, open a pull request from `spec/<issue>` into the spec's recorded base. Wait until CI is green.

- **`/ship-spec` owns this land.** Tell the user the pull request URL and wait. After they approve, call the Skill tool with "branch-lineage" and follow its **land** procedure with a merge commit.
- **`/ship-release` owns this land.** `release-flow` called this run: land the spec yourself with that same **land** procedure. Do not ask the user. Report the merge and continue.

A ticket session never lands the spec.

Done when `spec/<issue>` has landed into its base, the spec issue is closed, and you have reported the merge.
