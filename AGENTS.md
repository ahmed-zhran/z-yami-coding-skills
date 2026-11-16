Skills are organized into bucket folders under `skills/`:

- `engineering/`: daily code work
- `productivity/`: daily non-code workflow tools
- `misc/`: kept around but rarely used, not promoted
- `in-progress/`: beta: public on purpose, feedback wanted, not shipped in the plugin
- `deprecated/`: no longer used

Every skill in `engineering/` or `productivity/` (the **promoted** buckets) must have a reference in the top-level `README.md` and an entry in `.claude-plugin/plugin.json`'s `skills` array (the Claude Code plugin ships exactly the promoted set). Skills in `misc/`, `in-progress/`, and `deprecated/` must not appear in either.

Install commands are copied verbatim from [.agents/install-block.md](./.agents/install-block.md). `.claude-plugin/marketplace.json` is the repo's own marketplace (`z-yami`), and every plugin-capable agent, Claude Code included, installs from it. Run `claude plugin validate . --strict` after touching either manifest. [ADR 0002](./.agents/adr/0002-ship-as-a-claude-code-plugin.md) records why the repo ships as a plugin.

This repo is a hard fork of `mattpocock/skills`. [`UPSTREAM.md`](./UPSTREAM.md) records the fork point and, per skill, what diverges from upstream. When you change a forked skill's divergence, add or remove a skill, or sync from upstream, update `UPSTREAM.md` in the same change.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

Each bucket folder has a `README.md` that lists every skill in the bucket with a one-line description, with the skill name linked to its `SKILL.md`. The promoted buckets' `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**; non-promoted bucket `README.md`s (`misc/`, `in-progress/`) use a flat list.

Skills in `engineering/` and `productivity/` may have a human-facing docs page at `docs/<bucket>/<skill-name>.md` (the docs tree mirrors those two bucket folders under `skills/`). Pages inherited from upstream exist for the forked skills; skills added in this fork have none yet, and `SKILL.md` plus the README entry is enough. When you change the behaviour of a skill that has a page, re-sync the page following [.agents/writing-docs.md](./.agents/writing-docs.md). A finished page carries four sections: **What it does**, **When to reach for it**, **Common questions**, and **It's working if**. `writing-docs.md` holds the template, the section order, and where to hunt for the questions. Skills in the non-promoted buckets (`misc/`, `in-progress/`, `deprecated/`) get **no** docs page. The one exception is a promoted skill removed outright: its page stays, marked archived (see `writing-docs.md`).

Every `SKILL.md` is either user-invoked (`disable-model-invocation: true` plus `policy.allow_implicit_invocation: false` in `agents/openai.yaml`, reachable only by the human) or model-invoked (model- or user-reachable). See [.agents/invocation.md](./.agents/invocation.md).

[`ask-yami`](./skills/engineering/ask-yami/SKILL.md) is the router that maps every user-reachable skill and how they relate. The same trigger that re-syncs a docs page applies to it: whenever you add, rename, remove, or change how a user-reachable skill fits the flows, re-read `ask-yami`'s `SKILL.md` and update it so the map stays accurate: a new skill it never mentions, or a stale one it still routes to, is a router that lies.

To (re)link every skill outside `deprecated/` and `misc/` into the local harness skill directories (`~/.claude/skills`, `~/.agents/skills`) for author testing, run `scripts/link-skills.sh`. That is not how consumers update: `/sync-skills` only refreshes the published plugin or skills.sh install. Re-run the link script after adding, removing, or renaming a skill while authoring.

No em-dashes anywhere in this repo's prose (`SKILL.md` files, docs, `README.md`, `CHANGELOG.md`, ADRs, changesets, code comments). Where a sentence reaches for one, rewrite it instead with a comma, colon, period, parentheses, or a conjunction, whichever the sentence actually wants; never do a blind character substitution.

Every skill that dispatches a subagent says to start it with a fresh context window. Some harnesses (Codex, for one) fork the parent conversation by default, and a fork inherits the parent's context, which is what the subagent was meant to escape.

## Agent skills

### Triage labels

Canonical names, unchanged. See `docs/agents/triage-labels.md`. Issues are judged against [`SCOPE.md`](./SCOPE.md).

### Releases

Changesets. Every user-visible change to a promoted skill adds a `.changeset/*.md` entry (call the Skill tool with "changelog"). A change that alters a file a consumer repo keeps (anything setup or another skill writes under `docs/agents/`) also adds a migration record under `skills/engineering/sync-skills/migrations/` in that same change. The Release workflow opens the "chore: version skills" PR; merging it bumps `package.json`, syncs `plugin.json` through `scripts/sync-plugin-version.mjs`, and writes `CHANGELOG.md`.

Human testing for product release `<N>` lives at `docs/releases/<N>/human-testing.md` (template in `skills/engineering/release/human-testing.md`). It is a blocking gate before the release tag; after the tag, the filled file feeds the pending-release feedback box.

### Where new files go

Never drop a new file at a folder root with an ad-hoc name. Every new file lands in a **named home**:

| Kind | Home |
| --- | --- |
| Agent/repo policy the skills read | `docs/agents/` (or a skill template that setup / sync writes there) |
| Per-release product artifacts (human testing, release notes the product keeps) | `docs/releases/<N>/` |
| Design packs (when used) | `docs/agents/releases/<N>/` and canvases under `.ui-designs/` |
| Skill procedures | `skills/<bucket>/<skill-name>/` |
| Human docs for a promoted skill | `docs/<bucket>/<skill-name>.md` |

If no home fits, add or name one in the same change; do not invent a one-off path at `docs/` root.
