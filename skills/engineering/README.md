# Engineering

Skills for daily code work.

## User-invoked

Reachable only when you type them (Claude Code: `disable-model-invocation: true`; Codex: `policy.allow_implicit_invocation: false` in `agents/openai.yaml`).

- **[ask-yami](./ask-yami/SKILL.md)**: Ask which skill or flow fits your situation. A router over the skills in this repo.
- **[setup-z-yami-coding-skills](./setup-z-yami-coding-skills/SKILL.md)**: Configure a repo for the engineering skills (issue tracker, triage labels, domain docs, branching policy, surface map). Run once per repo.
- **[grill-with-docs](./grill-with-docs/SKILL.md)**: Grilling session that also builds your project's domain model, sharpening terminology and updating `GLOSSARY.md` and ADRs inline.
- **[wayfinder](./wayfinder/SKILL.md)**: Plan a huge chunk of work as a shared map of decision tickets on the issue tracker, resolved one at a time until the way is clear.
- **[to-spec](./to-spec/SKILL.md)**: Turn the current conversation into a spec with a recorded base branch and publish it to the issue tracker.
- **[to-tickets](./to-tickets/SKILL.md)**: Break a spec into tracer-bullet tickets, each declaring its blockers, its base branch, and its surfaces.
- **[triage](./triage/SKILL.md)**: Move incoming issues through a state machine of triage roles; for bugs, find the affected version and set the base.
- **[start-work](./start-work/SKILL.md)**: Start a ticket: cut its branch from the recorded base and open it in its own worktree.
- **[implement](./implement/SKILL.md)**: Build one ticket with the smallest complete change, `/tdd` and `/code-review`, ending in a PR into its base.
- **[ship-ticket](./ship-ticket/SKILL.md)**: Ship one ticket from branch to merge, stopping for review before it lands.
- **[implement-spec](./implement-spec/SKILL.md)**: Build a whole spec with parallel implementer subagents on one feature branch, ending in one PR for review.
- **[land](./land/SKILL.md)**: After you approve a PR, merge it into its recorded base, close the issue, restack children, and clean up.
- **[release](./release/SKILL.md)**: Start a release branch, finish it with version, changelog and tag, or ship a hotfix from a tag. Finish writes the gate that blocks the next release.
- **[ship-release](./ship-release/SKILL.md)**: Run a whole release: shape, one Herdr session per ready ticket, test, tag after you approve, then the post-release gate.
- **[sync-skills](./sync-skills/SKILL.md)**: Update skills installed from this package. Stop if one was edited locally. Leave every other skill alone.
- **[stack-decision](./stack-decision/SKILL.md)**: Choose a surface's framework or a library for a slot, recorded as an ADR and in `docs/agents/stack.md`.
- **[surface-architecture](./surface-architecture/SKILL.md)**: Choose how code is organised inside one surface, write its architecture doc, and enforce it with lint.
- **[extract-surface](./extract-surface/SKILL.md)**: Plan splitting one monorepo surface into its own repo, carrying exactly the context it needs.
- **[software-factory](./software-factory/SKILL.md)**: Shared language for designing a software factory (agents that turn issues, PRs, and schedules into merged code): the tasks it runs and the services it plugs into. Call it alongside a grilling session.
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)**: Scan for deepening opportunities and drift from the architecture docs, present them as an HTML report, then grill through the one you pick.
- **[debt](./debt/SKILL.md)**: Harvest `shortcut:` comments into a debt ledger and turn the due ones into issues.
- **[reflect](./reflect/SKILL.md)**: After a session, turn its lessons into proposed edits to skills, `AGENTS.md`, and docs.
- **[retro](./retro/SKILL.md)**: Suggest improvements to the coding agent's environment (navigation, automated checks, coding standards, tooling) after a session, most severe first.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[branch-lineage](./branch-lineage/SKILL.md)**: Every branch records its base at any depth; procedures for resolving bases, starting work in worktrees, landing, and restacking.
- **[ticket-flow](./ticket-flow/SKILL.md)**: One ticket from its worktree through review to a landed pull request. `/ship-ticket` and `/ship-release` call it.
- **[release-flow](./release-flow/SKILL.md)**: One release from shaping through per-ticket sessions, the tag, and the gate that blocks the next release.
- **[herdr](./herdr/SKILL.md)**: Control Herdr from inside a pane: layout, commands, and other agents. Pinned from herdrdev/herdr. `/ship-release` calls it for one session per ready ticket.
- **[herdr-guide](./herdr-guide/SKILL.md)**: Set up Herdr or troubleshoot it with a human. Install, keys, logs, and agent detection. Not the control skill.
- **[surface-map](./surface-map/SKILL.md)**: Keep the map of monorepo surfaces, their contracts, and each surface's extraction context accurate.
- **[setup-ts-deep-modules](./setup-ts-deep-modules/SKILL.md)**: Wire dependency-cruiser into a TypeScript repo so each package is a deep module reachable only through its entry files.
- **[diagnosing-bugs](./diagnosing-bugs/SKILL.md)**: Disciplined diagnosis loop for hard bugs: decide where the fix lands, build a tight feedback loop, minimise, hypothesise, fix with a regression test, ship as a PR, record the cause.
- **[tdd](./tdd/SKILL.md)**: Test-driven development with a red-green loop, one vertical slice at a time; risky logic always gets a test.
- **[code-review](./code-review/SKILL.md)**: Review a branch against its base: Standards (including the surface architecture and cross-surface impact) and Spec, plus Security on risky diffs and Deep on request, as parallel sub-agents.
- **[security-review](./security-review/SKILL.md)**: Exploit-focused security review of a diff, with adversarial validation of every finding.
- **[deep-review](./deep-review/SKILL.md)**: Extremely strict maintainability audit that hunts for restructurings that delete complexity. Only on explicit request.
- **[pr](./pr/SKILL.md)**: The shape a pull request body should take: the smallest visual that makes the change clear, before/after evidence, and a merge-danger call.
- **[changelog](./changelog/SKILL.md)**: One changelog entry per user-visible change, compiled into a version bump and `CHANGELOG.md` section at release.
- **[learnings](./learnings/SKILL.md)**: Solution notes in `docs/solutions/`: written after non-obvious fixes, read before work in the same area.
- **[resolving-merge-conflicts](./resolving-merge-conflicts/SKILL.md)**: Resolve an in-progress merge or rebase conflict by intent, traced to each side's primary source.
- **[prototype](./prototype/SKILL.md)**: Build a throwaway prototype to answer a design question: a single HTML file for state and logic, or toggleable UI variations.
- **[research](./research/SKILL.md)**: Investigate a question against primary sources and capture the findings as a cited Markdown file, run as a background agent.
- **[domain-modeling](./domain-modeling/SKILL.md)**: Build and sharpen the domain model: challenge terms, stress-test with scenarios, update `GLOSSARY.md` and ADRs inline.
- **[codebase-design](./codebase-design/SKILL.md)**: Shared vocabulary for designing deep modules: small interfaces, clean seams, testable through the interface.
- **[wizard](./wizard/SKILL.md)**: Generate an interactive bash wizard for steps only a human can perform: credentials, dashboards, one-off migrations.
- **[mermaid-validator](./mermaid-validator/SKILL.md)**: Validate Mermaid diagrams in markdown before committing.
- **[git-guardrails](./git-guardrails/SKILL.md)**: Hooks (Claude Code or Cursor) that block dangerous git commands, with careful and freeze modes.
- **[setup-pre-commit](./setup-pre-commit/SKILL.md)**: Set up Husky pre-commit hooks with lint-staged, type checking, and tests.
