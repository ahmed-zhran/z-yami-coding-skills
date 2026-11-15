---
name: ticket-flow
description: "Run one ticket from its own worktree through a pull request into its recorded base, and land it only after the user approves. Use when ship-ticket is invoked, or when release-flow starts a ticket in a fresh session. Do not start a ticket the user did not ask to ship."
---

# Ticket flow

One ticket, from a branch cut off its base through a merged pull request. Review happens before the merge. Nothing reviews the ticket again after it lands.

`ship-ticket` is the human door onto this procedure. `release-flow` starts it in a fresh session per ticket. `start-work`, `implement`, and `land` are the human doors onto single phases. If you change a phase here, change that door in the same edit.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-z-yami-coding-skills`.

## 1. Fetch

Fetch the issue the caller named. State its title and its `**Base:**` line. If the line is missing, stop. Do not start from the branch that happens to be checked out. If the reference is ambiguous, ask. If blockers are still open, list them and stop, unless the user says to go ahead.

A bug takes the diagnosis path in step 3. The gates after that are the same.

## 2. Start

Call the Skill tool with "branch-lineage" and follow its **resolve the base** and **start work** procedures. Never implement a ticket on its base branch.

## 3. Build

Before writing code, read what binds the area: `GLOSSARY.md`, ADRs, `docs/agents/stack.md`, and the architecture doc for each surface the ticket touches (`docs/agents/architecture/<surface>.md`). New code goes where the architecture doc says. A dependency for a slot `stack.md` already fills is not added. If you need to break either, stop and ask. Search `docs/solutions/` for notes on the area (call the Skill tool with "learnings").

Take the first option that fully works:

1. Does it need to exist? Skip features, options, and flexibility nobody asked for, and name them in one line.
2. Already in this codebase (a helper, component, pattern)? Use it the way the surrounding code does.
3. Standard library or a platform feature? Use it, unless the project has its own.
4. An installed dependency? Use it. Never add a dependency for a few lines.
5. Otherwise, the minimum code that works.

Be lazy about the solution, never about the change: finish every caller, test, and fixture it breaks. **Never cut** validation at trust boundaries, error handling that prevents data loss, security, or accessibility. A shortcut with a known limit gets a comment `shortcut: <the limit>, <when to upgrade>`.

Call the Skill tool with "tdd" where possible, at pre-agreed seams. Logic with a branch, a loop, a parser, money, permissions, or security always leaves at least one test behind.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

For a bug, call the Skill tool with "diagnosing-bugs" instead of the build rules above. It still ends in a pull request.

Once done, call the Skill tool with "code-review" with the ticket's base as the fixed point. Fix what it finds. This is the review that can still block the merge.

## 4. Open the pull request

1. If users will notice the change, call the Skill tool with "changelog" in **entry** mode.
2. Commit your work to the ticket's branch.
3. Follow the **open the PR** procedure from "branch-lineage". The pull request goes into the recorded base.

If `docs/agents/branching.md` sets `review: auto` for one of the ticket's labels and CI is green, continue to step 5. Otherwise stop. Tell the user the pull request is ready, and that landing waits for their approval.

End that report with one or two lines: what you skipped or did not check, and any risk the reviewer should know.

## 5. Land

Only after the user approves, or when `review: auto` applies and CI is green.

Do not land a `release/*` branch here. Tell the user that is `/release finish` or `/ship-release`. Do not land a `spec/*` branch here. When every ticket of that spec has landed, the spec pull request into the release is a separate approval.

Call the Skill tool with "branch-lineage" and follow its **land** procedure (merge, close the issue, restack).

If the cause was non-obvious, call the Skill tool with "learnings".

Report what merged into what, the issue closed, each restacked child with its new base, and whether the base is now ready to land itself.
