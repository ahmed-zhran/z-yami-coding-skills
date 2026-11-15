# Branching

How work branches are named, based, reviewed, and landed in this repo. The procedures live in the `branch-lineage` skill; this file holds the policy they read.

## Default base

`main` <!-- `/release start <N>` sets this to `release/<N>`; `/release finish` resets it -->

New specs use this base unless the issue says otherwise. A ticket's base is its spec branch, `spec/<issue>`, not this default. Every issue carries a `**Base:**` line, and every branch mirrors it in `git config branch.<name>.base`.

## Naming

| Kind | Pattern | Base |
|------|---------|------|
| Release | `release/<N>` | `main` |
| Spec | `spec/<issue>` | the open release, or `main` |
| Spec ticket | `ticket/<issue>-<slug>` | `spec/<spec-issue>` |
| Bug ticket | `ticket/<issue>-<slug>` | the open release, a hotfix cut from the production tag, or `main` when no release is open |
| Hotfix | `hotfix/<slug>` | cut from a release tag, lands into `main` |

A spec ticket lands into its spec. A spec lands into its release. A bug ticket lands into the open release, a hotfix cut from the production tag, or `main` when no release is open. There is no feature branch. Git cannot hold `release/1` and `release/1/spec/1` at the same time, so the level is the first path segment and the base is what connects them. Every issue has a `**Base:**` line before work starts. The checked-out branch is not a base.

Long-lived branches: `main`, and any open `release/<N>`. They are never force-pushed and never pushed to directly; work reaches them through a PR. Spec branches and ticket branches are deleted when they land.

## Review

- **Mode:** `required`. Every PR waits for a human approval before `/land`.
- **Auto-land labels:** none. <!-- e.g. `docs`: PRs carrying only these labels land without review once CI is green -->

## Landing

- **Update strategy:** merge the base into the branch before landing. <!-- or: rebase -->
- **Merge strategy:** squash for tickets; merge commit for specs, releases, and hotfixes.
- **Stacking:** allowed when a ticket needs a blocker's unlanded code. Children are restacked automatically when their base lands.

## Worktrees

One worktree per work branch, under `.worktrees/<branch>` when the harness has no native worktree support. `.worktrees/` is gitignored.

## Pending release gate

`/release finish` and `/ship-release` write `docs/agents/pending-release.md` onto `main` when a release is tagged. `/release start` and `/ship-release` refuse to open the next release while any blocking box in that file is open. The file is absent until the first release finished through those skills. Check a box only after that work is done.
