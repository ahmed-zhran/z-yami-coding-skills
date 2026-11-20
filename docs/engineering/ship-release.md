## What it does

`ship-release` runs one release from the idea through a tag on `main`. It names every feature, then ships each one with the same procedure as `/ship-spec` under release authority, and waits until that [spec](https://www.aihero.dev/ai-coding-dictionary/spec) has landed before the next. Each ready [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) is built in its own [session](https://www.aihero.dev/ai-coding-dictionary/session).

It does not run a design phase. Drop external exports under `.designs/release-<N>/` when you want UI built against them; a missing or empty folder means the release ships without design.

This door owns the release land. The shipping session lands every ticket and every spec. You approve only the release pull request into `main`. The tag is not the end of your responsibility. Finishing writes a gate onto `main`. The next release cannot start while a box in that gate is open.

## When to reach for it

You invoke this by typing `/ship-release`, and the agent won't reach for it on its own.

| You want | Reach for |
| --- | --- |
| The whole release, one spec at a time, then the tag and the gate | `/ship-release <N>` |
| UI matched to external exports | Drop files in `.designs/release-<N>/`, then `/ship-release <N>` |
| Only to open the branch, or only to tag | `/release start` or `/release finish` |
| One spec, through its tickets, until it lands in the release | [ship-spec](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-spec.md) |
| One ticket | [ship-ticket](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-ticket.md) |
| Every ticket on one branch and one pull request | [implement-spec](https://aihero.dev/skills-implement-spec) |
| A bug in a version that already shipped | `/release hotfix` |

## Prerequisites

[setup-z-yami-coding-skills](https://aihero.dev/skills-setup-z-yami-coding-skills) has been run in the repo. Once a spec's tickets are ready to build, this session is inside Herdr: the TUI (`HERDR_ENV=1`) or Herdr Desktop (`HC_TERMINAL_ID` set). If it is neither, that spec stops rather than collapsing its tickets onto one branch.

A previous release's `docs/agents/pending-release.md` must have no open blocking box. The first release has no such file, and that is fine.

## The gate

The leading word beside authority is the **gate**. Before the release pull request, the session runs the test suite, a code review, a security review, and **human testing**: it writes `docs/releases/<N>/human-testing.md` from this release's user stories by surface, and stops until Sign-off is Approved. The release PR is not a substitute. After the tag, `docs/agents/pending-release.md` is on `main` with open boxes: human-testing feedback into next-release tickets, retro, reflect, learnings, debt, the ADRs the release touched, architecture drift, a risk and repo-scale note, any decision only a human can make, a skills update (`/sync-skills`), and last **`/empower-crafting`**. Checking a box means that work is done. The next `/ship-release` or `/release start` refuses while one is open.

Tickets that are still blocked do not get a session. When one lands, the tickets it was blocking can start. The shipping session keeps its own tab, packs ticket sessions into sibling tabs (at most six per 2×3 grid), **steers** every pane it opened (screen-read loop for allowlist dialogs that stay `working`), lands lower levels under release authority, and closes finished child panes.

## Common questions

**Does the whole release land as one pull request?**

The tickets and specs land along the way under this session's authority. The one pull request you approve is the release branch into `main`.

**What if this release is two features?**

It ships two specs, one after the other. Each has its own `spec/<issue>` branch and its own tickets. This session lands those. You approve the release pull request after both specs have landed and the release has been tested and reviewed.

**Do I approve ticket or spec pull requests during `/ship-release`?**

No. Release authority covers those. You approve the release pull request into `main`.

**What if Herdr is not running?**

It stops. It will not quietly switch to one shared branch. Open the session inside Herdr and run it again.

## It's working if

- Ready tickets appear in sibling child tabs (not the shipping tab), and blocked tickets do not.
- Ticket and spec panes do not wait on you for merges; the shipping session lands them.
- You are asked to approve the release pull request into `main`, then the tag lands.
- After the tag, `docs/agents/pending-release.md` is on `main` and its boxes are still open.
- Starting the next release, before those boxes are checked, stops and lists them.

## Where it fits

`ship-release` is the **chain** for a release: name the features, run [ship-spec](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-spec.md) once per feature under release authority, then test, open the release pull request, and write the gate. `/release` remains the door for one of those phases, or for a hotfix. [ask-yami](https://aihero.dev/skills-ask-yami) routes between them.
