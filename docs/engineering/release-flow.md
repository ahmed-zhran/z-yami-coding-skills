## What it does

`release-flow` is the procedure behind `/ship-release`. It opens the release branch, shapes the [spec](https://www.aihero.dev/ai-coding-dictionary/spec) and [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) in one [session](https://www.aihero.dev/ai-coding-dictionary/session), builds each ready ticket in its own session, and tags only after you approve.

You can type it. A release you did not ask for is not a reason for the agent to start it. `/ship-release` is the door you type. This skill is what that door runs, and what has to be callable from that door.

## When to reach for it

Type `/release-flow`, or the agent reaches for it when you run `/ship-release`.

Reach for `/release` when you want only to open the branch, only to finish, or a hotfix. Reach for this when the whole cycle, including the [gate](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) after the tag, is the job.

## Prerequisites

The tracker and branching policy from [setup-z-yami-coding-skills](https://aihero.dev/skills-setup-z-yami-coding-skills). Herdr, once tickets are ready: the TUI (`HERDR_ENV=1`) or Desktop (`HC_TERMINAL_ID`). No open blocking box in `docs/agents/pending-release.md`.

## Fresh session per ticket

The leading idea is a **fresh session per ticket**. Shaping stays in the session you started. Building does not. Each ready ticket gets its own context: a TUI pane, or a Desktop terminal shown in the current tab. That context knows the ticket, not the whole release conversation. The orchestrator does not land those pull requests. You do, by approving them.

Stack and architecture docs that are missing stop the run. The skill tells you which command to type. It does not pick a framework or a folder layout for you.

## Common questions

**Why doesn't it just call `/to-spec` and `/to-tickets`?**

Those are commands only you can invoke. This procedure contains the same publish steps so a release can run them without pretending another command fired. If those templates change, this procedure changes in the same edit.

## It's working if

- Every spec this release needs exists, each with a `spec/<issue>` branch, before any pane starts building. A spec ticket's pull request targets that spec branch.
- A ticket with an open blocker has no pane yet.
- The tag is on `main`, and the pending-release file on `main` still has open boxes.

## Where it fits

`release-flow` is the **procedure** for the release chain. [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) is the door. [ticket-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ticket-flow.md) is what each pane runs. [ask-yami](https://aihero.dev/skills-ask-yami) is the map.
