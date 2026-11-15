---
name: ship-release
description: "Ship a whole release: shape it, build each ticket in its own session, test it, and tag it after you approve. The next release waits on the post-release gate."
argument-hint: "A release number, for example 2"
disable-model-invocation: true
---

Ship release `<N>` the user named. If they named none, ask which number.

Call the Skill tool with "release-flow" and follow it. Do not invent a second procedure.

You approve four kinds of stop, and the skill waits at each: the ticket breakdown, each ticket's pull request into `spec/<issue>`, that spec's pull request into the release, and the release itself (tests, security review, your own testing, then the release pull request). The tag happens only after that last approval.

When it finishes, `docs/agents/pending-release.md` is on `main` with open boxes. The next `/ship-release` or `/release start` refuses until you clear them. `/sync-skills` is one of those boxes. Run it yourself. This skill cannot run it for you.
