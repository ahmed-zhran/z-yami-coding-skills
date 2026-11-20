---
name: setup-z-yami-coding-skills
description: "Configure this repo for the engineering skills: issue tracker, triage labels, domain docs, branch lineage, and the surface map. Run once before first use of the other engineering skills."
disable-model-invocation: true
---

# Setup Z-Yami Coding Skills

Scaffold the per-repo configuration that the engineering skills assume:

- **Issue tracker**: where issues live (GitHub by default; local markdown is also supported out of the box)
- **Triage labels**: the strings used for the five canonical triage roles
- **Domain docs**: where `GLOSSARY.md` and ADRs live, and the consumer rules for reading them
- **Branching**: the branch lineage policy (naming, default base, merge strategy, review mode, stacking)
- **Surfaces**: the monorepo's surface map, and where stack and architecture decisions are recorded

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config`: is this a GitHub repo? Which one?
- `AGENTS.md` at the repo root: does it exist? Is there already an `## Agent skills` section in it?
- `GLOSSARY.md` and `GLOSSARY-MAP.md` at the repo root, and the legacy `CONTEXT.md` / `CONTEXT-MAP.md`. If a legacy file exists, offer to `git mv` it to its `GLOSSARY` name and rewrite those names in `docs/agents/domain.md`.
- `docs/adr/` and any `src/*/docs/adr/` directories
- `docs/agents/`: does this skill's prior output already exist?
- `.scratch/`: a sign that a local-markdown issue tracker convention is already in use
- Is the `triage` skill installed? (a `triage` skill folder alongside this one, or `triage` in your available skills.) This decides whether Section B runs at all.
- Monorepo signals: a `pnpm-workspace.yaml`, a `workspaces` field in `package.json`, `go.work`, a Cargo or melos workspace, or populated `apps/`, `services/`, `packages/` folders with their own build files.
- Branches: `git branch -r`, open `release/*` branches, the latest tag (`git describe --tags --abbrev=0`), and the repo's merge settings (`gh repo view --json mergeCommitAllowed,squashMergeAllowed,rebaseMergeAllowed`).
- `docs/agents/branching.md`, `docs/agents/surfaces.md`, `docs/agents/stack.md`, `docs/agents/architecture/`, `docs/agents/release.md`, `docs/agents/craft-skills-draft.md`, `docs/agents/craft-skills.md`: prior output of this skill or of `surface-map`, `stack-decision`, `surface-architecture`, `release`.

### 2. Present findings and ask

Summarise what's present and what's missing. Then take the sections in order. One section, one answer, then the next.

Lead each section with the recommended answer so the user can accept it in a word. Give a one-line explainer only when the choice genuinely branches; skip the section entirely when exploration already settled it (Section B when `triage` isn't installed, Section E when there's no monorepo).

**Section A: Issue tracker.**

> Explainer: The "issue tracker" is where issues live for this repo. Skills like `to-tickets`, `triage`, and `to-spec` read from and write to it. They need to know whether to call `gh issue create`, write a markdown file under `.scratch/`, or follow some other workflow you describe. Pick the place you actually track work for this repo.

Default posture: these skills were designed for GitHub. If a `git remote` points at GitHub, propose that. If a `git remote` points at GitLab (`gitlab.com` or a self-hosted host), propose GitLab. Otherwise (or if the user prefers), offer:

- **GitHub**: issues live in the repo's GitHub Issues (uses the `gh` CLI)
- **GitLab**: issues live in the repo's GitLab Issues (uses the [`glab`](https://gitlab.com/gitlab-org/cli) CLI)
- **Local markdown**: issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote)
- **Other** (Jira, Linear, etc.): ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose

Record the choice in `docs/agents/issue-tracker.md`. The GitHub and GitLab templates carry a "PRs as a request surface" flag, defaulted **off**. Leave it off and don't raise it: a user who wants external PRs in the triage queue can flip the flag in the file later.

A GitHub or GitLab tracker needs a reachable repo. When the user picks one and no `git remote` points at that host, get the repo URL from them and wire it up (`git init` if needed, `git remote add origin <url>`) before going further. Done when `gh repo view` / `glab repo view` prints the project from inside this directory; if it can't, stop and tell the user what's missing.

**Section B: Triage label vocabulary.** Skip this section entirely if the `triage` skill isn't installed (exploration told you), since an uninstalled skill needs no labels.

If it is installed, ask exactly one question:

> Do you want to keep the default triage labels? (recommended: **yes**)

The defaults are the five canonical roles, each label string equal to its name: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. On **yes**, write them as-is. Only if the user says no, usually because their tracker already uses other names (e.g. `bug:triage` for `needs-triage`), collect the overrides so `triage` applies existing labels instead of creating duplicates.

**Section C: Domain docs.** Default to **single-context** (one `GLOSSARY.md` + `docs/adr/` at the repo root). This fits almost every repo; write it without asking.

