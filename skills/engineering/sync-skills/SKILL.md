---
name: sync-skills
description: "Update the skills installed from z-yami-coding-skills. Show the changelog, refuse to overwrite a locally edited skill, and leave every other skill alone."
disable-model-invocation: true
---

# Sync skills

Replace the installed copies of skills that came from `ahmed-zhran/z-yami-coding-skills` with the published version. Then stop.

Installed skill files from this package are read-only outside that repo. Change a shared skill in the coding-skills repo, publish it, and run this skill again to pick it up. Do not edit those files in a consumer repo. This skill does not merge a local edit with the published skill. You do not get both in one `SKILL.md`.

Skills that did not come from this package are not yours to touch. Do not list them, diff them, update them, or delete them.

Do not run `npx autoskills`. Do not re-run `/setup-z-yami-coding-skills` unless the user asks. Repo-specific behaviour belongs in that repo's `AGENTS.md`, `GLOSSARY.md`, `docs/agents/*`, and ADRs, or in a skill whose name this package does not publish.

## 1. Find the install

Work out which one path applies. Do not mix them.

- **Symlinks into a checkout** of this repo (`scripts/link-skills.sh`). The consumer has no copy of its own. The checkout is the install.
- **Claude Code or Codex plugin** from the `z-yami` marketplace. The plugin bundle is read-only.
- **skills.sh** (`skills-lock.json` entries whose source is `ahmed-zhran/z-yami-coding-skills`). Those files live in the project or the user skill directory.

If you cannot tell, say so and stop. Do not guess a command that writes files.

## 2. Refuse a local edit

For each installed skill that belongs to this package:

- If the file is a symlink into the coding-skills checkout, look at that checkout. Uncommitted edits to skill files there are changes to the package itself. Stop and tell the user to commit or discard them in that repo. Do not pull over a dirty skill file.
- If the file is a real file inside a git repo, and `git diff` (including unstaged and staged) shows any change under that skill directory, stop for that skill. Show the diff. Tell the user to move the local lines into `AGENTS.md` or into a skill this package does not publish, restore the skill file, and run this skill again. Do not overwrite it.

A clean install has nothing to restore. Continue.

## 3. Show the changelog

Read the installed version (plugin manifest, or the lock entry) and the published changelog since that version (`CHANGELOG.md` on `ahmed-zhran/z-yami-coding-skills`, or `gh release list` for that repo). Show the user what would change, including any skill that is new since they last ran `add`.

Stop and wait. Update only after they accept.

## 4. Update

- Symlink checkout: `git pull` in that repo.
- Claude Code: `claude plugin update z-yami-coding-skills@z-yami` (marketplace `ahmed-zhran/z-yami-coding-skills` if it is not added yet).
- Codex: `codex plugin update z-yami-coding-skills@z-yami`.
- skills.sh: `npx skills@latest update`. If the changelog contains a skill they do not have installed, tell them to run `npx skills@latest add ahmed-zhran/z-yami-coding-skills` again and take the new names. `update` does not install skills added since `add`.

## 5. Report setup drift

Re-read `docs/agents/` in the consumer repo. If a section the current setup skill writes is missing (issue tracker, branching, the pending-release rule, domain docs, surfaces in a monorepo), name the gap. Do not rewrite those files. The user edits them, or re-runs setup when they want to.

Tell them the installed version after the update, and that consumer skill files from this package were not merged with anything local.

## Vendored upstream skills

This command does not refresh skills this package copied from other projects. Those pins live in `.agents/external-skills.md` in the coding-skills repo. When the user asks whether one of them has a new external release, follow that file: compare the pin to the upstream release, show the diff, and wait. Update the copy in the coding-skills repo only after they accept, then publish, then run this command in consumer repos.
