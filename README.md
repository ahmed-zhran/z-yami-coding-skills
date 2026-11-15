<div align="center">

<img src="docs/brand/header.svg" alt="Yami Coding. Ahmed Zhran. 61 skills for release, spec, and ticket." width="880">

# Yami Coding

**Ahmed Zhran's agent skills for shipping software.**

[![Release 1.2.0](https://img.shields.io/github/v/release/ahmed-zhran/z-yami-coding-skills?style=flat-square&color=8eb6ff&label=release)](https://github.com/ahmed-zhran/z-yami-coding-skills/releases/tag/v1.2.0)
[![MIT license](https://img.shields.io/github/license/ahmed-zhran/z-yami-coding-skills?style=flat-square&color=1c2030)](./LICENSE)
[![Site](https://img.shields.io/badge/site-yami--coding-11131c?style=flat-square)](https://ahmed-zhran.github.io/yami-coding)

</div>

[Installation](#installation) · [Quick start](#quick-start) · [What it does](#what-it-does) · [Reference](#reference) · [Site](https://ahmed-zhran.github.io/yami-coding)

61 skills in the `z-yami-coding-skills` plugin. A release, a spec, and a ticket each record a base when the issue is created, and the agent lands into that base. You approve before a pull request merges and before a release is tagged. The site is [yami-coding](https://ahmed-zhran.github.io/yami-coding).

## Requirements

- Claude Code, Codex, or another agent that [skills.sh](https://skills.sh) can install into (Cursor, OpenCode, Windsurf, Devin, Amp, Pi).
- `/ship-spec` and `/ship-release` run inside [Herdr](https://herdr.dev) once a spec's tickets are ready to build. The TUI sets `HERDR_ENV=1`. Herdr Desktop sets `HC_TERMINAL_ID`. The other skills do not need Herdr.

## Installation

Pick one route per agent. Installing both gives you every skill twice.

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

## Quick start

1. Run **`/setup-z-yami-coding-skills`** once per repo. It configures the issue tracker, triage labels, domain docs, the branching policy, and (in a monorepo) the surface map.
2. Run **`/ask-yami`** when you are unsure which skill fits. It names the next command and stops.

A whole release, after setup, is one command. It needs Herdr, as noted above.

```text
/ship-release 2
```

That names every feature, ships each one with `/ship-spec`, and waits until that spec has landed before the next. Inside a spec you approve the ticket list, each ticket's pull request into `spec/<issue>`, and that spec's pull request into the release. The tag happens after you approve the release itself. The next release waits until you clear `docs/agents/pending-release.md`.

The same cycle, one level at a time:

```text
/release start 2
/grill-with-docs
/ship-spec                 (one feature; repeat for the next feature)
/release finish 2
```

The phases inside one spec, when you want them separate:

```text
/to-spec  ->  /to-tickets
for each ticket:  /ship-ticket <n>     (or /start-work, /implement, you review, /land)
/ship-spec <issue>         (lands the spec once its tickets have landed)
```

`/ship-ticket` is one ticket from branch to merge. `/implement-spec` builds every ticket of one spec on that spec's branch and opens one pull request. A bug uses `/diagnosing-bugs`. If the bug already shipped, `/release hotfix <tag>` comes first.

## What it does

| Phase | You type | You get |
| --- | --- | --- |
| Setup | `/setup-z-yami-coding-skills` | Tracker, labels, branching, and a surface map in a monorepo |
| Shape | `/grill-with-docs`, `/to-spec`, `/to-tickets` | One spec per feature, then tickets, each with a recorded base |
| One ticket | `/ship-ticket` | A branch cut from that base, through an approved merge |
| One spec | `/ship-spec` | That spec's tickets, each in its own session, then the spec lands in the release |
| One spec, one pull request | `/implement-spec` | Every ticket of one spec, one pull request into the release |
| Release | `/ship-release` | `/ship-spec` once per feature, then a tag after you approve |
| After the tag | `/sync-skills` | This package's skills updated, plus migration records for files the package writes |

| | |
| --- | --- |
| **Lineage** | A spec ticket lands into `spec/<issue>`. That spec lands into `release/<N>`. The release lands on `main`. The checked-out branch is never the base. |
| **Bugs** | A bug ticket lands into the open release, a hotfix cut from the production tag, or `main` when no release is open. |
| **Surfaces** | A map of each app, service, and package, the contracts between them, and the context an agent needs. |
| **Review** | Standards and Spec on the diff, an exploit-focused Security axis on risky diffs, and a strict Deep axis when you ask. |
| **Learning** | A solution note after a non-obvious fix, a retro after the tag, and a skill evaluator. |

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
- **[ship-spec](./skills/engineering/ship-spec/SKILL.md)**: Run one spec through its tickets until that branch lands in the release.
- **[implement-spec](./skills/engineering/implement-spec/SKILL.md)**: Build a whole spec in parallel, ending in one PR.
- **[land](./skills/engineering/land/SKILL.md)**: Merge an approved PR into its base, close the issue, restack.
- **[release](./skills/engineering/release/SKILL.md)**: Start, finish, or hotfix a release, with version, changelog, and tag.
- **[ship-release](./skills/engineering/ship-release/SKILL.md)**: Run a whole release, one spec at a time, and write the gate that blocks the next one.
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
- **[spec-flow](./skills/engineering/spec-flow/SKILL.md)**: The procedure `/ship-spec` runs, and `/ship-release` runs once per feature.
- **[release-flow](./skills/engineering/release-flow/SKILL.md)**: The procedure `/ship-release` runs, including the post-release gate.
- **[herdr](./skills/engineering/herdr/SKILL.md)**: Control the Herdr TUI from inside a pane (pinned in `.agents/external-skills.md`).
- **[herdr-core](./skills/engineering/herdr-core/SKILL.md)**: Control Herdr Desktop terminals with `hc`.
- **[herdr-app](./skills/engineering/herdr-app/SKILL.md)**: Show and arrange the Herdr Desktop window.
- **[herdr-guide](./skills/engineering/herdr-guide/SKILL.md)**: Help a human install, learn, or troubleshoot Herdr. Does not drive panes or terminals.
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

## Documentation

The site walks the same flow: [yami-coding](https://ahmed-zhran.github.io/yami-coding). Skill pages that have one live under [`docs/`](./docs).

## Upgrading

Run **`/sync-skills`**. It shows the changelog, waits for you to accept, updates skills installed from this package, and applies migration records for files the package writes (such as `docs/agents/branching.md`). If one of those skill files has local edits, it stops and shows the diff. Skills from other packages stay as they are.

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md). The current release is [v1.2.0](https://github.com/ahmed-zhran/z-yami-coding-skills/releases/tag/v1.2.0).

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). Issues use the templates in [`.github/ISSUE_TEMPLATE`](./.github/ISSUE_TEMPLATE). Pull requests are for collaborators.

To work on these skills locally, `scripts/link-skills.sh` symlinks every skill into `~/.claude/skills` and `~/.agents/skills`, so a `git pull` updates them.

## Credits

Yami Coding is Ahmed Zhran's package. `herdr`, `herdr-core`, `herdr-app`, `herdr-guide`, `security-review`, `caveman`, and `skill-eval` are Apache-2.0, and each of those folders includes the Apache license text.

The agentic workflow uses [mattpocock/skills](https://github.com/mattpocock/skills) (MIT) as a base. [`UPSTREAM.md`](./UPSTREAM.md) lists what was kept, changed, added, and dropped. Also adapted, with credit: [security-specialist](https://github.com/fabricioctelles/skills/tree/main/skills/security-specialist) and [skill-evaluation](https://github.com/fabricioctelles/skills/tree/main/skills/skill-evaluation) by Fabricio Telles (Apache-2.0), [caveman](https://github.com/JuliusBrussee/caveman) by Julius Brussee (Apache-2.0), [ponytail](https://github.com/DietrichGebert/ponytail) by Dietrich Gebert (MIT), [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) by Conor Bronsdon (MIT), [mermaid-validator](https://github.com/dt418/mermaid-validator-agent-skill) by dt418 (MIT), [herdr](https://github.com/herdrdev/herdr/blob/v0.9.5/skills/herdr/SKILL.md), [herdr-core](https://github.com/herdrdev/herdr-core/blob/c84d6e76156a6c2aac1da20efbe800f10acfe897/skills/herdr-core/SKILL.md), [herdr-app](https://github.com/herdrdev/herdr-app/blob/5216e6f9f8c0c281a65e09816c66e4319e671784/src/SKILL.md), and the [Herdr agent guide](https://herdr.dev/agent-guide.md) (Apache-2.0). Pins for vendored skills are in [`.agents/external-skills.md`](./.agents/external-skills.md). `deep-review` is inspired by the thermo-nuclear review in [cursor/plugins](https://github.com/cursor/plugins).

## License

MIT. See [`LICENSE`](./LICENSE).
