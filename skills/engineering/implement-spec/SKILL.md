---
name: implement-spec
description: "Implement the result of /to-spec and /to-tickets in code, on spec/<issue>, ending in one PR into the release."
disable-model-invocation: true
---

You have been provided a spec. This spec should have tickets associated with it, describing how to implement the spec.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-z-yami-coding-skills`.

The goal is the entire spec implemented on `spec/<issue>`, reviewed by the user as one PR into the release, with every ticket resolved when it lands.

The tickets are not a list of steps. They are a **task graph** with blocking relationships between them. This means there is always a **frontier** of tickets which are ready to be grabbed.

Start every subagent with a fresh context window.

Communication to and from subagents should be sparse. Communicate primarily through **context pointers**: to the spec, tickets, research notes, and previous commits. Don't duplicate information already available via pointers.

**Implementer subagents** should be run in the background where possible for maximum concurrency.

Call the Skill tool with "branch-lineage" now: its procedures are the ones every step below uses.

## Steps

1. Read the spec and tickets to understand the task graph. Note the spec's `**Base:**` (for example `release/2`).

2. (optional) Use an **exploration subagent** to conduct any exploration required by the tickets - relevant codebase files, external documentation, the architecture docs of the surfaces involved, and `docs/solutions/`. Ensure the exploration subagent can save files - it should save its markdown notes in a directory outside the repo, accessible by all future subagents. This lets **implementer subagents** focus on implementation rather than exploration.

3. The spec branch is `spec/<issue-number>`, cut from the spec's `**Base:**` (the release). If it already exists, use it. Record that base. Update every ticket's `**Base:**` to `spec/<issue-number>`. After the first merge in step 5, open a draft PR from it into the release (a branch with no commits ahead of its base can't open one), linking the spec and tickets.

4. Use a fresh **implementer subagent** for each ticket, each in its own worktree on its own `ticket/<n>-<slug>` branch cut from `spec/<issue-number>`. Each implementer subagent:
   - confirms its worktree is based on `spec/<issue-number>` before starting, and resets onto it if not;
   - follows the build rules of `implement` (architecture doc, smallest complete change, tests for risky logic), calling the Skill tool with `tdd` to build the ticket;
   - writes its changelog entry if users will notice the change (call the Skill tool with `changelog`);
   - merges the `spec/<issue-number>` tip into its own branch before reporting done.

5. Once an **implementer subagent** completes, merge its work to `spec/<issue-number>` with a **merger subagent**, and close its ticket with a comment naming that branch. Restack any ticket branch that was stacked on it.

6. If this changes the **frontier** of available tickets, kick off more **implementer subagents** to work on the new tickets. This allows for maximum concurrency.

7. Once all tickets are complete, call the Skill tool with `code-review` on `spec/<issue-number>`, with the release as the fixed point. Fix all issues raised by the code review in a single fresh **implementer subagent**.

8. Mark the PR ready for review and tell the user: they review one PR (the whole spec), then run `/land <pr>` to merge `spec/<issue-number>` into the release.

9. Clean up all **implementer subagent** worktrees and ticket branches.
