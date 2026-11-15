---
name: release-flow
description: "Run one release from shaping through tickets in separate sessions, human testing, and a tagged merge to main, then write the gate that blocks the next release. Use when the user runs ship-release. Do not start a release the user did not ask for."
---

# Release flow

One release, from an open `release/<N>` branch to a tag on `main`, with a gate that blocks the next release until the human clears it.

`ship-release` is the human door. `/release` is the door onto a single start, finish, or hotfix. If you change a start, finish, or gate step here, change `release` in the same edit. `to-spec` and `to-tickets` are user-invoked, so this skill contains their procedures instead of calling them. If you change those templates, change the publish steps below in the same edit.

Call the Skill tool with "branch-lineage" before any step that creates, lands, or restacks a branch.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-z-yami-coding-skills`.

## 1. Open the cycle

If `docs/agents/pending-release.md` exists and any blocking box is still open (a line matching `- [ ]`), stop. List the open items. The next release waits until the user clears them. A missing file means no gate is pending.

If `release/<N>` does not exist yet, do what `/release start <N>` does:

1. Confirm no other `release/*` is open, or that the user wants two in flight.
2. If `docs/agents/release.md` does not exist, settle versioning, the changelog tool, and deploy surfaces the way `/release` does on its first run, and record the ADR.
3. Cut `release/<N>` from `main`, record `branch.release/<N>.base main`, push it.
4. Set `release/<N>` as the default base in `docs/agents/branching.md`.

## 2. Shape the release

Keep this phase in one context window. Do not start a ticket here.

1. Interview the idea. Call the Skill tool twice, for "grilling" and "domain-modeling", so the interview also keeps `GLOSSARY.md` and ADRs current. When a question needs a runnable answer, stop and tell the user to detour through `/prototype`.
2. For each surface this release touches, read `docs/agents/stack.md` and `docs/agents/architecture/<surface>.md`. Where either is missing, stop and tell the user to run `/stack-decision` or `/surface-architecture` for that surface. Do not invent the choice inside this session. Continue when those docs exist.
3. Publish a spec. Do not interview again. Synthesise what is already settled. Base is `release/<N>` unless the user names another. Seams: prefer an existing seam, at the highest point you can, and check that choice with the user before publishing. Publish to the tracker with `ready-for-agent` and a `surface:<name>` label per surface. The body has these sections, in order: `**Base:**`, `**Surfaces:**`, Problem Statement, Solution, User Stories (as an actor, I want, so that), Implementation Decisions (no file paths), Testing Decisions, Out of Scope, Further Notes.
4. Publish tracer-bullet tickets from that spec. Each ticket is a narrow complete path through every layer, demoable on its own, and small enough for one fresh context window. Prefactor tickets come first. Each ticket records `**Base:**` (the spec's base, unless it must stack on a blocker's unlanded branch and `docs/agents/branching.md` allows stacking), `**Surfaces:**`, what it delivers, and what blocks it. Show the numbered list and wait for the user to approve the breakdown before publishing. Publish one issue per ticket, blockers first, with native blocking links where the tracker has them, plus `ready-for-agent` and the surface labels. Do not close the spec issue.

## 3. Build the frontier

A ticket is ready when every blocker has landed. Do not start a blocked ticket. Do not put the tickets on one integration branch. `/implement-spec` is a different door.

Call the Skill tool with "herdr". If this session is not inside Herdr (`HERDR_ENV` is not `1`), stop and say so. Do not fake parallel sessions another way.

For each ready ticket, open a pane in the current tab and start an agent whose only task is: call the Skill tool with "ticket-flow" for that issue, and stop when the pull request is open. Do not tell that agent to land. When one ticket lands, start the tickets it was blocking.

## 4. You approve each ticket

The parent does not land a pane's pull request. Tell the user the pull request URL and wait. After they approve, tell that pane's agent to continue `ticket-flow` from its land step. Repeat until every ticket whose lineage reaches `release/<N>` has landed or been re-based onto a later release.

## 5. Test and review, before the tag

On `release/<N>`, against `main`:

1. Run the full test suite. Failures become tickets based on this release, or the user explicitly defers them.
2. Call the Skill tool with "code-review", fixed point `main`.
3. Call the Skill tool with "security-review" on the same diff.
4. Stop for human testing. Ask the user to test the release. Do not continue on your own judgement of "it looks done".

A bug found here is an ordinary ticket on `release/<N>`, not a hotfix. Go back to step 3 for it.

## 6. Finish

Only after the user approves the release.

1. **Freeze.** Every open issue whose lineage reaches `release/<N>` has landed, or its `Base:` now names a later release. Stop while that list is non-empty.
2. **Version and changelog.** Call the Skill tool with "changelog" in **compile** mode for `release/<N>`.
3. **Write the gate** on the release branch, boxes open, using the checklist below. Commit it with the version bump.
4. **Release pull request** into `main`. Call the Skill tool with "pr". The evidence is the compiled changelog and the green CI run. Tell the user to review it, then stop.
5. **After approval:** follow **land** from "branch-lineage" with a merge commit. Never squash a release.
6. **Tag and publish.** Tag the merge commit on `main` (`v<version>`), push the tag, and publish notes from the new `CHANGELOG.md` section. If the project deploys from tags, say so before pushing the tag.
7. **Retire.** Delete `release/<N>` after the tag exists. Reset the default base in `docs/agents/branching.md` to `main`, or to the next open release.

Done when the tag is on `main`, the notes are published, the release branch is gone, the gate file is on `main` with its boxes still open, and you have told the user the next release cannot start until they clear it.

## Pending checklist

Write this as `docs/agents/pending-release.md`. Fill in the version and tag. Leave every box open.

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

Security review and human testing are steps 5's stops. They are not a second copy of this list.

## Gotchas

- Tag the merge commit on `main`, never a commit that only exists on the release branch.
- Do not clear the gate yourself. The user checks the boxes by doing the work.
- A hotfix is not this flow. Tell the user to run `/release hotfix <tag>`. The pending-release gate does not block a hotfix.
