## What it does

`release-flow` is the procedure behind `/ship-release`. It opens the release branch, names every feature, and calls [spec-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/spec-flow.md) once per feature under release authority. That procedure publishes the [spec](https://www.aihero.dev/ai-coding-dictionary/spec), slices its [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket), builds each ready ticket in its own [session](https://www.aihero.dev/ai-coding-dictionary/session), and lands tickets and the spec without asking you. The only human land gate is the release pull request into `main`.

You can type it. A release you did not ask for is not a reason for the agent to start it. `/ship-release` is the door you type. This skill is what that door runs, and what has to be callable from that door.

## When to reach for it

Type `/release-flow`, or the agent reaches for it when you run `/ship-release`.

Reach for `/release` when you want only to open the branch, only to finish, or a hotfix. Reach for this when the whole cycle, including the [gate](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) after the tag, is the job.

## Prerequisites

The tracker and branching policy from [setup-z-yami-coding-skills](https://aihero.dev/skills-setup-z-yami-coding-skills). Herdr, once a spec's tickets are ready: the TUI (`HERDR_ENV=1`) or Desktop (`HC_TERMINAL_ID`). No open blocking box in `docs/agents/pending-release.md`.

## Authority

The leading idea beside one procedure per feature is **authority**. `/ship-release` owns the release land. Naming the features stays in the session you started. Each feature is then `spec-flow` under release authority: its own ticket list, its own fresh session per ready ticket, and its own landing into the release without a separate ask. Bug tickets opened while testing use the same **steer** loop (screen reads every few seconds; Cursor allowlist dialogs often stay `working`). The next feature starts after that merge. Those ticket sessions know the ticket, not the whole release conversation.

Stack and architecture docs that are missing stop the run. The skill tells you which command to type. It does not pick a framework or a folder layout for you.

## Common questions

**Why doesn't it just call `/to-spec`, `/to-tickets`, and `/ship-spec`?**

`/to-spec`, `/to-tickets`, and `/ship-spec` are commands only you can invoke. This procedure calls `spec-flow`, which holds the same publish, slice, and land steps. If those templates change, `spec-flow` changes in the same edit.

**Do I approve ticket or spec pull requests?**

No. Release authority lands those. You approve the release pull request into `main`.

## It's working if

- Features ship one at a time. The next spec starts after `spec/<issue>` has merged into the release.
- A ticket with an open blocker has no pane yet.
- Ticket and spec merges do not wait on you.
- You are asked to approve the release pull request into `main`.
- The tag is on `main`, and the pending-release file on `main` still has open boxes.

## Where it fits

`release-flow` is the **procedure** for the release chain. [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) is the door. [spec-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/spec-flow.md) is what each feature runs under release authority. [ask-yami](https://aihero.dev/skills-ask-yami) is the map.
