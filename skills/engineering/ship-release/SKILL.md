---
name: ship-release
description: "Ship a whole release: shape it, build each ticket in its own session, land tickets and specs, and tag it after you approve the release pull request. The next release waits on the post-release gate."
argument-hint: "A release number, for example 2"
disable-model-invocation: true
---

Ship release `<N>` the user named. If they named none, ask which number.

Call the Skill tool with "release-flow" and follow it. Do not invent a second procedure.

**Authority.** This door owns the release land. The shipping session lands every ticket and every spec. You approve only the release pull request into `main`. The tag happens after that approval. Each feature is the same procedure as `/ship-spec` under release authority, one feature at a time. The next feature starts after that spec has landed. Mid-build the session **steers** every ticket pane it opened: poll the screen every few seconds (Cursor allowlist dialogs often stay `working`, so status-only `hc wait` misses them), clear each with run-once `y`, and ask you only for a doc break or an unsettled breaking change.

When it finishes, `docs/agents/pending-release.md` is on `main` with open boxes. The next `/ship-release` or `/release start` refuses until you clear them. `/sync-skills` is one of those boxes. Run it yourself. This skill cannot run it for you.
