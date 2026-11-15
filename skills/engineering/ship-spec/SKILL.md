---
name: ship-spec
description: "Ship one spec: publish or keep it, build each of its tickets in its own session, land those tickets, and merge the spec into its base after you approve."
argument-hint: "An issue number, or a feature that has no spec yet"
disable-model-invocation: true
---

Ship the one spec the user named. If they named none, ask which feature or issue. If the reference is ambiguous, ask.

Call the Skill tool with "spec-flow" and follow it for that spec under **spec authority**. This run has one spec. Do not invent a second procedure.

**Authority.** This door owns the spec land. The shipping session lands every ticket pull request. You approve only the spec pull request into its base. Mid-build it opens ticket sessions in sibling child tabs (not its own tab), **steers** them: poll the screen every few seconds (Cursor allowlist dialogs often stay `working`, so status-only `hc wait` misses them), clear each with run-once `y`, ask you only for a doc break or an unsettled breaking change, and closes each child's pane after that ticket lands.
