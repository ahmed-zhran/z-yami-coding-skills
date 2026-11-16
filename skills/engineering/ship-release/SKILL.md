---
name: ship-release
description: "Ship a whole release: shape it, build each ticket in its own session, land tickets and specs, and tag it after you approve the release pull request. The next release waits on the post-release gate."
argument-hint: "A release number, for example 2"
disable-model-invocation: true
---

Ship release `<N>` the user named. If they named none, ask which number.

Call the Skill tool with "release-flow" and follow it. Do not invent a second procedure.

This door does **not** run OpenPencil and does **not** start a design phase. Beta design (`/release-ui-design`) runs only when the user explicitly asks for it. If an approved `docs/agents/releases/<N>/design.md` already exists, release-flow may enrich UI tickets from it; missing or incomplete packs are ignored.

**Authority.** This door owns the release land. The shipping session lands every ticket and every spec. You approve only the release pull request into `main`. The tag happens after that approval. Each feature is the same procedure as `/ship-spec` under release authority, one feature at a time. The next feature starts after that spec has landed. Mid-build the session packs ticket panes into sibling child tabs (max six, 2×3), **steers** them: poll the screen every few seconds (Cursor allowlist dialogs often stay `working`, so status-only `hc wait` misses them), clear each with run-once `y`, ask you only for a doc break or an unsettled breaking change, and closes each child's pane after that ticket lands.

Before the release PR and tag, this door writes `docs/releases/<N>/human-testing.md` and stops until the human's Sign-off is **Approved**. The PR is not that gate. When it finishes, `docs/agents/pending-release.md` is on `main` with open boxes (including human-testing feedback into next-release work). The next `/ship-release` or `/release start` refuses until you clear them. `/sync-skills` and then **`/empower-crafting`** (last box) are among them. Run those yourself. This skill cannot run them for you.
