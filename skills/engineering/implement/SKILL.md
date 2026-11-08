---
name: implement
description: "Implement a piece of work based on a spec or set of tickets, ending in a PR into the ticket's base."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

If the user passes a ticket reference, fetch it from the issue tracker and state its title and its `**Base:**` before starting. If the reference is ambiguous, ask.

Call the Skill tool with "branch-lineage". If you are not already on the ticket's branch (`/start-work` normally puts you there), follow its **start work** procedure first. Never implement a ticket on its base branch.

Before writing code, read what binds the area: `GLOSSARY.md`, ADRs, `docs/agents/stack.md`, and the architecture doc for each surface the ticket touches (`docs/agents/architecture/<surface>.md`). New code goes where the architecture doc says; a dependency for a slot `stack.md` already fills is not added. If you need to break either, stop and ask. Search `docs/solutions/` for notes on the area (call the Skill tool with "learnings").

## The smallest complete change

Take the first option that fully works:

1. Does it need to exist? Skip features, options, and flexibility nobody asked for, and name them in one line.
2. Already in this codebase (a helper, component, pattern)? Use it the way the surrounding code does.
3. Standard library or a platform feature? Use it, unless the project has its own.
4. An installed dependency? Use it. Never add a dependency for a few lines.
5. Otherwise, the minimum code that works.

Be lazy about the solution, never about the change: finish every caller, test, and fixture it breaks. **Never cut** validation at trust boundaries, error handling that prevents data loss, security, or accessibility. A shortcut with a known limit gets a comment `shortcut: <the limit>, <when to upgrade>`, which `/debt` collects later.

## Build

Call the Skill tool with "tdd" where possible, at pre-agreed seams. Logic with a branch, a loop, a parser, money, permissions, or security always leaves at least one test behind.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, call the Skill tool with "code-review" to review the work, with the ticket's base as the fixed point. Fix what it finds.

## Finish

1. If users will notice the change, call the Skill tool with "changelog" in **entry** mode.
2. Commit your work to the ticket's branch.
3. Follow the **open the PR** procedure from "branch-lineage". The PR goes into the recorded base.
4. If `docs/agents/branching.md` sets `review: auto` for one of the ticket's labels and CI is green, follow its **land** procedure. Otherwise stop: tell the user the PR is ready for their review and that `/land <pr>` merges it once approved.

End your report with one or two lines: what you skipped or did not check, and any risk the reviewer should know.
