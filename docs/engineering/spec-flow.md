## What it does

`spec-flow` is the procedure behind `/ship-spec`. It publishes or keeps one [spec](https://www.aihero.dev/ai-coding-dictionary/spec), slices that spec's [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket), builds each ready ticket in a fresh [session](https://www.aihero.dev/ai-coding-dictionary/session), lands those tickets under this session's authority, and lands `spec/<issue>` when the door that owns this level approves.

You can type it. A spec you did not ask for is not a reason for the agent to start it. `/ship-spec` is the door you type. `/ship-release` calls this once per feature under release authority.

## When to reach for it

Type `/spec-flow`, or the agent reaches for it when you run `/ship-spec` or when a release is shipping one feature.

Reach for `/to-spec` or `/to-tickets` when you want only that phase. Reach for [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) when every feature, the test, and the tag are the job.

## Prerequisites

The tracker and branching policy from [setup-z-yami-coding-skills](https://aihero.dev/skills-setup-z-yami-coding-skills). Herdr, once a ticket still needs its own session: the TUI (`HERDR_ENV=1`) or Desktop (`HC_TERMINAL_ID`). A spec whose tickets have already landed can land from the session you are in. A spec whose base branch does not exist yet stops until you run `/release start`.

## Authority

The leading idea beside the same procedure is **authority**. `/ship-spec` owns the spec land: this run lands tickets and waits only on the spec pull request. `/ship-release` owns the release land: this run also lands the spec. The publish step matches `/to-spec`. The slice step matches `/to-tickets` without a breakdown wait. Each ticket session runs [ticket-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ticket-flow.md).

## Steer

After a ready ticket has its own session, this run **steers** that session. Shell approvals and questions in the child pane are answered here. You are asked mid-build only when a child would break the docs or make a breaking change the ticket did not settle. Steering reads the child's screen on a short loop, not only when `hc` reports `blocked`, because Cursor allowlist dialogs often keep status as `working`.

## Child sessions

Ticket sessions open in sibling Herdr tabs, not beside the shipping pane. Each child tab holds at most six sessions in a 2×3 grid. When a ticket has landed, that pane closes so the slot frees up. `/ship-release` uses the same packing for bug tickets opened while testing.

Tickets of this spec may only be blocked by other tickets of this same spec (or by none). A **blocker checker** runs on the ticket set before any child session starts. A cross-spec edge is a craft failure: the run removes a false edge, or recrafts the tickets / feature cut / release feature order until the checker passes, then continues.

## Common questions

**Why doesn't it just call `/to-spec` and `/to-tickets`?**

Those are commands only you can invoke. This procedure contains the same publish and slice outcomes so a spec can be shipped without pretending another command fired. If those templates change, this procedure changes in the same edit.

**Why did a ticket pane sit on a shell approval?**

The shipping session is supposed to press through those itself by reading the screen every few seconds and sending run-once `y`. If it waited only on `hc wait` until timeout while "Run this command?" was already up, that run was not steering.

**Why are ticket panes in another tab?**

So the shipping session keeps the whole tab. Children pack into sibling tabs, six to a 2×3 board, and a landed ticket's pane closes instead of sitting empty.

**A ticket was blocked by another spec's ticket. Did the run just stop?**

No. The blocker checker fails that set, then repairs: drop a false edge, or recraft the tickets / feature / release order until every blocker is same-spec or none, then the frontier runs.

## It's working if

- One spec issue is in play, and its branch is `spec/<issue>`.
- A ticket with an open same-spec blocker has no session yet; cross-spec blockers were repaired before the frontier ran.
- The shipping pane's tab has no ticket children; those sit in sibling tabs at most six wide.
- A landed ticket's pane is gone, not an empty shell holding a slot.
- Ticket panes do not wait on you for shell approvals or ticket merges.
- Under `/ship-spec`, after your approval, that spec branch has merged into the release.
- Under `/ship-release`, the spec merges without a separate ask.

## Where it fits

`spec-flow` is the **procedure** for one spec. [ship-spec](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-spec.md) is the door. [release-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/release-flow.md) calls it once per feature under release authority. [ask-yami](https://aihero.dev/skills-ask-yami) is the map.
