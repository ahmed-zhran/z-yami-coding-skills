# Branching

How work branches are named, based, reviewed, and landed in this repo. The procedures live in the `branch-lineage` skill; this file holds the policy they read.

## Default base

`main` <!-- `/release start <N>` sets this to `release/<N>`; `/release finish` resets it -->

New specs and tickets use this base unless the issue says otherwise. Every issue carries a `**Base:**` line, and every branch mirrors it in `git config branch.<name>.base`.

## Naming

| Kind | Pattern | Base |
|------|---------|------|
| Release | `release/<N>` | `main` |
| Feature | `feature/<slug>` | a release, or `main` |
| Ticket | `ticket/<issue>-<slug>` | the issue's `Base:` |
| Hotfix | `hotfix/<slug>` | cut from a release tag, lands into `main` |

Long-lived branches: `main`, and any open `release/*`. They are never force-pushed and never pushed to directly; work reaches them through a PR.

## Review

- **Mode:** `required`. Every PR waits for a human approval before `/land`.
- **Auto-land labels:** none. <!-- e.g. `docs`: PRs carrying only these labels land without review once CI is green -->

## Landing

- **Update strategy:** merge the base into the branch before landing. <!-- or: rebase -->
- **Merge strategy:** squash for tickets; merge commit for features, releases, and hotfixes.
- **Stacking:** allowed when a ticket needs a blocker's unlanded code. Children are restacked automatically when their base lands.

## Worktrees

One worktree per work branch, under `.worktrees/<branch>` when the harness has no native worktree support. `.worktrees/` is gitignored.

## Pending release gate

`/release finish` and `/ship-release` write `docs/agents/pending-release.md` onto `main` when a release is tagged. `/release start` and `/ship-release` refuse to open the next release while any blocking box in that file is open. The file is absent until the first release finished through those skills. Check a box only after that work is done.
