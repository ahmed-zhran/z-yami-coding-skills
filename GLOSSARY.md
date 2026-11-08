# Z-Yami Coding Skills

A collection of agent skills (slash commands and behaviors) loaded by Claude Code, Codex, Cursor, and other harnesses. Skills are organized into buckets and consumed by per-repo configuration emitted by `/setup-z-yami-coding-skills`.

## Language

**Issue tracker**:
The tool that hosts a repo's issues: GitHub Issues, Linear, a local `.scratch/` markdown convention, or similar. Skills like `to-tickets`, `to-spec`, and `triage` read from and write to it.
_Avoid_: backlog manager, backlog backend, issue host

**Issue**:
A single tracked unit of work inside an **Issue tracker**: a bug, task, spec, or slice produced by `to-tickets`.
_Avoid_: ticket (use only when quoting external systems that call them tickets, for a **Decision ticket**, or for an issue that gets its own branch, as in `ticket/<n>-<slug>`)

**Decision ticket**:
A `wayfinder` unit: a child **Issue** of a `wayfinder:map` holding a *question* whose resolution is a decision, not a slice of a build to execute. The **decision** qualifier is what keeps it distinct from an implementation ticket; `wayfinder` introduces the term, then uses "ticket".

**Triage role**:
A canonical state-machine label applied to an **Issue** during triage (e.g. `needs-triage`, `ready-for-afk`). Each role maps to a real label string in the **Issue tracker** via `docs/agents/triage-labels.md`.

**Base**:
The branch a piece of work is cut from and lands back into. Recorded on the **Issue** as a `**Base:**` line (canonical) and mirrored in `git config branch.<name>.base`. Any branch can be a base: `main`, a release, a feature, or another ticket.
_Avoid_: parent branch, target branch, upstream (upstream means the tracking remote branch)

**Lineage**:
The chain of **Bases** from a branch down to the default branch, e.g. `ticket/42-x` → `feature/login` → `release/2` → `main`. Owned by `branch-lineage`.

**Long-lived branch**:
The default branch and every open `release/*`. Never pushed to directly; only **Landed** into.

**Land**:
Merge an approved PR into its **Base**, close its **Issue**, **Restack** its children, and remove its worktree and branch. Done by `/land`, or by `/release finish` for a release branch. Opening a PR is not landing.
_Avoid_: promote, ship (ship means released and tagged)

**Restack**:
Move branches whose **Base** just **Landed** onto that base's own base, so their PRs target a branch that still exists.

**Review mode**:
Per repo, in `docs/agents/branching.md`: `required` (a human reviews every PR before `/land`, the default) or `auto` for chosen labels (the agent lands after green CI and review).

**Surface**:
A deployable or publishable unit of a repo (an app, service, worker, or package) with its own stack, architecture, and owners. Recorded in `docs/agents/surfaces.md`.
_Avoid_: module (a module is a unit of code design inside a surface), workspace (the package-manager term)

**Contract**:
What one **Surface** exposes to another: an HTTP API, event schema, shared types package, or database table. A change to a contract has consumers, and `code-review` checks them.

**Extraction context**:
The minimum a **Surface** would need to carry if it moved into its own repo: its contracts, the shared packages it consumes, and the domain terms it uses. Kept in the surface map so `extract-surface` starts from facts.

**Surface architecture**:
How code is organised inside one **Surface** (layered, modular, feature-sliced, clean, page-based, and so on), written to `docs/agents/architecture/<surface>.md` and enforced by lint rules.

**Changelog entry**:
One user-visible change, written when the change is made (a changeset, a conventional commit, or a `.changes/unreleased/` file). Compiled into a version section of `CHANGELOG.md` at release.

**Shortcut**:
A deliberate simplification left in code, marked with a `shortcut:` comment stating what was skipped and when it must be revisited. Harvested into `docs/debt.md` by `/debt`.

**Solution note**:
A short record in `docs/solutions/` of a non-obvious problem, its root cause, and the fix, read before future work in the same area.

## Relationships

- An **Issue tracker** holds many **Issues**
- An **Issue** carries one **Triage role** at a time
- A **Decision ticket** is an **Issue** (a child of a `wayfinder:map`)
- Every work branch has exactly one **Base**; a **Base** can have many children
- A spec's tickets usually share a feature branch as their **Base**; a stacked ticket's **Base** is another ticket
- A **Surface** exposes zero or more **Contracts** and has one **Surface architecture**

## Flagged ambiguities

- "backlog" was previously used to mean both the *tool* hosting issues and the *body of work* inside it. Resolved: the tool is the **Issue tracker**; "backlog" is no longer used as a domain term.
- "backlog backend" / "backlog manager". Resolved: collapsed into **Issue tracker**.
- "promote" was used for merging a branch up one level of its **Lineage**. Resolved: that is **Land**; there is no separate promote step.
- "parent" for branches clashed with parent **Issues** (a spec is the parent of its tickets). Resolved: branches have a **Base**; issues have parents.
