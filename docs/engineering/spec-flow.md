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

After a ready ticket has its own session, this run **steers** that session. Shell approvals and questions in the child pane are answered here. You are asked mid-build only when a child would break the docs or make a breaking change the ticket did not settle.

## Common questions

**Why doesn't it just call `/to-spec` and `/to-tickets`?**

Those are commands only you can invoke. This procedure contains the same publish and slice outcomes so a spec can be shipped without pretending another command fired. If those templates change, this procedure changes in the same edit.

**Why did a ticket pane sit on a shell approval?**

The shipping session is supposed to press through those itself. If it left the pane waiting on you, that run was not steering.

## It's working if

- One spec issue is in play, and its branch is `spec/<issue>`.
- A ticket with an open blocker has no session yet.
- Ticket panes do not wait on you for shell approvals or ticket merges.
- Under `/ship-spec`, after your approval, that spec branch has merged into the release.
- Under `/ship-release`, the spec merges without a separate ask.

## Where it fits

`spec-flow` is the **procedure** for one spec. [ship-spec](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-spec.md) is the door. [release-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/release-flow.md) calls it once per feature under release authority. [ask-yami](https://aihero.dev/skills-ask-yami) is the map.
