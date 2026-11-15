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

1. Interview until you can name every feature this release ships. Call the Skill tool twice, for "grilling" and "domain-modeling", so the interview also keeps `GLOSSARY.md` and ADRs current. When a question needs a runnable answer, stop and tell the user to detour through `/prototype`. A release that ships two features gets two specs. Do not fold them into one spec, and do not stop after the first.
2. For each surface this release touches, read `docs/agents/stack.md` and `docs/agents/architecture/<surface>.md`. Where either is missing, stop and tell the user to run `/stack-decision` or `/surface-architecture` for that surface. Do not invent the choice inside this session. Continue when those docs exist.
3. For each feature, one spec. Keep an existing open spec when it is that feature, it has the spec sections, its `**Base:**` is `release/<N>`, and its decisions are concrete enough to slice. If it is not usable, say what is missing and stop. Otherwise publish it. Do not interview again: synthesise what is already settled. Seams: prefer an existing seam, at the highest point you can, and check that choice with the user before publishing. Publish to the tracker with `ready-for-agent` and a `surface:<name>` label per surface. The body has these sections, in order: `**Base:**`, `**Surfaces:**`, Problem Statement, Solution, User Stories (as an actor, I want, so that), Implementation Decisions (no file paths), Testing Decisions, Out of Scope, Further Notes. Cut `spec/<issue-number>` from `release/<N>` when that branch is missing, record the base, and push it. Do not open a pull request for the spec yet.
4. Draft tracer-bullet tickets for every spec. Each ticket is a narrow complete path through every layer, demoable on its own, and small enough for one fresh context window. Prefactor tickets come first. Each ticket records `**Base:** spec/<issue-number>` (or a blocker's branch when it must stack on unlanded code and `docs/agents/branching.md` allows stacking), `**Surfaces:**`, what it delivers, and what blocks it. Show one numbered list grouped by spec, and wait for the user to approve the whole release before publishing. Then publish one issue per ticket, blockers first, with native blocking links where the tracker has them, plus `ready-for-agent` and the surface labels. Do not close the spec issues.

## 3. Build the frontier

A ticket is ready when every blocker has landed. Do not start a blocked ticket. Do not put the tickets on one integration branch. `/implement-spec` is a different door.

Pick one host from the environment and use it for the whole release.

**TUI.** `HERDR_ENV` is `1`. Call the Skill tool with "herdr". For each ready ticket, open a pane in the current tab and start an agent whose only task is: call the Skill tool with "ticket-flow" for that issue, and stop when the pull request is open.

**Desktop.** `HC_TERMINAL_ID` is set. Call the Skill tool with "herdr-core", and with "herdr-app" so the person can see the terminal. Run `hc --skill` and `herdr-app --skill` before inventing a flag. For each ready ticket, `herdr-app ls`, then `hc run --bg` in `$PWD`, named `ticket-<issue>` (letters, digits, and hyphens only). Pass `--label herdr.space=<id>` and `--label herdr.tab=<id>` from that listing so the terminal shows in the current tab. Start the same kind of agent this session is, with the task in the launch: call the Skill tool with "ticket-flow" for that issue, stop when the pull request is open, and report that URL with `hc send` to `$HC_TERMINAL_ID`. That agent does not land and does not start further agents. If `first_message.sent` is false, read the terminal and send the task once it is ready.

**Neither** variable is set. Stop. Say this session is not inside Herdr TUI or Herdr Desktop. Parallel sessions exist only inside one of those hosts.

Do not tell a ticket agent to land. When one ticket lands, start the tickets it was blocking.

## 4. You approve each ticket

The parent does not land a ticket's pull request. Tell the user the pull request URL and wait. After they approve, tell that session to continue `ticket-flow` from its land step: a message in its Herdr pane, or `hc send` on Desktop. Repeat until every ticket whose lineage reaches `release/<N>` has landed or been re-based onto a later release.

## 5. Land each spec

When every ticket whose base is `spec/<issue>` has landed, open a pull request from that branch into `release/<N>`. Tell the user and wait. After they approve, land it with a merge commit. A ticket session never lands the spec. Repeat for each spec whose tickets are done. The release is not ready to test while one of its spec branches is still open.

## 6. Test and review, before the tag

On `release/<N>`, against `main`:

1. Run the full test suite. A failure becomes a bug ticket whose `**Base:**` is `release/<N>`, or the user explicitly defers it.
2. Call the Skill tool with "code-review", fixed point `main`.
3. Call the Skill tool with "security-review" on the same diff.
4. Stop for human testing. Ask the user to test the release. Do not continue on your own judgement of "it looks done".

A bug found here is a ticket whose `**Base:**` is `release/<N>`. It does not get a spec branch. It is not a hotfix. Go back to step 3 for that ticket.

## 7. Finish

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

Security review and human testing are step 6's stops. They are not a second copy of this list.

## Gotchas

- Tag the merge commit on `main`, never a commit that only exists on the release branch.
- Do not clear the gate yourself. The user checks the boxes by doing the work.
- A hotfix is not this flow. Tell the user to run `/release hotfix <tag>`. The pending-release gate does not block a hotfix.
