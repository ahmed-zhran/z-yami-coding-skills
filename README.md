# Z-Yami Coding Skills

Agent skills for real engineering, not vibe coding. A hard fork of [mattpocock/skills](https://github.com/mattpocock/skills), extended for how I ship. The site is [yami-coding](https://ahmed-zhran.github.io/yami-coding).

- **Branch lineage at any depth.** Every spec and ticket records its **base** when it is created. A spec ticket lands into `spec/<issue>`, that spec lands into the release, and the release lands into `main`. A bug ticket lands into the open release, a hotfix cut from the production tag, or `main` when no release is open. `/land` merges into that recorded base. The branch that happens to be checked out is not a base.
- **Release cycles.** `/release` opens a release branch, compiles changelog entries into a version, tags it, and handles hotfixes from a shipped tag.
- **Monorepo surfaces.** A surface map records each app, service, and package, the contracts between them, and the minimum context each needs from the others, so agents get the monorepo's full context with precision, and a surface can be split out later.
- **Design at three levels.** Project (surfaces), stack (`/stack-decision`), and code architecture inside each surface (`/surface-architecture`, enforced by lint).
- **Review on more axes.** Standards and Spec from upstream, plus an exploit-focused Security axis on risky diffs and a strict Deep axis on request.
- **Learning loops.** Solution notes after non-obvious fixes, session reflection into skill edits, and a skill evaluator.

Upstream's philosophy holds: small, composable skills that keep you in control. See [`UPSTREAM.md`](./UPSTREAM.md) for exactly what was kept, changed, added, and dropped.

## Install

Pick one route per agent; installing both gives you every skill twice.

**Claude Code** (plugin, updates when the version changes):

```bash
claude plugin marketplace add ahmed-zhran/z-yami-coding-skills
claude plugin install z-yami-coding-skills@z-yami
```

**Codex** (plugin, updates at startup):

```bash
codex plugin marketplace add ahmed-zhran/z-yami-coding-skills
codex plugin add z-yami-coding-skills@z-yami
```

**Cursor, OpenCode, Windsurf, and other agents** (editable files, manual updates):

```bash
npx skills@latest add ahmed-zhran/z-yami-coding-skills -a <agent>  # cursor, opencode, devin, windsurf, amp, pi; omit -a to choose
```

When the installer asks which skills to take, include `setup-z-yami-coding-skills`. To update, run `npx skills@latest update`, and re-run `add` to pick up new skills.

**Local development** of these skills: `scripts/link-skills.sh` symlinks every skill into `~/.claude/skills` and `~/.agents/skills`, so a `git pull` updates them.

## Get started

1. Run **`/setup-z-yami-coding-skills`** once per repo. It configures the issue tracker, triage labels, domain docs, the branching policy, and (in a monorepo) the surface map.
2. Run **`/ask-yami`** whenever you are unsure which skill fits.

## The main flow

```text
/ship-release 2
```

That one command shapes the release, builds each ready ticket in its own Herdr pane, waits for you to approve each pull request, tests, and tags after you approve the release. The next release waits until you clear `docs/agents/pending-release.md`.

The same cycle, one phase at a time:

```text
/release start 2
/grill-with-docs  ->  /to-spec  ->  /to-tickets
for each ticket:  /ship-ticket <n>     (or /start-work, /implement, you review, /land)
/release finish 2
```

`/ship-ticket` is one ticket from branch to merge. `/implement-spec` is the other build door: every ticket on one branch and one pull request, not a release across panes.

Bugs: `/diagnosing-bugs` on a ticket based on the release branch, or `/release hotfix <tag>` first when the bug shipped.

## Reference

**User-invoked** skills are reachable only when you type them; they orchestrate. **Model-invoked** skills can also be reached by the agent when a task fits; they hold the reusable discipline. A user-invoked skill may call model-invoked skills, never another user-invoked one.

### Engineering

**User-invoked**

- **[ask-yami](./skills/engineering/ask-yami/SKILL.md)**: Ask which skill or flow fits your situation.
- **[setup-z-yami-coding-skills](./skills/engineering/setup-z-yami-coding-skills/SKILL.md)**: Configure a repo for these skills. Run once per repo.
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)**: Grilling session that also updates `GLOSSARY.md` and ADRs inline.
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)**: Chart a huge, foggy effort as a map of decision tickets.
- **[to-spec](./skills/engineering/to-spec/SKILL.md)**: Turn the conversation into a spec with a recorded base.
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)**: Split a spec into tracer-bullet tickets with blockers, bases, and surfaces.
- **[triage](./skills/engineering/triage/SKILL.md)**: Triage incoming issues; for bugs, find the affected version and base.
- **[start-work](./skills/engineering/start-work/SKILL.md)**: Cut a ticket's branch from its base, in its own worktree.
- **[implement](./skills/engineering/implement/SKILL.md)**: Build one ticket and open a PR into its base.
- **[ship-ticket](./skills/engineering/ship-ticket/SKILL.md)**: Run one ticket from branch to merge, and stop for your review before it lands.
- **[implement-spec](./skills/engineering/implement-spec/SKILL.md)**: Build a whole spec in parallel, ending in one PR.
- **[land](./skills/engineering/land/SKILL.md)**: Merge an approved PR into its base, close the issue, restack.
- **[release](./skills/engineering/release/SKILL.md)**: Start, finish, or hotfix a release, with version, changelog, and tag.
- **[ship-release](./skills/engineering/ship-release/SKILL.md)**: Run a whole release, one Herdr pane per ticket, and write the gate that blocks the next one.
- **[sync-skills](./skills/engineering/sync-skills/SKILL.md)**: Update skills installed from this package. Refuse a locally edited skill file. Leave every other skill alone.
- **[stack-decision](./skills/engineering/stack-decision/SKILL.md)**: Choose and record a surface's stack.
- **[surface-architecture](./skills/engineering/surface-architecture/SKILL.md)**: Choose, document, and enforce a surface's code architecture.
- **[extract-surface](./skills/engineering/extract-surface/SKILL.md)**: Plan splitting a surface into its own repo.
- **[software-factory](./skills/engineering/software-factory/SKILL.md)**: Shared language for designing a factory of agents that turns issues and PRs into merged code.
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)**: Find deepening opportunities and architecture drift.
- **[debt](./skills/engineering/debt/SKILL.md)**: Harvest `shortcut:` comments into a debt ledger.
- **[reflect](./skills/engineering/reflect/SKILL.md)**: Turn a session's lessons into skill and doc edits.
- **[retro](./skills/engineering/retro/SKILL.md)**: Improve the agent's environment after a session.