Offer **multi-context** (a root `GLOSSARY-MAP.md` pointing to per-context `GLOSSARY.md` files) only when exploration found monorepo signals. Then confirm which layout they want.

**Section D: Branching.** Every work branch records the branch it lands into (its **base**): ticket into spec, spec into release, release into `main`. Propose the defaults from [branching.md](./branching.md) and ask one question per field only where exploration suggests the default is wrong:

- **Default base**: the open `release/*` if there is one, else `main`.
- **Review mode**: `required` (every PR waits for the user's approval; recommended), optionally `auto` for named labels such as `docs`.
- **Merge strategy**: squash for tickets, merge commit for specs, releases, and hotfixes. Match what the repo's merge settings allow.
- **Update strategy**: merge the base into the branch before landing (recommended), or rebase.
- **Stacking**: allowed (recommended) or not.
- **Naming**: `release/<N>`, `spec/<issue>`, `ticket/<issue>-<slug>`. A spec ticket's base is the spec. A bug ticket's base is the open release, a hotfix from the production tag, or `main` when no release is open. Do not record a feature branch. A repo file that still lists one is stale.

Record it in `docs/agents/branching.md`. Keep the pending-release gate section from the template: `release finish` and `ship-release` write `docs/agents/pending-release.md`, and the next release cannot start while a blocking box is open. Add `.worktrees/` and `.guardrails/` to `.gitignore`.

**Section E: Surfaces.** Only when exploration found monorepo signals. Call the Skill tool with "surface-map" to write `docs/agents/surfaces.md` (it asks before writing). Then tell the user which surfaces still have no stack or architecture decision, and that `/stack-decision` and `/surface-architecture` record them, one surface at a time.

### 3. Confirm and edit

Show the user a draft of:

- The `## Agent skills` block to add to `AGENTS.md`
- The contents of `docs/agents/issue-tracker.md`, `docs/agents/domain.md`, `docs/agents/branching.md`, and `docs/agents/triage-labels.md` (the last only when `triage` is installed)

Let them edit before writing.

### 4. Write

Edit `AGENTS.md` at the repo root, creating it if it doesn't exist.

If an `## Agent skills` block already exists in it, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

The block:

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout: "single-context" or "multi-context"]. See `docs/agents/domain.md`.

### Branching

[one-line summary: default base, review mode]. Every issue carries a `**Base:**` line; work never assumes `main`. See `docs/agents/branching.md`.

### Surfaces

[one-line list of surfaces, or "single surface"]. Before working in a surface, read its row in `docs/agents/surfaces.md`, `docs/agents/stack.md`, and its architecture doc under `docs/agents/architecture/`.

### Craft skills

Live coding-craft router at `docs/agents/craft-skills.md` (what `/implement` reads while writing code). Package candidates at `docs/agents/craft-skills-draft.md` (for `/empower-crafting`; sync may refresh the draft only). Not for `tdd` / review: those stay in the implement flow.
```

Include `### Surfaces` only when Section E ran. Always include `### Craft skills` and write both the draft and the live file.

Include the `### Triage labels` sub-block, and write `docs/agents/triage-labels.md`, only when `triage` is installed and Section B ran. When it isn't, both are omitted.

When Section B ran on GitHub or GitLab, create each configured label the tracker lacks (`gh label create` / `glab label create`). When Section E ran, also create one `surface:<name>` label per surface, plus `debt` and `security`.

Then write the docs files using the seed templates in this skill folder as a starting point:

- [issue-tracker-github.md](./issue-tracker-github.md): GitHub issue tracker
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md): GitLab issue tracker
- [issue-tracker-local.md](./issue-tracker-local.md): local-markdown issue tracker
- [triage-labels.md](./triage-labels.md): label mapping (only if `triage` is installed)
- [domain.md](./domain.md): domain doc consumer rules + layout
- [branching.md](./branching.md): branch lineage policy
- [designs.md](./designs.md): external design drop folder (`.designs/release-<N>/`)
- [craft-skills-draft.md](./craft-skills-draft.md): package candidate craft rows for `/empower-crafting` (sync may refresh)
- [craft-skills.md](./craft-skills.md): live approved coding-craft router for `/implement` / `ticket-flow` (seed once; later rewritten only by `/empower-crafting`)

When writing them: always write the draft from its template. Write the live file from its template only when `docs/agents/craft-skills.md` is missing (do not overwrite an existing live file on re-setup). Write `docs/agents/designs.md` from its template when missing. Ensure `.designs/` exists (`.gitkeep` is enough); do not invent per-release subfolders.

For "other" issue trackers, write `docs/agents/issue-tracker.md` from scratch using the user's description.

### 5. Done

Tell the user the setup is complete and which engineering skills will now read from these files. Suggest the next steps that apply: `/release start <N>` if they work in releases, `/stack-decision` and `/surface-architecture` for undecided surfaces, and `/ask-yami` for the map of flows. Mention they can edit `docs/agents/*.md` directly later; re-running this skill is only necessary if they want to switch issue trackers or restart from scratch.
