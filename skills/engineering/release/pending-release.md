# Pending release actions

Release <version> (<tag>) is on main. The next release cannot start while a blocking box is open. Check a box only after that work is done, in a commit on the default branch.

## Blocking

- [ ] Retro for this release (`/retro`)
- [ ] Reflect: edits to skills or docs from this release, or a one-line note that there were none (`/reflect`)
- [ ] Learnings: every non-obvious fix in this release has a note in `docs/solutions/`, or a one-line note that there were none (`/learnings`)
- [ ] Debt: `docs/debt.md` lists every `shortcut:` comment. Each due item is an issue or explicitly kept (`/debt`)
- [ ] ADRs this release touched, re-read. Mark any the code now violates
- [ ] Architecture drift and deepening (`/improve-codebase-architecture`)
- [ ] Risk and repo-scale note: what got harder to change, and whether any surface should leave the repo (`/extract-surface` only if one should)
- [ ] Human decisions still open, written as questions. Write "none" if there are none
- [ ] Skills update accepted (`/sync-skills`)