**Model-invoked**

- **[branch-lineage](./skills/engineering/branch-lineage/SKILL.md)**: Bases, worktrees, landing, and restacking.
- **[ticket-flow](./skills/engineering/ticket-flow/SKILL.md)**: The procedure `/ship-ticket` runs: worktree, build, review, land.
- **[release-flow](./skills/engineering/release-flow/SKILL.md)**: The procedure `/ship-release` runs, including the post-release gate.
- **[herdr](./skills/engineering/herdr/SKILL.md)**: Control Herdr from inside a pane (the upstream skill, pinned in `.agents/external-skills.md`).
- **[herdr-guide](./skills/engineering/herdr-guide/SKILL.md)**: Help a human install, learn, or troubleshoot Herdr. Does not drive panes.
- **[surface-map](./skills/engineering/surface-map/SKILL.md)**: The map of monorepo surfaces and their contracts.
- **[setup-ts-deep-modules](./skills/engineering/setup-ts-deep-modules/SKILL.md)**: Enforce deep TypeScript modules with dependency-cruiser.
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)**: Feedback-loop-first diagnosis, fix, PR, and solution note.
- **[tdd](./skills/engineering/tdd/SKILL.md)**: Red-green loop at agreed seams; risky logic always tested.
- **[code-review](./skills/engineering/code-review/SKILL.md)**: Standards and Spec review against the base, plus Security and Deep axes.
- **[security-review](./skills/engineering/security-review/SKILL.md)**: Exploit-focused security review of a diff.
- **[deep-review](./skills/engineering/deep-review/SKILL.md)**: Strict maintainability audit, on request.
- **[pr](./skills/engineering/pr/SKILL.md)**: The shape of a PR body.
- **[changelog](./skills/engineering/changelog/SKILL.md)**: Changelog entries per change, compiled at release.
- **[learnings](./skills/engineering/learnings/SKILL.md)**: Solution notes in `docs/solutions/`.
- **[resolving-merge-conflicts](./skills/engineering/resolving-merge-conflicts/SKILL.md)**: Resolve conflicts by intent.
- **[prototype](./skills/engineering/prototype/SKILL.md)**: Throwaway code that answers one design question.
- **[research](./skills/engineering/research/SKILL.md)**: Cited research from primary sources, in the background.
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)**: Sharpen the domain language, `GLOSSARY.md`, and ADRs.
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)**: Deep-module vocabulary.
- **[wizard](./skills/engineering/wizard/SKILL.md)**: Interactive scripts for steps only a human can take.
- **[mermaid-validator](./skills/engineering/mermaid-validator/SKILL.md)**: Validate Mermaid diagrams.
- **[git-guardrails](./skills/engineering/git-guardrails/SKILL.md)**: Block dangerous git commands; careful and freeze modes.
- **[setup-pre-commit](./skills/engineering/setup-pre-commit/SKILL.md)**: Pre-commit hooks for format, types, and tests.

