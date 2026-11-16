---
name: sync-skills
description: "Update the skills installed from z-yami-coding-skills. Show the changelog, refuse to overwrite a locally edited skill, and apply the consumer-file migrations that shipped with it."
disable-model-invocation: true
---

# Sync skills

Replace the installed copies of skills that came from `ahmed-zhran/z-yami-coding-skills` with the **published** version on that GitHub repo (marketplace plugin or skills.sh). Then apply every consumer-file migration that shipped after the version they had.

This command never treats a local checkout of the coding-skills repo as the install, and never runs `git pull` there. `scripts/link-skills.sh` is for authors editing the package; it is not a consumer install. If skill entries are symlinks into that checkout, stop and tell the user to remove those package symlinks and install from the remote (plugin or skills.sh), then run this again.

Installed skill files from this package are read-only outside that repo. Change a shared skill in the coding-skills repo, publish it, and run this skill again to pick it up. Do not edit those files in a consumer repo. This skill does not merge a local edit with the published skill. You do not get both in one `SKILL.md`.

Skills that did not come from this package are not yours to touch. Do not list them, diff them, update them, or delete them.

Do not run `npx autoskills`. Do not re-run `/setup-z-yami-coding-skills` unless the user asks. Repo-specific behaviour belongs in that repo's `AGENTS.md`, `GLOSSARY.md`, and ADRs, or in a skill whose name this package does not publish. A file under `docs/agents/` changes only when a migration record names it. Do not infer a file edit from changelog prose.

## 1. Find the install

Work out which one path applies. Do not mix them.

- **Claude Code or Codex plugin** from the `z-yami` marketplace. The plugin bundle is read-only. Version comes from the installed plugin's `plugin.json`.
- **skills.sh** (`skills-lock.json` or `.skill-lock.json` entries whose source is `ahmed-zhran/z-yami-coding-skills`). Those files live in the project or the user skill directory (often `~/.agents/skills`).

If skill directories contain symlinks whose targets resolve into an **author working copy** of this package (a tree that has `scripts/link-skills.sh`, typically maintained outside the Claude plugin marketplace cache and the skills.sh install store), **stop**. That is an author link, not a sync target. Tell them to remove only those package skill symlinks, install with the README remote commands (`claude plugin …` / `codex plugin …` / `npx skills@latest add ahmed-zhran/z-yami-coding-skills`), then run `/sync-skills` again. Do not `git pull` that working copy as the update step. Real files or copies installed by the plugin or skills.sh are fine.

If you cannot tell which supported path applies, say so and stop. Do not guess a command that writes files.

## 2. Refuse a local edit

For each installed skill that belongs to this package:

- If the file is a real file inside a git repo, and `git diff` (including unstaged and staged) shows any change under that skill directory, stop for that skill. Show the diff. Tell the user to move the local lines into `AGENTS.md` or into a skill this package does not publish, restore the skill file, and run this skill again. Do not overwrite it.

A clean install has nothing to restore. Continue.

## 3. Show the changelog

Remember the installed version before you change anything. Read the published changelog since that version (`CHANGELOG.md` on `ahmed-zhran/z-yami-coding-skills`, or `gh release list` / `gh api …/releases` for that repo). The version you would install is the latest published release of this package, not `origin/main` of a local clone. Show what would change, including any skill that is new since they last ran `add`.

Read `migrations/*.md` from the version you would install, not from the consumer's old skill copy. Fetch that directory from the published tag (for example `gh api repos/ahmed-zhran/z-yami-coding-skills/contents/skills/engineering/sync-skills/migrations?ref=vX.Y.Z`). A record is due when its `after` version is greater than or equal to the installed version, and the version you would install is greater than `after`. Compare versions as semver. Skip a record whose "Already applied" test already passes.

Show the diff each due record would make. Stop and wait. Update skills and apply records only after they accept.

## 4. Update

- Claude Code: `claude plugin update z-yami-coding-skills@z-yami` (marketplace `ahmed-zhran/z-yami-coding-skills` if it is not added yet).
- Codex: `codex plugin update z-yami-coding-skills@z-yami`.
- skills.sh: `npx skills@latest update`. If the changelog contains a skill they do not have installed, tell them to run `npx skills@latest add ahmed-zhran/z-yami-coding-skills` again and take the new names. `update` does not install skills added since `add`.

## 5. Apply due migrations

Apply the records you showed, in filename order. Each record names one consumer path, the template to copy from, the repo choices to keep, and how to tell it is already applied. Keep every listed choice. Replace only what the record says to replace. If the file is missing, write it the way the record says. Fetch templates from the same published tag you installed.

Do not rewrite `AGENTS.md`, `GLOSSARY.md`, or ADRs unless a record names that path. If some other file setup writes is missing a section, name the gap and leave the file.

A record that already passes its "Already applied" test is a no-op. Running this command again does not edit that file a second time.

Tell them the installed version after the update, each file you changed, and that consumer skill files from this package were not merged with anything local.

## Adding a migration

A change that alters a file a consumer repo keeps (anything setup or another skill writes under `docs/agents/`) adds one record in `migrations/` in the same change as its changeset. The next edit does not add a new section to this skill.

Name the file `NNN-slug.md` so filename order is apply order. Frontmatter:

```yaml
after: 1.1.0
path: docs/agents/branching.md
template: skills/engineering/setup-z-yami-coding-skills/branching.md
keep:
  - default base branch
```

`after` is the last published version that does not include the change. `path` is the consumer file. `template` is the file in this package the consumer copy must match. `keep` is the list of repo choices the apply step must not overwrite.

The body says what to replace, what to do when the file is missing, and a line that starts `Already applied when` so a second run can stop. Do not describe the edit only in changelog prose.

## Vendored upstream skills

This command does not refresh skills this package copied from other projects. Those pins live in `.agents/external-skills.md` in the coding-skills repo. When the user asks whether one of them has a new external release, follow that file: compare the pin to the upstream release, show the diff, and wait. Update the copy in the coding-skills repo only after they accept, then publish, then run this command in consumer repos.
