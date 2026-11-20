# Pending release actions

Release 2.0.0 (v2.0.0) is on main. The next release cannot start while a blocking box is open. Check a box only after that work is done, in a commit on the default branch.

## Blocking

- [ ] Human-testing feedback: read `docs/releases/2.0.0/human-testing.md` (unchecked items, fails, Notes, Sign-off). File tickets or next-release notes for each, or write one line that Sign-off was clean with no leftover notes
- [ ] Retro for this release (`/retro`)
- [ ] Reflect: edits to skills or docs from this release, or a one-line note that there were none (`/reflect`)
- [ ] Learnings: every non-obvious fix in this release has a note in `docs/solutions/`, or a one-line note that there were none (`/learnings`)
- [ ] Debt: `docs/debt.md` lists every `shortcut:` comment. Each due item is an issue or explicitly kept (`/debt`)
- [ ] ADRs this release touched, re-read. Mark any the code now violates
- [ ] Architecture drift and deepening (`/improve-codebase-architecture`)
- [ ] Risk and repo-scale note: what got harder to change, and whether any surface should leave the repo (`/extract-surface` only if one should)
- [ ] Human decisions still open, written as questions. Write "none" if there are none
- [ ] Skills update accepted (`/sync-skills`)
- [ ] Empower crafting: review draft + stack/architecture + this release's retro, reflect, learnings, debt, ADRs, bugs, human-testing feedback, and dependency/surface changes; approve the craft-skills table; rewrite `docs/agents/craft-skills.md` (`/empower-crafting`)
