# Contributing

Every issue is judged against the bar in [`SCOPE.md`](./SCOPE.md). Read it first. This is a personal, curated fork. Pull requests are open to collaborators only, so describe the fix in an issue instead.

## Where each request goes

| You have | Go to |
| --- | --- |
| A bug in a skill | [Bug issue](https://github.com/ahmed-zhran/z-yami-coding-skills/issues/new?template=bug.yml) |
| A change to an existing skill, or a new skill that clears the bar | [Idea or feedback issue](https://github.com/ahmed-zhran/z-yami-coding-skills/issues/new?template=idea.yml) |
| A question, or "how do I...?" | [Discussions: Q&A](https://github.com/ahmed-zhran/z-yami-coding-skills/discussions/categories/q-a) |

## If you are a collaborator

1. Open an issue describing the observed failure (what you ran, what happened, what you expected). Repro first, one problem per issue, short.
2. Branch from `main`, change the skill, and keep `README.md`, the bucket `README.md`, `.claude-plugin/plugin.json`, `ask-yami`, and `UPSTREAM.md` in sync (see [`AGENTS.md`](./AGENTS.md)).
3. Run `skill-eval` on every skill you changed, and `npm run check-plugin-version`.
4. Add a changeset (`npx changeset`) for any user-visible change.
5. Open a PR. No em-dashes in prose.

## Issues written with AI

Agents are welcome to help, but you post the issue, so you own it:

- **One problem per issue.** Several findings from one session are several issues, or none.
- **Short.** If it does not fit on one screen, cut it.
- **Repro first.** The steps that show the problem come before any analysis.
- **No pasted specs.** No full proposals, plans, or rewritten `SKILL.md` files. Describe the problem; the fix is ours to design.
- **Not your project's issues.** If your agent files the specs or tickets for your own project here, it has the wrong repo. Run `/setup-z-yami-coding-skills` in your project.
