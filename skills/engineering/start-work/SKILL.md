---
name: start-work
description: "Start a ticket: cut its branch from the recorded base and open it in its own worktree."
argument-hint: "An issue number or URL"
disable-model-invocation: true
---

Start work on the issue the user passed. If they passed none, ask which one; if the reference is ambiguous, ask.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-z-yami-coding-skills`.

1. Fetch the issue and state its title and its `**Base:**` line. If it has open blockers, list them and stop unless the user says to go ahead (a blocker that is still open means its code may not exist yet).
2. Call the Skill tool with "branch-lineage" and follow its **resolve the base** and **start work** procedures.
3. Report the worktree path, the branch, its full lineage, and the next step: `/implement <issue>` inside that worktree (or `/diagnosing-bugs` for a bug).

Done when the user can open the worktree and run `/implement` without touching git.
