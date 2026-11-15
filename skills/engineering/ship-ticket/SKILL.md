---
name: ship-ticket
description: "Ship one ticket: cut its branch, build it, open a pull request, and merge into its base after you approve."
argument-hint: "An issue number or URL"
disable-model-invocation: true
---

Ship the issue the user passed. If they passed none, ask which one. If the reference is ambiguous, ask.

Call the Skill tool with "ticket-flow" and follow it for that issue. Do not invent a second procedure.

**Authority.** This door owns the ticket land. You approve the pull request into the ticket's base, unless `docs/agents/branching.md` says `review: auto` for that ticket and CI is green. There is no second review after the merge.
