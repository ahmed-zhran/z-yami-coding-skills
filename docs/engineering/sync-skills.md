## What it does

`sync-skills` replaces the skills you installed from this package with the published version. It shows you the changelog first and updates only after you accept.

An installed skill file from this package is read-only in every other repo. If you edited one locally, this skill stops and shows the diff. It does not merge your edit with the published skill. Skills that came from anywhere else are left alone.

## When to reach for it

You invoke this by typing `/sync-skills`, and the agent won't reach for it on its own.

Reach for it when this package has a version you do not have yet. It is also one box on the post-release [gate](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md): the next release cannot start until you have run it and accepted, or recorded why you are staying on the current version by leaving the box open.

Do not reach for it to change how one repo behaves. That belongs in the repo's `AGENTS.md`, glossary, and ADRs. When a published changelog changed a file this package writes under `docs/agents/`, the skill applies the migration record that shipped with that version. You see each file diff with the changelog, and it is applied only after you accept. The current record updates `docs/agents/branching.md` to the ship levels and keeps that repo's default base, review mode, update strategy, and stacking choice. A later record is the same kind of step, not a special case.

## Prerequisites

The skills were installed from the published `ahmed-zhran/z-yami-coding-skills` package: the marketplace plugin, or `npx skills`. If the skill cannot tell which, it stops. Symlinks into a local checkout (`scripts/link-skills.sh`) are an author link, not a supported install; the skill stops and asks you to install from the remote instead.

## Read-only copies

The leading idea is a **read-only copy**. The coding-skills repo is where a shared skill changes. Publishing, then this command, is how every other repo gets that change. A clinic-only rule that was written into `ask-yami` in the consumer repo is not combined with the new `ask-yami`. You move that rule into the consumer repo's own files, restore the skill, and run this again. After that, the skill is the published one, and the local rule still applies because the agent reads the consumer repo.

## Common questions

**I edited `ask-yami` in my app repo, and this package also changed `ask-yami`. Which one do I get?**

Neither a merge nor the local file. The skill stops, because the installed copy is dirty. The published skill replaces it only after you move the local lines somewhere this command does not own. You keep the local behaviour from that other file, and you get the new `ask-yami` as the skill.

**Will it update skills I installed from other people?**

No. It only replaces skills recorded as installed from this package.

**Will it rewrite files in this repo when the changelog says so?**

It applies the migration records that shipped after your installed version. It does not guess from the changelog sentence. The record shipped now rewrites `docs/agents/branching.md` when that file still describes the old ship levels. You see the diff before anything is written. A record that is already applied does nothing the next time.

**Will it pull a newer Herdr skill from Herdr's own repo?**

No. `herdr` and `herdr-guide` are copies this package publishes. A newer Herdr release is checked in the coding-skills repo against the pins in `.agents/external-skills.md`. After that copy is reviewed and published, this command is how other repos get it.

## It's working if

- You see the changelog, and nothing is written before you accept.
- A locally edited skill from this package is shown as a diff and left in place.
- A skill that did not come from this package is not mentioned and not changed.
- After a clean update, the installed version matches the one you accepted.
- Each due migration record has been applied, or skipped because it was already applied. For the current record, `docs/agents/branching.md` names `spec/<issue>` for a spec ticket, the feature row is gone, and the repo's default base and review mode are unchanged.

## Where it fits

`sync-skills` is **periodic maintenance**, and one blocking box on the gate [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) writes after a tag. It is not setup. Setup records how one repo tracks work. This command updates the shared skills, then applies the migration records that shipped since the installed version. [ask-yami](https://aihero.dev/skills-ask-yami) routes the set.
