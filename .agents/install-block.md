# The canonical install block

One install story, one wording. `README.md`, `.changeset/*`, and every page under `docs/` must say **this** and nothing else. Change it here first, then propagate.

## Routes

Plugin-capable agents install from this repo's own marketplace, `.claude-plugin/marketplace.json` (named `z-yami`) and `plugin.json`. Those routes reinstall only when the `version` in `plugin.json` changes. The Release workflow runs `npm run version`, which copies that field from `package.json`, so users get a release when the "chore: version skills" PR merges.

| Agent         | Route                     | Updates itself?                                              |
| ------------- | ------------------------- | ------------------------------------------------------------ |
| Claude Code   | `@z-yami` marketplace     | Yes, when `plugin.json` version changes                      |
| Codex         | `@z-yami` marketplace     | Yes, at startup                                              |
| Everyone else | skills.sh                 | No. Run `npx skills update`, and re-run `add` for new skills |

## Claude Code

<canonical-block name="claude-code">

```bash
claude plugin marketplace add ahmed-zhran/z-yami-coding-skills
claude plugin install z-yami-coding-skills@z-yami
```

</canonical-block>

## Codex

<canonical-block name="codex">

```bash
codex plugin marketplace add ahmed-zhran/z-yami-coding-skills
codex plugin add z-yami-coding-skills@z-yami
```

</canonical-block>

## Every other agent, or editable files (skills.sh)

`-a` preselects the agent. Prefer skills.sh to an agent's own repo installer, because those also pull in `misc/` and `in-progress/`. `npx skills update` skips skills added since `add`, so the block tells users to re-run `add`.

<canonical-block name="other-agents">

```bash
npx skills@latest add ahmed-zhran/z-yami-coding-skills -a <agent>  # cursor, opencode, devin, windsurf, amp, pi; omit -a to choose
```

When the installer asks which skills to take, include `setup-z-yami-coding-skills`. To update, run `npx skills@latest update`, and re-run `add` to pick up new skills.

</canonical-block>

Use the single-skill form wherever one skill is named on its own.

<canonical-block name="skills-sh-one-skill">

```bash
npx skills@latest add ahmed-zhran/z-yami-coding-skills --skill=<name>
```

```bash
npx skills@latest update <name>
```

</canonical-block>

`skills@latest` is the pinned spelling everywhere.

## The two routes are exclusive

The plugin is a managed, read-only bundle you subscribe to. skills.sh writes files you own and edit. Installing both leaves the user with every skill twice: always say "pick one".
