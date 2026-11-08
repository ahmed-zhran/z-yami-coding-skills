---
name: changelog
description: "Write one changelog entry per landed change, and compile entries into a version bump and a CHANGELOG.md section at release time. Use when finishing a ticket or bug fix that users will notice, when cutting a release, or when the user mentions changesets, changelog, or release notes."
---

# Changelog

Two modes. **Entry** runs once per ticket, inside the ticket's branch. **Compile** runs once per release, on the release or hotfix branch.

The release tooling is recorded in `docs/agents/release.md`. If it is missing, write entries as plain files (below) and tell the user to run `/release` once to settle the tooling.

## Entry mode

Write an entry only when a user of the product would notice the change: a new behaviour, a changed behaviour, a fixed bug they could have hit. Skip it for refactors, tests, docs, and fixes to bugs that never shipped (a bug found on an unreleased `release/<N>` never reached users).

Write it in the form the tool expects:

| Tool | Entry |
|------|-------|
| Changesets | `npx changeset` or a `.changeset/<slug>.md` file with the bump type per package |
| release-please / release-plz | the conventional-commit subject of the squash commit (`feat:`, `fix:`, `feat!:`) |
| Plain files | `.changes/unreleased/<issue>-<slug>.md` with frontmatter `type: added | changed | fixed | removed | security` and `issue: <n>` |

Bump type: a breaking change is major, a new behaviour is minor, a fix is patch.

Write the body for the person using the product, in the `GLOSSARY.md` vocabulary: what they can now do, or what no longer goes wrong. One or two sentences. Not the implementation, not the ticket title pasted in.

## Compile mode

1. Collect every entry that is on the branch and not yet released.
2. Compute the version: the highest bump among the entries, applied to the last tag.
3. Run the tool's version command (`npx changeset version`, the release-please PR, `release-plz update`), or for plain files, write the section yourself:

```markdown
## v<version> (<YYYY-MM-DD>)

### Added
- <entry> (#<issue>)

### Fixed
- <entry> (#<issue>)
```

4. Delete or archive the consumed entry files, so the next release starts empty.
5. Before committing, call the Skill tool with "unslop" on the new section: it is read by humans.
6. Commit as `chore: release v<version>`.

Done when `CHANGELOG.md` has the section, the version is bumped everywhere the project keeps it, and no consumed entry file remains.
