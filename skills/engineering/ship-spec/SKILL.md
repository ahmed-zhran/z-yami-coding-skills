---
name: ship-spec
description: "Ship one spec: publish or keep it, build each of its tickets in its own session, and merge the spec into its base after you approve."
argument-hint: "An issue number, or a feature that has no spec yet"
disable-model-invocation: true
---

Ship the one spec the user named. If they named none, ask which feature or issue. If the reference is ambiguous, ask.

Call the Skill tool with "spec-flow" and follow it for that spec. This run has one spec. Do not invent a second procedure.

You approve that spec's ticket breakdown, each ticket's pull request into `spec/<issue>`, and the spec's pull request into its base.
