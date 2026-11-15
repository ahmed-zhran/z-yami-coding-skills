# External skills

Some skills in this repo are copies of someone else's skill. The copy in this repo is what every consumer installs. Do not also install that skill from the upstream project. Two skills with the same name hide each other.

A pin is the version this repo last reviewed. Newer upstream work does not enter this repo until someone checks it and updates the copy here. `/sync-skills` does not do that. It only replaces consumer installs with whatever this repo already published.

## Check for a newer release

Do this in the coding-skills repo when you want to know if a vendored skill has moved, or before a release of this package.

1. Read the table below. Ignore preview tags.
2. For a Git tag pin, list stable releases and compare the newest tag to the pin. For Herdr: `gh release list --repo herdrdev/herdr`. A tag that sorts newer than the pin is a candidate. The pin stays until the diff is reviewed.
3. Download the source URL at the candidate tag (or re-fetch a live URL) and diff it against the vendored file.
4. Report the pin, the candidate, and the diff. Do not edit the vendored file until the maintainer accepts.
5. On accept: replace the vendored file, bump the pin and the content hash in this file, re-apply the recorded divergences, and say so in the changelog.

A live URL with no tag (the agent guide) is checked by re-fetching it and diffing. The content hash is how you know the fetched bytes changed.

## Pins

### herdr

- **Vendored:** `skills/engineering/herdr/SKILL.md`
- **Upstream:** https://github.com/herdrdev/herdr
- **License:** Apache-2.0. See `skills/engineering/herdr/NOTICE`.
- **Pin:** tag `v0.9.5` (latest stable release as of 2026-11-15)
- **Source:** https://raw.githubusercontent.com/herdrdev/herdr/v0.9.5/skills/herdr/SKILL.md
- **Blob:** `4943e5575e941a7820ea01ca9416e79749c3ddc3`
- **Content hash (sha256):** `fbd9d502767f7dff29c211505a0bd9ba34e980ed4cc456247e2adc1642883984`
- **Divergence:** none. The file is a byte copy of the pin. Do not edit it locally. A behavior change belongs upstream, then here as a new pin.

### herdr-guide

- **Vendored:** `skills/engineering/herdr-guide/SKILL.md`
- **Upstream:** https://herdr.dev/agent-guide.md
- **License:** Apache-2.0, same project as `herdr`
- **Pin:** fetched 2026-11-15. No release tag. The page is the source.
- **Content hash (sha256) of the fetched page:** `74a5212e3f99cc02ef8553238de4aebf1d9598d10b98c2050ef5d2216bbc0e5f`
- **Divergence:** em dashes in the page are rewritten to colons. The section that tells an agent to `npx skills add herdrdev/herdr` is replaced: this package already ships `herdr`, and a second install is refused. Re-apply both when the page changes.

## Adding another external skill

Add a row here in the same change as the copy. Record the pin, the hash, the license, and every line that is not upstream. A skill from this table is part of the published set (`plugin.json`, the READMEs, `ask-yami`). It is not a private install under `~/.agents/skills` or `~/.claude/skills` except as a symlink back to this repo.
