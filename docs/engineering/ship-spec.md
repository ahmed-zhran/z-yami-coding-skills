## What it does

`ship-spec` takes one [spec](https://www.aihero.dev/ai-coding-dictionary/spec) from a usable issue through its [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) until `spec/<issue>` has landed in the release. You type it once per feature.

This door owns the spec land. An existing usable issue is kept. A feature with no issue yet is published from what you already settled. Existing tickets are kept. Each ready ticket is built in its own [session](https://www.aihero.dev/ai-coding-dictionary/session). The shipping session lands every ticket pull request. You approve only the spec pull request into its base.

## When to reach for it

You invoke this by typing `/ship-spec`, and the agent won't reach for it on its own.

| You want | Reach for |
| --- | --- |
| One feature, from spec through its tickets, until the spec lands in the release | `/ship-spec` |
| Only the spec issue, from this conversation | [to-spec](https://aihero.dev/skills-to-spec) |
| Only the ticket list | [to-tickets](https://aihero.dev/skills-to-tickets) |
| One ticket | [ship-ticket](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-ticket.md) |
| Every feature in the release, then the tag | [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) |
| Every ticket of one spec on one branch and one pull request | [implement-spec](https://aihero.dev/skills-implement-spec) |

## Prerequisites

[setup-z-yami-coding-skills](https://aihero.dev/skills-setup-z-yami-coding-skills) has been run in the repo. The spec's base is an open `release/<N>`, unless you name another. Once tickets are ready to build, this session is inside Herdr: the TUI (`HERDR_ENV=1`) or Herdr Desktop (`HC_TERMINAL_ID` set). If it is neither, the skill stops rather than building the tickets in this session.

## Authority

The leading word is **authority**. This door owns the spec land. The shipping session steers every ticket pane (screen-read loop for allowlist dialogs that stay `working`) and lands every ticket. You stop once: the spec pull request into the release. `/ship-release` owns a higher land gate and lands the spec itself.

## Common questions

**I already published the spec and the tickets. What does this do?**

It keeps that issue and that ticket list, then continues at the frontier. Tickets that have landed are left alone. When every ticket of this spec has landed, it opens the spec pull request into the release and waits for you.

**Do I approve each ticket pull request?**

No. This session lands those under spec authority. You approve the spec pull request.

**Why is `/to-spec` still one spec?**

`/to-spec` publishes the feature already settled in this conversation. A second feature is a second conversation, and a second `/to-spec` or a second `/ship-spec`. `/ship-release` is the command that walks every feature in the release.

## It's working if

- The run still has the spec you named. A second spec issue was not opened.
- Ready tickets appear in their own sessions, and blocked tickets do not.
- Ticket panes do not wait on you for shell approvals or ticket merges; the shipping session handles those.
- After you approve the spec pull request, `spec/<issue>` has merged into the release.

## Where it fits

`ship-spec` is the **chain step** for one feature. [ship-ticket](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-ticket.md) is the step inside it. [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) runs this step once per feature under release authority, then opens the release pull request. [ask-yami](https://aihero.dev/skills-ask-yami) routes between them.
