## What it does

`ticket-flow` is the procedure behind `/ship-ticket`: one [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket), from its own worktree, through tests and review, to a pull request that lands when the door that owns this level approves.

You can type it, and a spec session reaches for it when it starts one ticket. It does not decide that a ticket should start. Something has to name the issue first.

## When to reach for it

Type `/ticket-flow`, or the agent reaches for it when `/ship-ticket` or a spec session is shipping one issue.

Reach for `/ship-ticket` when you are the one starting the ticket. This skill is the procedure that command runs, not a second way to plan the work.

## Prerequisites

The issue tracker and `docs/agents/branching.md` from [setup-z-yami-coding-skills](https://aihero.dev/skills-setup-z-yami-coding-skills). An issue with a base. Open blockers stop the run.

## Authority

The leading idea beside one procedure is **authority**. `/ship-ticket` owns the ticket land. When a parent started this session, that parent owns the ticket land: stop at the open pull request, report the URL, and land only when the parent says so. `/start-work`, `/implement`, and `/land` remain the doors onto single phases. A bug takes the diagnosis path instead of the build path. When a parent named a report address, doc-break questions go there, not to a human at this pane's keyboard.

## Common questions

**Why is this a separate skill from `/ship-ticket`?**

`/ship-ticket` is only for you to type. Another skill is not allowed to invoke it. `spec-flow` has to call a procedure the model is allowed to reach, and this is that procedure. The steps are not a second copy you maintain by hand in the session.

## It's working if

- The worktree's branch is cut from the ticket's recorded base, which is `spec/<issue>` unless the ticket is stacked on a blocker.
- A review runs before the pull request.
- Under `/ship-ticket`, the session waits for you unless that label is allowed to land itself.
- Under a shipping parent, the parent lands the ticket after CI is green.
- After the land, the issue is closed and stacked children name the new base.

## Where it fits

`ticket-flow` is the **procedure** inside the ticket chain step. [ship-ticket](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-ticket.md) is the door you type. [spec-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/spec-flow.md) starts this procedure in a fresh session per ready ticket and lands those tickets under its authority. [ask-yami](https://aihero.dev/skills-ask-yami) is the map.
