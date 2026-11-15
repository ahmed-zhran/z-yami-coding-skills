---
name: branch-lineage
description: "Branch lineage: every ticket, spec, release, and hotfix branch records its base (the branch it was cut from and lands back into), at any depth. Holds the procedures for resolving a base, starting work in a worktree, landing a branch into its base, and restacking children. Use whenever you create, commit to, open a PR from, merge, or rebase a work branch, or when the user mentions base branch, parent branch, stacked branches, worktrees, landing, or restacking."
---

# Branch Lineage

Work never assumes `main`. Every unit of work has a **base**: the branch it was cut from and the branch it **lands** back into. The ship levels are fixed: a ticket lands into its spec, a spec lands into its release, and a release lands into `main`. A hotfix lands into `main`. A stacked ticket lands into the blocker ticket it needs. Following base links upward from any branch reaches `main`; that chain is the branch's **lineage**.

```text
main
└── release/1                     base: main
    ├── spec/4                    base: release/1
    │   └── ticket/12-rooms       base: spec/4
    │       └── ticket/14-rates   base: ticket/12-rooms   (stacked)
    └── spec/9                    base: release/1
        └── ticket/13-billing     base: spec/9
```

The repo's policy lives in `docs/agents/branching.md` (naming patterns, merge strategy, review mode, stacking). If it is missing, tell the user to run `/setup-z-yami-coding-skills`; until then use the defaults written in this skill.

## Vocabulary

- **Base**: the branch a branch was cut from and lands into. One per branch.
- **Lineage**: the chain of bases from a branch up to `main`.
- **Land**: merge a branch into its base after review, close its issue, and clean up. The same verb at every level: ticket into spec, spec into release, release into `main`.
- **Restack**: after a branch lands, move each open branch that was based on it onto the landed branch's own base, and retarget its PR.
- **Stacked**: a branch whose base is another work branch rather than a long-lived one. Allowed only when it needs code that has not landed yet.
- **Long-lived branch**: `main` and any open `release/<N>`. A spec branch and a ticket branch are short-lived and are deleted when they land.

## Where the base is recorded

Two places, one truth:

1. **The issue body is canonical.** Every spec and ticket carries a line `**Base:** <branch>` near the top. Skills that write issues (`to-spec`, `to-tickets`, `triage`) write it; skills that start work read it.
2. **Git config mirrors it** so tools can read it without the tracker: `git config branch.<branch>.base <base>`. Write it whenever you create a branch.

When the two disagree, the issue wins: update git config to match and say so.

## Default naming

`docs/agents/branching.md` holds review mode, update strategy, merge strategy, and stacking. These names are fixed even when that file still lists a feature branch. A feature branch is not a ship level.

Git cannot store a branch whose name is a path prefix of another branch. `release/1` and `release/1/spec/1` cannot both exist. The level is the first path segment. The base is what connects them.

| Kind | Pattern | Base |
|------|---------|------|
| Release | `release/<N>` | `main` |
| Spec | `spec/<issue>` | `release/<N>` (or `main` when no release is open) |
| Spec ticket | `ticket/<issue>-<slug>` | `spec/<spec-issue>`, or a blocker ticket when stacked |
| Bug ticket | `ticket/<issue>-<slug>` | the open `release/<N>`, or `hotfix/<slug>` cut from the production tag when it has shipped, or `main` when no release is open |
| Hotfix | `hotfix/<slug>` | the release tag it fixes, and it lands into `main` |

## Procedure: resolve the base

1. Read the issue's `**Base:**` line. If it is missing, stop. Do not use the branch that is checked out, and do not invent a base. A spec's base is written when the spec is published: the open `release/<N>`, or `main` when no release is open. A spec ticket's base is written when the ticket is sliced: `spec/<parent-spec-issue>`, unless it is stacked on a blocker's branch. A bug ticket's base is written when the ticket is created: the open `release/<N>`, or `hotfix/<slug>` cut from the production tag when the bug has shipped, or `main` when no release is open. A bug does not get a spec branch only to hold the fix.
2. Walk the lineage upward (`git config branch.<b>.base` on each step) until `main`, so you know every ancestor.
3. Make sure each ancestor exists on the remote, top-down. A missing `spec/<issue>` is cut from the spec's base and pushed. A missing release branch is a sign to ask the user whether `/release start` was skipped.

Done when you can print the full lineage, every branch in it exists on the remote, and git config matches the issue.

## Procedure: start work

1. Resolve the base (above). Fetch, and fast-forward the local base to its remote.
2. Create the work branch from the base tip and record `branch.<name>.base`.
3. Isolate it in a **worktree**. If you are already inside a linked worktree (`git rev-parse --git-common-dir` differs from `--git-dir`), ask before nesting another. Prefer the harness's native worktree support (a background or cloud agent, `claude --worktree`, a subagent with worktree isolation). Fall back to `git worktree add .worktrees/<branch-name> <branch-name>`, and make sure `.worktrees/` is in `.gitignore`.
4. Copy the untracked files the project needs to run (`.env*` and similar) into the worktree if the harness doesn't, and install dependencies.
5. Claim the issue (assign it to the driving dev, per the tracker doc).

Done when the worktree exists, its branch is cut from the current base tip, git config records the base, and the issue is assigned.

## Procedure: open the PR

1. Push the branch.
2. Open the PR **into the recorded base**, never into `main` unless `main` is the base. Write the body by calling the Skill tool with "pr". Put the closing keyword for the issue in the body only when the base is `main` (GitHub only auto-closes on the default branch); otherwise link it with `Part of #<n>` and let **land** close it.
3. Label it with the issue's surface labels.

## Procedure: land

Precondition: the PR is approved (or `docs/agents/branching.md` sets `review: auto` for one of its labels) and CI is green. If either fails, stop and report; never merge around a red check or a missing review.

1. Update the branch from its base (rebase or merge, per `docs/agents/branching.md`; default: merge the base into the branch). On conflict, call the Skill tool with "resolving-merge-conflicts". Re-run the checks.
2. Merge into the base with the configured strategy (default: squash for tickets, merge commit for specs and releases, so the release keeps a merge for each spec). A policy line that still says "features" means specs.
3. Close the issue the way the tracker doc closes work, with a comment naming the base it landed in.
4. **Restack** (below).
5. Remove the worktree (`git worktree remove`) and delete the branch locally and on the remote. Never delete a long-lived branch here; releases are retired by `/release`.

Done when the PR is merged into the recorded base, the issue is closed, every child is restacked, and no worktree or branch is left behind.

## Procedure: restack

For each open branch whose recorded base is the branch that just landed:

1. Set its base to the landed branch's base (`git config branch.<child>.base <new>`), and update the child issue's `Base:` line.
2. Rebase it onto the new base with `git rebase --onto <new-base> <landed-branch-old-tip> <child>`, so commits already landed are dropped. With a squash merge, this is the step that avoids re-applying them.
3. Force-push with lease, and retarget its PR (`gh pr edit <n> --base <new-base>`).

When the base itself moved (new commits on a release while tickets are open), children do not need restacking; they pick the change up at land time in step 1.

## Gotchas

- GitHub closes issues from `Closes #n` only when the PR merges into the default branch. That is why land closes issues itself.
- A squash merge rewrites history, so a stacked child rebased naively re-applies the parent's commits. Always use `--onto` with the parent's old tip.
- Never force-push a long-lived branch.
- One worktree per branch; git refuses to check out the same branch twice. Run `git worktree prune` if a removed worktree left a stale entry.
