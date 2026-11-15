## What it does

`spec-flow` is the procedure behind `/ship-spec`. It publishes or keeps one [spec](https://www.aihero.dev/ai-coding-dictionary/spec), slices that spec's [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket), builds each ready ticket in a fresh [session](https://www.aihero.dev/ai-coding-dictionary/session), and lands `spec/<issue>` into its base after you approve.

You can type it. A spec you did not ask for is not a reason for the agent to start it. `/ship-spec` is the door you type. `/ship-release` calls this once per feature.

## When to reach for it

Type `/spec-flow`, or the agent reaches for it when you run `/ship-spec` or when a release is shipping one feature.

Reach for `/to-spec` or `/to-tickets` when you want only that phase. Reach for [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) when every feature, the test, and the tag are the job.

## Prerequisites

The tracker and branching policy from [setup-z-yami-coding-skills](https://aihero.dev/skills-setup-z-yami-coding-skills). Herdr, once a ticket still needs its own session: the TUI (`HERDR_ENV=1`) or Desktop (`HC_TERMINAL_ID`). A spec whose tickets have already landed can land from the session you are in. A spec whose base branch does not exist yet stops until you run `/release start`.

## The same procedure

The leading idea is **the same procedure**. The publish step matches `/to-spec`. The slice step matches `/to-tickets`. Each ticket session runs [ticket-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ticket-flow.md). `/ship-release` does not keep a second copy of those steps. It calls this skill once per feature and waits until that spec has landed.

## Common questions

**Why doesn't it just call `/to-spec` and `/to-tickets`?**

Those are commands only you can invoke. This procedure contains the same publish and slice outcomes so a spec can be shipped without pretending another command fired. If those templates change, this procedure changes in the same edit.

## It's working if

- One spec issue is in play, and its branch is `spec/<issue>`.
- A ticket with an open blocker has no session yet.
- After your approval, that spec branch has merged into the release.

## Where it fits

`spec-flow` is the **procedure** for one spec. [ship-spec](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-spec.md) is the door. [release-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/release-flow.md) calls it once per feature. [ask-yami](https://aihero.dev/skills-ask-yami) is the map.
