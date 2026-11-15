---
name: release-flow
description: "Run one release by shipping each feature through spec-flow, landing specs under this session's authority, then test, open the release pull request, and after the user approves tag and write the gate that blocks the next release. Use when the user runs ship-release. Do not start a release the user did not ask for."
---

# Release flow

One release, from an open `release/<N>` branch to a tag on `main`, with a gate that blocks the next release until the human clears it.

`ship-release` is the human door. `/release` is the door onto a single start, finish, or hotfix. If you change a start, finish, or gate step here, change `release` in the same edit. Each feature is `spec-flow`. If you change how one spec is published, sliced, built, or landed, change `spec-flow`, not a second copy here.

**Authority.** `/ship-release` owns the release land. This session lands every ticket and every spec under that authority. The only human land gate is the release pull request into `main`.

Call the Skill tool with "branch-lineage" before any step that creates, lands, or restacks a branch.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-z-yami-coding-skills`.

## 1. Open the cycle

If `docs/agents/pending-release.md` exists and any blocking box is still open (a line matching `- [ ]`), stop. List the open items. The next release waits until the user clears them. A missing file means no gate is pending.

If `release/<N>` does not exist yet, do what `/release start <N>` does:

1. Confirm no other `release/*` is open, or that the user wants two in flight.
2. If `docs/agents/release.md` does not exist, settle versioning, the changelog tool, and deploy surfaces the way `/release` does on its first run, and record the ADR.
3. Cut `release/<N>` from `main`, record `branch.release/<N>.base main`, push it.
4. Set `release/<N>` as the default base in `docs/agents/branching.md`.

## 2. Name the features

Keep this phase in one context window. Publish nothing here, and start no ticket here.

1. Interview until you can name every feature this release ships. Call the Skill tool twice, for "grilling" and "domain-modeling", so the interview also keeps `GLOSSARY.md` and ADRs current. When a question needs a runnable answer, stop and tell the user to detour through `/prototype`. A release that ships two features gets two specs. Keep each feature its own spec, and continue until every named feature has been handed to step 3.
2. For each surface this release touches, read `docs/agents/stack.md` and `docs/agents/architecture/<surface>.md`. Where either is missing, stop and tell the user to run `/stack-decision` or `/surface-architecture` for that surface. Do not invent the choice inside this session. Continue when those docs exist.

## 3. Ship each spec

For each feature, in the order you named them, call the Skill tool with "spec-flow" for that one feature under **release authority**: that run lands its tickets and lands `spec/<issue>` into `release/<N>` without asking the user. Wait until that spec's branch has landed into `release/<N>` before the next feature.

The release is not ready to test while one of its spec branches is still open. A bug found while testing is step 4, not another spec.

## 4. Test and review, before the pull request

On `release/<N>`, against `main`:

1. Run the full test suite. A failure becomes a bug ticket whose `**Base:**` is `release/<N>`, or an escalate when you cannot choose.
2. Call the Skill tool with "code-review", fixed point `main`.
3. Call the Skill tool with "security-review" on the same diff.

Do not stop for a separate human-testing gate. The release pull request in step 5 is the human review of the release.

A bug found here is a ticket whose `**Base:**` is `release/<N>`. It does not get a spec branch. It is not a hotfix. Publish that ticket, then open it with the same child-session procedure as `spec-flow` ([`CHILD-SESSIONS.md`](../spec-flow/CHILD-SESSIONS.md)): sibling child tabs, max 6 per tab, 2×3 grid, never the parent tab. **Steer** that session with the same loop as `spec-flow`: do not wait only on status; while the child is `working` or `blocked`, `hc read` (or herdr agent read) every few seconds; on "Run this command?", "Not in allowlist", or "Waiting for approval", `hc keys <t> y` immediately (run once; one `y` per queued approval; read again); escalate to the human in this session only for a doc break or unsettled breaking change. When its pull request is open and CI is green, tell it to land, then retire the child pane per that procedure. Then return to this step.

## 5. Finish

1. **Freeze.** Every open issue whose lineage reaches `release/<N>` has landed, or its `Base:` now names a later release. Stop while that list is non-empty.
2. **Version and changelog.** Call the Skill tool with "changelog" in **compile** mode for `release/<N>`.
3. **Write the gate** on the release branch, boxes open, by copying `pending-release.md` from the `release` skill's directory. Commit it with the version bump.
4. **Release pull request** into `main`. Call the Skill tool with "pr". The evidence is the compiled changelog and the green CI run. Tell the user to review it, then stop. This is the only human land gate for `/ship-release`.
5. **After approval:** follow **land** from "branch-lineage" with a merge commit. Never squash a release.
6. **Tag and publish.** Tag the merge commit on `main` (`v<version>`), push the tag, and publish notes from the new `CHANGELOG.md` section. If the project deploys from tags, say so before pushing the tag.
7. **Retire.** Delete `release/<N>` after the tag exists. Reset the default base in `docs/agents/branching.md` to `main`, or to the next open release.

Done when the tag is on `main`, the notes are published, the release branch is gone, the gate file is on `main` with its boxes still open, and you have told the user the next release cannot start until they clear it.

## Pending checklist

Copy `pending-release.md` from the `release` skill's directory to `docs/agents/pending-release.md`. Fill in the version and tag. Leave every box open. That file is the list, including the learnings and debt boxes.

Code review and security review run in step 4 before the release pull request. They are not a second copy of this list.

## Gotchas

- Tag the merge commit on `main`, never a commit that only exists on the release branch.
- Do not clear the gate yourself. The user checks the boxes by doing the work.
- A hotfix is not this flow. Tell the user to run `/release hotfix <tag>`. The pending-release gate does not block a hotfix.
