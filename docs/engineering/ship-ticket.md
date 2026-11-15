## What it does

`ship-ticket` takes one [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) from a branch cut off its base through to a merged pull request. You type it once. It builds, opens the pull request, and waits.

The review that can still block the merge happens before the merge. After you approve, it lands the pull request, closes the issue, and restacks anything stacked on it. There is no second review of a ticket that has already merged.

## When to reach for it

You invoke this by typing `/ship-ticket`, and the agent won't reach for it on its own.

| You want | Reach for |
| --- | --- |
| One ticket, from branch to merge, including the stop for your approval | `/ship-ticket <n>` |
| Only the branch, or only the build, or only the merge | `/start-work`, `/implement`, or `/land` |
| Every ticket of a spec on one branch and one pull request | [implement-spec](https://aihero.dev/skills-implement-spec) |
| A whole release, one session per ticket | [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) |

## Prerequisites

[setup-z-yami-coding-skills](https://aihero.dev/skills-setup-z-yami-coding-skills) has configured the issue tracker and `docs/agents/branching.md`. The ticket already exists and names its base. A ticket whose blockers are still open stops here.

## The approval stop

The skill's leading word is the **approval stop**. Building and opening the pull request are not the end. Landing waits until you approve, unless `docs/agents/branching.md` says `review: auto` for that label and CI is green. A release branch is never landed here.

## Common questions

**Does it review the ticket again after the merge?**

No. [code-review](https://aihero.dev/skills-code-review) runs before the pull request, you approve, then it merges. A review after the merge cannot block anything.

**Can the release command start this on its own?**

You type `/ship-ticket`. The release orchestrator does not type it. It runs the same procedure in a fresh [session](https://www.aihero.dev/ai-coding-dictionary/session), one ticket at a time, and still stops for your approval before each merge.

## It's working if

- You can see a pull request into the ticket's recorded base, not into `main`, unless `main` is the base.
- The session stops and asks you to review before anything merges.
- After you approve, the issue is closed and any stacked branch names a new base.

## Where it fits

`ship-ticket` is a **chain step**: the whole ticket, where `/start-work`, `/implement`, and `/land` are the phases inside it. [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) runs that step once per ready ticket, in its own session. When you are unsure which door you want, [ask-yami](https://aihero.dev/skills-ask-yami) routes the set.
