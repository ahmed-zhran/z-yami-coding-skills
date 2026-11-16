---
name: empower-crafting
description: "Propose complementary coding-craft skills for this repo's stack and release learnings, then rewrite docs/agents/craft-skills.md after you approve the table. Run after stack/architecture changes, and as the last post-release gate box."
disable-model-invocation: true
---

# Empower crafting

Owns the **live** coding-craft router: `docs/agents/craft-skills.md`. Reads package **candidates** from `docs/agents/craft-skills-draft.md` (sync may refresh the draft; this skill never merges sections inside one file).

**Craft skills** fill the gap in the **coding itself** (framework, UI craft, mobile, backend architecture): what would otherwise rely only on the model's general knowledge. They sit between before-code gates (branch, stack/architecture docs) and after-code gates (`tdd`, typecheck, `code-review`, PR). Never put `tdd`, `diagnosing-bugs`, `code-review`, `security-review`, `pr`, or `changelog` in the craft table; `implement` / `ticket-flow` already own those.

`/implement` and `ticket-flow` read only the live craft file. `/sync-skills` must not overwrite the live file.

This is a **post-release gate** door: the last blocking box on `docs/agents/pending-release.md`. Run it after retro, reflect, learnings, debt, ADR pass, architecture, risk note, human decisions, and `/sync-skills`, so the proposal can use what those steps wrote.

## Modes

- **Post-release (default when the gate's empower box is open):** full intake below, then propose → approve → install → write live file.
- **Stack / architecture change:** same procedure, scoped to the surfaces that changed; still stop for approval.
- **Audit only:** compare live rows to stack/architecture and post-release evidence; report drift; propose a table only if the user asks to apply.

## 1. Inputs

Read, when present:

**Always**

- `docs/agents/craft-skills-draft.md` (required; if missing, tell the user to run `/setup-z-yami-coding-skills` or `/sync-skills` and stop)
- `docs/agents/craft-skills.md` (current live table, if any)
- `docs/agents/surfaces.md`, `docs/agents/stack.md`, `docs/agents/architecture/*.md`
- ADRs under the repo's ADR path (often `docs/adr/` or as linked from `stack.md`)

**Post-release (and whenever the gate file exists for this release)**

- `docs/agents/pending-release.md` (which boxes are done; confirm earlier boxes are checked before treating this as the last gate step)
- Retro output from `/retro`
- Reflect drafts or landed edits from `/reflect`
- `docs/solutions/` notes from `/learnings`
- `docs/debt.md` from `/debt`
- Bugs that landed this release (tracker / changelog / release PR)
- `docs/releases/<N>/human-testing.md` (unchecked items, fails, Notes, Sign-off summary)
- New or changed lockfile / manifest dependencies and new surfaces since the previous tag
- Architecture drift report if `/improve-codebase-architecture` left one

List skills already installed in this harness. Note which came from `z-yami-coding-skills` vs elsewhere.

## 2. Jobs and conflict rules

Group craft into **jobs** (one winner per job unless the user explicitly allows two):

| Job | Meaning |
| --- | --- |
| ui-taste | Visual / anti-slop production UI |
| frontend-craft | Layout systems, CSS architecture, non-taste frontend craft |
| framework-practice | Framework idioms (React, Flutter, …) |
| module-design | Deep modules / interfaces while writing code |
| mobile | Mobile app craft |
| backend-arch | Service / backend architecture craft |
| data-access | DB / ORM / query craft |
| a11y | Accessibility while building UI |
| browser-verify | Browser check while building UI |

Prefer skills that **compose across different jobs** (e.g. ui-taste + frontend-craft + framework-practice) over two skills that own the same job. Prefer clear license (MIT/Apache) and an obvious maintainer when candidates are equal.

**Post-release lens.** For each pain from retro, learnings, debt, bugs, ADR violations, or architecture drift, name the **craft job** that would have reduced that pain next time, then search for a skill that fills that job. Prefer prevention and sharper craft over restating what `/reflect` already fixed in-repo.

## 3. Propose a table (stop for approval)

From the draft, the stack/architecture, post-release evidence, and marketplace search:

1. Start from every row in the draft that still fits this repo. Drop rows that contradict the stack. Keep or drop freely; say why.
2. Search [skills.sh](https://skills.sh/) and [agenticskills.io](https://agenticskills.io/) for skills that fill empty jobs implied by the stack **and** by post-release pain. Prefer primary listing pages and the skill's own repo README.
3. For each proposed skill, check overlap. If two cover the same job, keep one and list the other under **Rejected (same job)**.

Show the user **one proposal table** and wait. Do not install and do not write the live file until they approve (or edit) this table.

```markdown
## Proposed craft skills

| When the work is… | Call these skills (in order) | Job | Why chosen | Evidence (stack / retro / bug / learning) | Source (package / installed / to install) |
| --- | --- | --- | --- | --- | --- |
| … | `skill-a` | ui-taste | … | … | package default |

### Rejected (same job or poor fit)

| Skill | Job | Why not |
| --- | --- | --- |
| … | … | duplicates ui-taste already covered by design-taste-frontend |

### Install plan (after approval)

- `npx skills@latest add <owner/repo>` … (only rows marked to install)
```

Iterate until the user approves the table (and the install plan).

## 4. Install, then write the live file

1. Run only the approved install commands. If an install fails, stop and report; do not write a live row that names a skill that did not install.
2. **Replace** `docs/agents/craft-skills.md` entirely with the approved live shape below.

```markdown
# Craft skills

Approved coding-craft router for this repo. `/implement` and `ticket-flow` read **only** this file before writing product code.

These skills fill the gap in the **coding itself**. They are not before-code gates and not after-code gates: `tdd`, typecheck, and `code-review` stay in the implement flow.

Written by `/empower-crafting` after approval. To change it, re-run that skill. `/sync-skills` never overwrites this file.

**Rules**

1. Match the ticket (and the surfaces it touches) to every row that applies. One ticket can match several rows.
2. For each matched row, call the Skill tool with each named skill that is **installed** in this harness, then follow that skill while writing code. Do not invent the skill's content when it is missing: skip it and note the miss once.

| When the work is… | Call these skills (in order) | Why |
| --- | --- | --- |
| … | … | … |

After craft skills: continue the implement flow (`tdd` at seams, typecheck/tests, then `code-review`).
```

3. Leave `docs/agents/craft-skills-draft.md` unchanged (package/sync owned).
4. If this run cleared the post-release gate box, check the Empower crafting line in `docs/agents/pending-release.md` and commit that with the live router (and any lockfile / skill-lock changes from installs) on the default branch.

## 5. Done

Tell the user: live file path, skills installed, skills skipped, pains the table addresses, and that `/implement` will load craft skills before `tdd` / review. If earlier gate boxes were still open, say which ones must finish before this box counts as last.

## Audit mode

When the user asks only to check drift: compare live rows to `stack.md` / architecture docs and to post-release evidence. Report missing jobs and stale skills. Propose a new table only if they ask to apply changes; otherwise stop after the report.