### Productivity

**User-invoked**

- **[grill-me](./skills/productivity/grill-me/SKILL.md)**: Be interviewed about a plan until every branch is resolved.
- **[handoff](./skills/productivity/handoff/SKILL.md)**: Hand the work to another session, or a background agent with `--bg`.
- **[teach](./skills/productivity/teach/SKILL.md)**: Learn a concept over several sessions.
- **[to-questionnaire](./skills/productivity/to-questionnaire/SKILL.md)**: A questionnaire for the person who holds the answer.
- **[wait-what](./skills/productivity/wait-what/SKILL.md)**: Re-explain a message that didn't land.

**Model-invoked**

- **[grilling](./skills/productivity/grilling/SKILL.md)**: The interview primitive.
- **[writing-for-agents](./skills/productivity/writing-for-agents/SKILL.md)**: How to write docs agents read.
- **[unslop](./skills/productivity/unslop/SKILL.md)**: Remove AI tells from prose humans read.
- **[caveman](./skills/productivity/caveman/SKILL.md)**: Terse chat replies; files stay full prose.
- **[skill-eval](./skills/productivity/skill-eval/SKILL.md)**: Score a skill and test its trigger.

## Credits

The repository license is MIT (`LICENSE`). `herdr`, `herdr-guide`, `security-review`, `caveman`, and `skill-eval` are Apache-2.0, and each of those folders includes the Apache license text.

Built on [mattpocock/skills](https://github.com/mattpocock/skills) (MIT). Adapted with credit: [security-specialist](https://github.com/fabricioctelles/skills/tree/main/skills/security-specialist) and [skill-evaluation](https://github.com/fabricioctelles/skills/tree/main/skills/skill-evaluation) by Fabricio Telles (Apache-2.0), [caveman](https://github.com/JuliusBrussee/caveman) by Julius Brussee (Apache-2.0), [ponytail](https://github.com/DietrichGebert/ponytail) by Dietrich Gebert (MIT), [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) by Conor Bronsdon (MIT), [mermaid-validator](https://github.com/dt418/mermaid-validator-agent-skill) by dt418 (MIT), [herdr](https://github.com/herdrdev/herdr/blob/v0.9.5/skills/herdr/SKILL.md) and the [Herdr agent guide](https://herdr.dev/agent-guide.md) (Apache-2.0). Pins for vendored skills are in [`.agents/external-skills.md`](./.agents/external-skills.md). `deep-review` is inspired by the thermo-nuclear review in [cursor/plugins](https://github.com/cursor/plugins).
