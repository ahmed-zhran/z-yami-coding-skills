## What it does

`ship-release` runs one release from the idea through a tag on `main`. It names every feature, then ships each one with the same procedure as `/ship-spec`, and waits until that [spec](https://www.aihero.dev/ai-coding-dictionary/spec) has landed before the next. Each ready [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) is built in its own [session](https://www.aihero.dev/ai-coding-dictionary/session).

The tag is not the end of your responsibility. Finishing writes a gate onto `main`. The next release cannot start while a box in that gate is open.

## When to reach for it

You invoke this by typing `/ship-release`, and the agent won't reach for it on its own.

| You want | Reach for |
| --- | --- |
| The whole release, one spec at a time, then the tag and the gate | `/ship-release <N>` |
| Only to open the branch, or only to tag | `/release start` or `/release finish` |
| One spec, through its tickets, until it lands in the release | [ship-spec](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-spec.md) |
| One ticket | [ship-ticket](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-ticket.md) |
| Every ticket on one branch and one pull request | [implement-spec](https://aihero.dev/skills-implement-spec) |
| A bug in a version that already shipped | `/release hotfix` |

## Prerequisites

[setup-z-yami-coding-skills](https://aihero.dev/skills-setup-z-yami-coding-skills) has been run in the repo. Once a spec's tickets are ready to build, this session is inside Herdr: the TUI (`HERDR_ENV=1`) or Herdr Desktop (`HC_TERMINAL_ID` set). If it is neither, that spec stops rather than collapsing its tickets onto one branch.

A previous release's `docs/agents/pending-release.md` must have no open blocking box. The first release has no such file, and that is fine.

## The gate

The leading word is the **gate**. Before the tag you test the release yourself, and the release diff gets a security review. After the tag, `docs/agents/pending-release.md` is on `main` with open boxes: retro, reflect, the ADRs the release touched, architecture drift, a risk and repo-scale note, any decision only a human can make, and a skills update. Checking a box means that work is done. The next `/ship-release` or `/release start` refuses while one is open.

Tickets that are still blocked do not get a session. When one lands, the tickets it was blocking can start.

## Common questions

**Does the whole release land as one pull request?**

No. Each ticket has its own pull request into its spec branch, `spec/<issue>`. You approve those one by one. When that spec's tickets have landed, the spec branch has its own pull request into the release. The release pull request into `main` is a separate approval, after the specs have landed and you have tested.

**What if this release is two features?**

It ships two specs, one after the other. Each has its own `spec/<issue>` branch and its own tickets. You approve that spec's ticket list, then its ticket pull requests, then its pull request into the release. The next spec starts after that merge.

**What if Herdr is not running?**

It stops. It will not quietly switch to one shared branch. Open the session inside Herdr and run it again.

## It's working if

- Ready tickets appear in their own panes, and blocked tickets do not.
- Each ticket's pane stops at an open pull request until you approve it.
- After the tag, `docs/agents/pending-release.md` is on `main` and its boxes are still open.
- Starting the next release, before those boxes are checked, stops and lists them.

## Where it fits

`ship-release` is the **chain** for a release: name the features, run [ship-spec](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-spec.md) once per feature, then test, tag, and write the gate. `/release` remains the door for one of those phases, or for a hotfix. [ask-yami](https://aihero.dev/skills-ask-yami) routes between them.
