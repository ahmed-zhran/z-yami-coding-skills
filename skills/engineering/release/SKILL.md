---
name: release
description: "Run the release cycle: start a release branch, finish it with version, changelog and tag, or ship a hotfix from a tag."
argument-hint: "start <N> | finish <N> | hotfix <tag> | hotfix finish"
disable-model-invocation: true
---

# Release

Owns the long-lived release branches and everything that turns landed work into a shipped version. Tickets land into `release/<N>` during the cycle; this skill opens and closes it.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-z-yami-coding-skills`. Call the Skill tool with "branch-lineage" before any step that creates, lands, or restacks a branch: its procedures are the ones used here.

## First run: pick the release tooling

If `docs/agents/release.md` does not exist, settle it before anything else, then write it:

- **Versioning**: semver tags `vX.Y.Z` (default), or calendar versions.
- **Tool**, by ecosystem, recommendation first:
  - JavaScript/TypeScript monorepo: Changesets (entries are `.changeset/*.md` files).
  - Single package, conventional commits already in use: release-please (entries are commit messages).
  - Rust: release-plz.
  - Anything else, or no tool wanted: plain entry files under `.changes/unreleased/<issue>-<slug>.md`, compiled by the `changelog` skill.
- **Deploy surfaces**: which deployables a version covers (from `docs/agents/surfaces.md` when it exists), and whether they version together or separately.

Record the decision as an ADR (call the Skill tool with "domain-modeling" for the format) and point to it from `docs/agents/release.md`.

## `start <N>`

1. **Gate.** If `docs/agents/pending-release.md` exists and any blocking box is still open (a line matching `- [ ]`), stop. List the open items. The next release waits until the user clears them. A missing file means no gate is pending. `/ship-release` uses this same check.
2. Confirm no other `release/*` is open, or that the user wants two in flight.
3. Cut `release/<N>` from `main`, record `branch.release/<N>.base main`, push it.
4. Set `release/<N>` as the default base in `docs/agents/branching.md`, so `to-spec` and `to-tickets` pick it up.
5. Report the branch and the next step: `/grill-with-docs` then `/to-spec` for this release, or `/ship-release <N>` to run the whole cycle.

## `finish <N>`

1. **Freeze.** List every open issue whose lineage reaches `release/<N>`. Each must land or be re-based onto the next release (update its `Base:`). Stop until that list is empty.
2. **Version and changelog.** Call the Skill tool with "changelog" in **compile** mode for `release/<N>`. It bumps the version and writes the `CHANGELOG.md` section on the release branch.
3. **Gate for the next release.** On the release branch, write `docs/agents/pending-release.md` with the checklist below. Fill in the version and tag you are about to cut. Leave every box open. Commit it with the version bump. `/ship-release` writes this same list.
4. **Release PR.** Open a PR from `release/<N>` into `main` (call the Skill tool with "pr"; the evidence section is the compiled changelog and the green CI run). Tell the user to review it, then stop.
5. **When the user confirms approval:** follow the **land** procedure from "branch-lineage" with a merge commit (never squash a release).
6. **Tag and publish.** Tag the merge commit `v<version>`, push the tag, and publish release notes from the new `CHANGELOG.md` section (`gh release create v<version> --notes-file <section>`).
7. **Retire.** Delete `release/<N>` after the tag exists. Reset the default base in `docs/agents/branching.md` to `main` (or the next open release).

Done when the tag is on `main`, the release notes are published, the release branch is gone, the gate file is on `main` with its boxes still open, and no issue still has this release as a base. Tell the user the next `/release start` or `/ship-release` refuses until they clear the boxes.

### Pending checklist

Keep this list identical to the one in `release-flow`.

```markdown
# Pending release actions

Release <version> (<tag>) is on main. The next release cannot start while a blocking box is open. Check a box only after that work is done, in a commit on the default branch.

## Blocking

- [ ] Retro for this release (`/retro`)
- [ ] Reflect: edits to skills or docs from this release, or a one-line note that there were none (`/reflect`)
- [ ] ADRs this release touched, re-read. Mark any the code now violates
- [ ] Architecture drift and deepening (`/improve-codebase-architecture`)
- [ ] Risk and repo-scale note: what got harder to change, and whether any surface should leave the repo (`/extract-surface` only if one should)
- [ ] Human decisions still open, written as questions. Write "none" if there are none
- [ ] Skills update accepted (`/sync-skills`)
```

## `hotfix <tag>`

For a bug in a shipped version.

1. Cut `hotfix/<slug>` from the tag, record its base as `main` (it lands into `main`, not into the tag), push it.
2. Create or update the bug issue with `**Base:** hotfix/<slug>`, then tell the user the next steps: `/start-work <issue>`, then `/diagnosing-bugs`, then review and `/land`.

## `hotfix finish`

1. Confirm every issue based on the hotfix branch has landed into it.
2. Call the Skill tool with "changelog" in **compile** mode with a patch bump.
3. Open the PR from `hotfix/<slug>` into `main`; after the user approves, land it, tag the patch version, and publish notes.
4. **Back-merge** the hotfix into every open `release/*` (a PR per release, landed the normal way), so the next release does not reintroduce the bug.
5. Delete the hotfix branch.

## Gotchas

- Tag the merge commit on `main`, never a commit on the release branch: the tag must be reachable from `main`.
- An unreleased bug (found on `release/<N>` before `finish`) is not a hotfix: it is an ordinary ticket based on `release/<N>`.
- If the project deploys from tags, `finish` step 6 is the deploy. Say so before pushing the tag; it is a one-way door.
- The pending-release gate blocks the next `/release start` and `/ship-release`. It does not block `/release hotfix`. A shipped bug is not the next release. `hotfix finish` does not replace an existing `docs/agents/pending-release.md`. If that file is missing, write the pending checklist for the patch tag so the next release still has a gate.
