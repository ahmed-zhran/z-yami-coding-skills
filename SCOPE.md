# Scope

This repo is the set of skills I (Ahmed) use every day to ship software: planning, branch lineage, implementation, review, release, and learning from each session. It is a personal, curated fork of [mattpocock/skills](https://github.com/mattpocock/skills); see [`UPSTREAM.md`](./UPSTREAM.md).

## What belongs here

- **Engineering flow.** Anything that moves work from an idea to a released, tagged version, through specs, tickets, worktrees, PRs, and releases.
- **Design at three levels.** Project surfaces, stack choices, and code architecture inside a surface.
- **Quality and learning.** Review axes, debt tracking, solution notes, and skill improvement.

## The bar for a change

1. **Observed failure.** Something went wrong in a real session: what was run, what the skill did, what was expected. `/reflect` produces these.
2. **Composes.** If the behaviour composes from existing skills, change those skills rather than adding a new one. A new skill earns its place by being reused across flows (model-invoked) or by being an entry point a human types (user-invoked).
3. **Evaluated.** A changed skill passes `skill-eval` before it merges.

## Already decided

[`.out-of-scope/`](./.out-of-scope/) holds upstream's rejected concepts, kept as reasoning worth respecting. One no longer applies here: `new-skills.md` (this fork adds skills by design). `frozen-misc-skills.md` still describes `misc/`, which is now empty.
