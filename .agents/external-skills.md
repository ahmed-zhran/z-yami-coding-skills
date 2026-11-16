# External skills

Some skills in this repo are copies of someone else's skill. The copy in this repo is what every consumer installs. Do not also install that skill from the upstream project. Two skills with the same name hide each other.

A pin is the version this repo last reviewed. Newer upstream work does not enter this repo until someone checks it and updates the copy here. `/sync-skills` does not do that. It only replaces consumer installs with whatever this repo already published.

## Check for a newer release

Do this in the coding-skills repo when you want to know if a vendored skill has moved, or before a release of this package.

1. Read the table below. Ignore preview tags.
2. For a Git tag pin, list stable releases and compare the newest tag to the pin. For Herdr: `gh release list --repo herdrdev/herdr`. A tag that sorts newer than the pin is a candidate.
3. Download the source URL at the candidate tag (or re-fetch a live URL) and diff it against the vendored file.
4. A byte-identical pin is fast-forwarded by the weekly job in `/data/projects/aurora/aura-space` (`scripts/update-external-skills.py`). That job updates the vendored file and the pin below. It does not touch a file that has diverged.
5. For a diverged file, re-apply the recorded divergences by hand, then bump the pin and say so in the changelog.

A live URL with no tag (the agent guide) is checked by re-fetching it and diffing. The content hash is how you know the fetched bytes changed.

## Pins

### herdr

- **Vendored:** `skills/engineering/herdr/SKILL.md`
- **Upstream:** https://github.com/herdrdev/herdr
- **License:** Apache-2.0. The text is `skills/engineering/herdr/LICENSE`. See `skills/engineering/herdr/NOTICE`.
- **Pin:** tag `v0.9.5` (latest stable release as of 2026-11-15)
- **Source:** https://raw.githubusercontent.com/herdrdev/herdr/v0.9.5/skills/herdr/SKILL.md
- **Blob:** `4943e5575e941a7820ea01ca9416e79749c3ddc3`
- **Content hash (sha256):** `fbd9d502767f7dff29c211505a0bd9ba34e980ed4cc456247e2adc1642883984`
- **Divergence:** Focus etiquette section (and a matching Safety bullet): stay in the agent's current workspace; no focus theft for convenience; `--no-focus` for background creates. Re-apply after each pin bump. Other behaviour changes still belong upstream, then here as a new pin.

### herdr-guide

- **Vendored:** `skills/engineering/herdr-guide/SKILL.md`
- **Upstream:** https://herdr.dev/agent-guide.md
- **License:** Apache-2.0, same project as `herdr`. The text is `skills/engineering/herdr-guide/LICENSE`.
- **Pin:** fetched 2026-11-15. No release tag. The page is the source.
- **Content hash (sha256) of the fetched page:** `74a5212e3f99cc02ef8553238de4aebf1d9598d10b98c2050ef5d2216bbc0e5f`
- **Divergence:** em dashes in the page are rewritten to colons. The section that tells an agent to `npx skills add herdrdev/herdr` is replaced: this package already ships `herdr`, and a second install is refused. A session with `HC_TERMINAL_ID` set is named as Herdr Desktop and pointed at `herdr-core` and `herdr-app`. Focus etiquette is named in The control skill and Rules for you. Re-apply all four when the page changes.

### herdr-core

- **Vendored:** `skills/engineering/herdr-core/SKILL.md`
- **Upstream:** https://github.com/herdrdev/herdr-core
- **License:** Apache-2.0. The text is `skills/engineering/herdr-core/LICENSE`. See `skills/engineering/herdr-core/NOTICE`.
- **Pin:** commit `c84d6e76156a6c2aac1da20efbe800f10acfe897` on `master` (no release tags as of 2026-11-15). Installed binary that day: `hc 0.1.21`.
- **Source:** https://raw.githubusercontent.com/herdrdev/herdr-core/c84d6e76156a6c2aac1da20efbe800f10acfe897/skills/herdr-core/SKILL.md
- **Blob:** `864a6e4681d629d1c46fa2f2c5a24fb4028e76d3`
- **Content hash (sha256):** `677e9f2e21f13a3ecf11708fc50211373fda7e50251e7e0cb303707ac8eed70a`
- **Divergence:** Focus etiquette section after the upstream body: stay in the agent's current space; never `space.select` / steal focus for convenience; prefer `--focus false` via `herdr-app` for background tabs. Re-apply after each pin bump. The live flags still come from `hc --skill` on the installed binary.

### herdr-app

- **Vendored:** `skills/engineering/herdr-app/SKILL.md`
- **Upstream:** https://github.com/herdrdev/herdr-app
- **License:** Apache-2.0. The text is `skills/engineering/herdr-app/LICENSE`. See `skills/engineering/herdr-app/NOTICE`.
- **Pin:** commit `5216e6f9f8c0c281a65e09816c66e4319e671784` on `master` (no release tags as of 2026-11-15). Installed binary that day: `herdr-app 0.1.15`.
- **Source:** https://raw.githubusercontent.com/herdrdev/herdr-app/5216e6f9f8c0c281a65e09816c66e4319e671784/src/SKILL.md
- **Blob:** `9e940ff83f1bd547698bacca2d057d007eb5819b`
- **Content hash (sha256) of the upstream body:** `cf20cbef338e8f0df22107c0b154d5a9bbc7a6851003afc2a61181cb549a7f97`
- **Divergence:** YAML frontmatter (`name`, `description`) is added so agents can load the skill. Focus etiquette section plus example and safety edits: default to the current space, `--focus false` on creates, no `space.select` / focus theft for convenience, shots stay in the agent's space. Re-apply frontmatter and Focus etiquette when the body changes. The live window commands come from `herdr-app --skill`.

### design-taste-frontend

- **Vendored:** `skills/engineering/design-taste-frontend/` (full upstream skill tree: `SKILL.md`, `scripts/`, `assets/`, `references/`, `library/`)
- **Upstream:** https://github.com/Leonxlnx/taste-skill
- **License:** MIT. The text is `skills/engineering/design-taste-frontend/LICENSE`. See `skills/engineering/design-taste-frontend/NOTICE`.
- **Pin:** tag `v2.5.1` (commit `f6b76575f949707b4e3c37cd86cb44b0b98643e8`)
- **Source:** https://github.com/Leonxlnx/taste-skill/tree/v2.5.1/skills/taste-skill
- **Content hash (sha256) of upstream `SKILL.md` at the pin:** `0c7a5852a5217be79cab422c6d58329b776f0c25bd6da8a7a01707ce75be6206`
- **Divergence:** Frontmatter `description` is rewritten for this package's invocation policy (prefer for most UI/frontend work; always on cool/eye-catching/heavy/rich/theme/3D/animations/amazing/attractive and similar; skip only light no-design tasks). An **In this package** section is inserted after the frontmatter (no second install; pointer to `/prototype` for throwaway variants). The Stop-hook search path adds `skills/engineering/design-taste-frontend/scripts/gate.mjs`. `agents/openai.yaml` is added for display. Re-apply those when bumping the pin; leave scripts, assets, references, and library as upstream.

## Adding another external skill

Add a row here in the same change as the copy. Record the pin, the hash, the license, and every line that is not upstream. A skill from this table is part of the published set (`plugin.json`, the READMEs, `ask-yami`). Consumers get it through the marketplace plugin or skills.sh; `/sync-skills` refreshes that published copy. Author-only `link-skills.sh` symlinks are not a sync target.
