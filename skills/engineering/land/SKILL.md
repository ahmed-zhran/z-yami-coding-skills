---
name: land
description: "After you approve a PR: merge it into its recorded base, close the issue, restack children, and clean up."
argument-hint: "A PR or issue number"
disable-model-invocation: true
---

Land the PR the user passed (an issue number means the open PR that references it). If none was passed, use the PR for the current branch; if there is none, ask.

This is the land phase of `ticket-flow`. `/ship-ticket` runs it after you approve. If you change the steps here, change `ticket-flow` in the same edit.

1. State the PR title, its head branch, its base branch, and the base recorded for the head branch. If the PR's base differs from the recorded base, stop and ask which is right before going further.
2. Check the precondition: approved by a human (or `review: auto` applies per `docs/agents/branching.md`) and every required check green. If not, report what is missing and stop. Never merge around a red check.
3. Call the Skill tool with "branch-lineage" and follow its **land** procedure, which includes restacking every branch based on this one.
4. Report: what merged into what, the issue closed, each restacked child with its new base, and whether the base is now ready to land itself (for example, every ticket of a feature landed).

A release branch going into `main` is landed by `/release finish`, which wraps this with versioning and tagging. If the user runs `/land` on a `release/*` branch, tell them to use `/release finish` instead.
