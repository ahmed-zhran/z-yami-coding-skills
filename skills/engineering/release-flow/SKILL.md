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

### Design pack (beta, passive)

Do **not** open a design phase, recommend `/release-ui-design`, or run OpenPencil from this skill. Design is beta and user-opt-in only.

If `docs/agents/releases/<N>/design.md` exists and is **fully approved** (`- [x] Design approved for release/<N>` with Approved by and Date filled), when `spec-flow` / `to-tickets` slices tickets for this release's specs, enrich UI tickets from that pack (screens, states, acceptance). Otherwise (missing or incomplete), ignore design entirely and continue as today. Drafts under `.ui-designs/` alone never apply and never block.

## 2. Name the features

Keep this phase in one context window. Publish nothing here, and start no ticket here.

**Resume.** When every feature already has a published spec whose `**Base:**` is `release/<N>` and tickets are not all landed, skip the interview. Use that feature list and continue at step 3. (An approved design pack may also list those specs; do not invent a design phase to get one.)

Otherwise:

1. Interview until you can name every feature this release ships. Call the Skill tool twice, for "grilling" and "domain-modeling", so the interview also keeps `GLOSSARY.md` and ADRs current. When a question needs a runnable answer, stop and tell the user to detour through `/prototype`. A release that ships two features gets two specs. Keep each feature its own spec, and continue until every named feature has been handed to step 3.
2. For each surface this release touches, read `docs/agents/stack.md` and `docs/agents/architecture/<surface>.md`. Where either is missing, stop and tell the user to run `/stack-decision` or `/surface-architecture` for that surface. Do not invent the choice inside this session. Continue when those docs exist.

## 3. Ship each spec

For each feature, in the order you named them, call the Skill tool with "spec-flow" for that one feature under **release authority**: that run lands its tickets and lands `spec/<issue>` into `release/<N>` without asking the user. Wait until that spec's branch has landed into `release/<N>` before the next feature.

When the design pack for this release is approved, `spec-flow` must attach UI requirements from that pack to every UI-touching ticket it publishes (see the design-pack section in `to-tickets` / `spec-flow`). Logic-only tickets stay unchanged.

The release is not ready to test while one of its spec branches is still open. A bug found while testing is step 4, not another spec.

## 4. Test and review, before the pull request

On `release/<N>`, against `main`:

1. Run the full test suite. A failure becomes a bug ticket whose `**Base:**` is `release/<N>`, or an escalate when you cannot choose.
2. Call the Skill tool with "code-review", fixed point `main`.
3. Call the Skill tool with "security-review" on the same diff.
4. **Human testing (blocking).** Write `docs/releases/<N>/human-testing.md` from the template in the `release` skill directory (`human-testing.md`). Fill it from this release's user stories and acceptance criteria, grouped by every surface the release touches (`docs/agents/surfaces.md`). Each item is a checkbox the human can mark, with a Notes line for fails or observations, plus a Sign-off section (Approved | Blocked). Commit it on `release/<N>`. Open it for the human (interactive markdown preview when available, e.g. Herdr `md-preview`, so checks and notes write back to the file). **Stop** until Sign-off is **Approved** with Approved by and Date filled. The release pull request in step 5 is **not** a substitute for this gate. On **Blocked** or failed checks: publish bug tickets whose `**Base:**` is `release/<N>`, fix or explicitly defer them, refresh the checklist, and do not continue to step 5 until Status is Approved. When the human says testing is done, read the filled file: report unchecked items, fails, and notes before treating Sign-off as valid.

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

Copy `pending-release.md` from the `release` skill's directory to `docs/agents/pending-release.md`. Fill in the version and tag. Leave every box open. That file is the list, including the human-testing feedback box (read `docs/releases/<N>/human-testing.md` into next-release tickets / notes), learnings, debt, `/sync-skills`, and last `/empower-crafting`.

Code review, security review, and human-testing Sign-off run in step 4 before the release pull request. The pending-release human-testing box is the **feedback** pass after the tag, not a second walk of the product.

## Gotchas

- Tag the merge commit on `main`, never a commit that only exists on the release branch.
- Do not clear the gate yourself. The user checks the boxes by doing the work.
- A hotfix is not this flow. Tell the user to run `/release hotfix <tag>`. The pending-release gate does not block a hotfix.
