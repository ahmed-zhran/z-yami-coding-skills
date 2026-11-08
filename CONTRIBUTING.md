# Contributing

This is a personal skills repo. Changes are judged against [`SCOPE.md`](./SCOPE.md).

## Making a change

1. Open an issue describing the observed failure (what you ran, what happened, what you expected). Repro first, one problem per issue, short.
2. Branch from `main`, change the skill, and keep `README.md`, the bucket `README.md`, `.claude-plugin/plugin.json`, `ask-yami`, and `UPSTREAM.md` in sync (see [`AGENTS.md`](./AGENTS.md)).
3. Run `skill-eval` on every skill you changed, and `npm run check-plugin-version`.
4. Add a changeset (`npx changeset`) for any user-visible change.
5. Open a PR. No em-dashes in prose.

If your agent is trying to file your own project's specs or tickets here, it has the wrong repo: run `/setup-z-yami-coding-skills` in your project.
