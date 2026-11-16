---
name: release-ui-design
description: "Beta. Open a release through published specs, settle UI in OpenPencil, and write the release design pack only after you approve. Run only when the user explicitly asks for this door or design-before-tickets."
argument-hint: "A release number, for example 2"
disable-model-invocation: true
---

# Release UI design (beta)

**Beta / opt-in.** Do not start this skill, and do not insert a design phase into `/ship-release` or `/ask-yami` what-next, unless the user explicitly asked for `/release-ui-design`, design-before-tickets, or OpenPencil settle for this release. It is not in the plugin. Normal shipping ignores design when no approved pack exists.

Opt-in door for a release that needs settled UI before tickets. It does **not** replace `/ship-release`. It runs the cycle only until specs are published and you approve the design, then writes the pack and stops. You run `/ship-release <N>` to slice tickets, build, land, and tag.

**`docs/agents/releases/<N>/design.md` is written only after you approve.** Until then that path must not exist. When an approved pack is present and the user is using this beta door's handoff, promoted ship skills may enrich UI tickets from it; they must not invent a design phase on their own. Incomplete pack files are ignored (treated as missing), not used as a gate.

**Authority.** This door owns design approval only. Ticket and release land stay with `/ship-release`.

Call the Skill tool with "branch-lineage" before any step that creates a branch. For OpenPencil how-to (CLI, MCP, eval), call the Skill tool with "open-pencil" when that skill is installed; otherwise use `openpencil` CLI (`npm install -g @open-pencil/cli`).

The issue tracker should have been provided to you. If not, tell the user to run `/setup-z-yami-coding-skills`.

Artifact paths and the pack template live in [`ARTIFACTS.md`](ARTIFACTS.md). Read it before writing any design file.

## 1. Open the cycle

Same open as release-flow step 1 for release `<N>`: refuse while `docs/agents/pending-release.md` has an open `- [ ]` box; cut `release/<N>` from `main` when missing; set it as the default base in `docs/agents/branching.md`.

## 2. Name the features

Same interview as release-flow step 2: grill and domain-modeling until every feature this release ships has a name. Publish nothing yet. For each surface touched, require `docs/agents/stack.md` and `docs/agents/architecture/<surface>.md` (tell the user to run `/stack-decision` or `/surface-architecture` when missing).

When `docs/agents/releases/<N>/design.md` already exists (approved pack) and lists the specs on the tracker, skip re-interview and continue at step 3 with that list. While design is still in flight, resume from published specs and `.ui-designs/` drafts; do not invent an unapproved pack file.

## 3. Publish every spec (no tickets)

For each named feature, in order: publish one spec with the `/to-spec` outcome (Problem Statement through Further Notes, `**Base:** release/<N>`, surfaces, `ready-for-agent`). Cut `spec/<issue>` when missing. **Do not** slice or publish tickets. Do not call `spec-flow` (it would continue into tickets).

Done when every named feature has a published spec issue whose base is `release/<N>`, and no ticket of those specs has been published by this run.

## 4. Design phase

### 4.1 UI scope

From each published spec, list the **UI user stories and screens** (routes, states, empty/loading/error). Specs with no user-visible UI are marked **skip design** for the eventual pack. Mixed releases design only the UI-touching specs. Keep this list in the conversation and/or next to the canvases; do **not** write `docs/agents/releases/<N>/design.md` yet.

### 4.2 Durable system docs

Read `docs/agents/ui-design/` when it exists.

- **Exists:** continue those patterns per surface. Do not invent a second system.
- **Missing:** bootstrap from the codebase (CSS variables, fonts, component library, existing screens for the touched surfaces). Write `docs/agents/ui-design/SYSTEM.md` and `docs/agents/ui-design/surfaces/<surface>/` for each touched surface. Shared rules stay in `SYSTEM.md`; surface-only rules stay under that surface.

### 4.3 Settle canvases

For each UI-touching surface, create or update files under `.ui-designs/<surface>/` (committed drafts: `.fig` plus review exports). Prefer prior frames in that folder when they exist.

Use OpenPencil (CLI and/or running app). Typical CLI:

```bash
openpencil info .ui-designs/<surface>/<name>.fig
openpencil tree .ui-designs/<surface>/<name>.fig
openpencil export .ui-designs/<surface>/<name>.fig -f png -o .ui-designs/<surface>/exports/
```

Export enough PNG (or HTML) for human review. Show the exports to the user (Herdr browser pane, OpenPencil desktop, or linked files). Iterate until they approve. **Still do not write** `docs/agents/releases/<N>/design.md`.

### 4.4 Write the pack on approval only

When the user approves, write `docs/agents/releases/<N>/design.md` from the template in `ARTIFACTS.md` in one shot: specs, surfaces, screen list with paths into `.ui-designs/` and `docs/agents/ui-design/`, skip list, and Approval already stamped:

```markdown
## Approval

- [x] Design approved for release/<N>
- Approved by: <user>
- Date: <YYYY-MM-DD>
```

Never leave that file with an empty or unchecked Approval section. If the user rejects or walks away, leave the path absent; drafts stay under `.ui-designs/` and `docs/agents/ui-design/` only.

Commit the pack, `docs/agents/ui-design/` changes, and `.ui-designs/` files on `release/<N>` (or the branch the user names for design work that lands into that release).

## 5. Hand off

Stop. Tell the user:

1. Design pack is approved at `docs/agents/releases/<N>/design.md`.
2. Next door: **`/ship-release <N>`** (tickets enriched from the pack, then build, land, tag).
3. Do not re-run this door unless design must change; if design changes after tickets exist, recraft those tickets before building. To waive design after an approved pack exists, delete `docs/agents/releases/<N>/design.md`.

Done when the approved pack is committed, and you have named `/ship-release <N>` as the next command.
