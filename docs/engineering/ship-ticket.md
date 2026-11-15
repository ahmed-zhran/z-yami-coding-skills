## What it does

`ship-ticket` takes one [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) from its recorded base through a pull request and a merge. You type the issue once.

This door owns the ticket land. The session builds in a fresh worktree, reviews before the pull request, and waits for you only on that merge (unless the branch policy says `review: auto` and CI is green).

## When to reach for it

You invoke this by typing `/ship-ticket`, and the agent won't reach for it on its own.

| You want | Reach for |
| --- | --- |
| One ticket, through its pull request and merge | `/ship-ticket <n>` |
| One phase only | `/start-work`, `/implement`, or `/land` |
| One whole spec through its tickets | [ship-spec](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-spec.md) |
| The whole release | [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) |

## Prerequisites

[setup-z-yami-coding-skills](https://aihero.dev/skills-setup-z-yami-coding-skills) has been run. The issue has a `**Base:**`. Open blockers stop the run unless you say to go ahead.

## Authority

The leading word is **authority**. The ship door you typed owns that level's land gate. Here the door is the ticket, so you approve the ticket pull request. A `/ship-spec` or `/ship-release` session that starts the same procedure lands the ticket itself.

## Common questions

**Does this land a spec or a release?**

No. It lands one ticket into its recorded base. Spec and release branches have their own doors.

## It's working if

- The worktree is cut from the ticket's recorded base.
- After you approve the pull request (or `review: auto` applies), the issue is closed and the branch is gone.

## Where it fits

`ship-ticket` is the **chain step** for one ticket. [ticket-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ticket-flow.md) is the procedure. [ship-spec](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-spec.md) starts that procedure per ready ticket and lands those tickets under spec authority. [ask-yami](https://aihero.dev/skills-ask-yami) routes between them.
