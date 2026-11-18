# UI articulation, walkthrough motion, and design-before-build

**Date:** 2026-11-15  
**Question:** What skills, FOSS design tools, and Herdr review paths exist for landing-page articulation, walkthrough motion, and design-before-code, judged against this repo's bar (`SCOPE.md`: observed failure, composes, evaluated)?  
**Repo context:** `z-yami-coding-skills` already vendors `design-taste-frontend` (pinned tasteskill). The landing site feels weak at UI articulation, walkthrough animations, and settling design before implementation.

Shorter working notes on this topic named concrete site failures (sparse doors column, hero as a single chat mock instead of a Herdr multi-pane showcase, before/after as a flat side-by-side, missing changelog-per-ticket cycle). Those are treated here as the observed-failure seed; conclusions below prefer primary sources for skills, Penpot MCP, tldraw licensing, OpenPencil/Pigma, and Herdr browser panes.

---

## 1. Problem

### What this repo already has

`design-taste-frontend` is the promoted path for production UI and marketing screens. Its description prefers it for landing, SaaS, product, and "cool / animations / attractive" work, and routes throwaway layout options to `/prototype` instead ([`skills/engineering/design-taste-frontend/SKILL.md`](../../skills/engineering/design-taste-frontend/SKILL.md); [`skills/engineering/ask-yami/SKILL.md`](../../skills/engineering/ask-yami/SKILL.md)). The run is brief → copy → screen plan → deal → build → browser gate. There is no mandatory stop where a human or agent settles layout in a design tool before markup ([same SKILL.md, section 4](../../skills/engineering/design-taste-frontend/SKILL.md)).

Its motion doctrine is explicit and narrow ([`references/motion.md`](../../skills/engineering/design-taste-frontend/references/motion.md)):

1. Hero entrance once on load.
2. One (or two) dealt moment(s) in their own section.
3. Hover / press / focus micro-interactions everywhere.

**Scrolling moves nothing but the dealt moment.** Stock scroll reveals, stagger-on-enter rows, text parallax, and scroll-jacking are forbidden. That is intentional anti-slop, not an accidental omission.

`/prototype` answers "does this look right?" with throwaway UI variants on one route, not with a durable design file or a product walkthrough ([`skills/engineering/prototype/SKILL.md`](../../skills/engineering/prototype/SKILL.md); [`docs/engineering/prototype.md`](../engineering/prototype.md)).

### Observed gaps for a skills / agent landing site

Against the failure seed (weak articulation, weak walkthrough motion, weak design-before-build), the vendored skill leaves three holes:

| Gap | Why design-taste alone does not close it |
| --- | --- |
| **Product walkthrough / scroll storytelling** | Motion policy bans the usual landing walkthrough grammar (pinned sections, scrubbed UI reveals, section blur-ins). Quegenx, motiscope, and GSAP ScrollTrigger skills treat that grammar as the job ([Quegenx `landing-page-ui`](https://github.com/Quegenx/agent-skills/blob/main/skills/web-ui/landing-page-ui/SKILL.md); [motiscope `rebuild-site`](https://github.com/KumarSashank/motiscope/blob/main/skills/rebuild-site/SKILL.md); [gsap-scrolltrigger-storytelling](https://www.skills.sh/getpoweredbyai/designskills/gsap-scrolltrigger-storytelling)). |
| **Articulation of a marketing system** | design-taste deals heroes, palettes, and section recipes for many *kinds* of business. It does not ship a reusable marketing-site kit (site ≠ app tokens, letter-by-letter hero, story panels of real product screens, FAQ / discovery pages) the way Quegenx's `landing-page-ui` + `reference/` does ([skills.sh listing](https://www.skills.sh/quegenx/agent-skills/landing-page-ui)). Taste alone did not force a Herdr multi-pane hero, doors walkthrough beats, or a changelog-per-ticket cycle section. |
| **Design-before-code** | The plan is markdown and deal scripts, then HTML. There is no Penpot / canvas / MCP design file in the loop. Penpot's MCP path is design ↔ code through an open file ([Penpot MCP help](https://help.penpot.app/mcp/); [Penpot MCP product page](https://penpot.app/ai/mcp-server)). |

`SCOPE.md` still applies: a new skill needs an observed failure, must not duplicate what composition can do, and must pass `skill-eval` ([`SCOPE.md`](../../SCOPE.md)).

---

## 2. Candidate skills to ADD or COMPOSE

Judged against **observed failure / composes / evaluated**. Sources are the skill files or their first-party listings.

### 2.1 Quegenx `landing-page-ui`

| | |
| --- | --- |
| **Source** | https://github.com/Quegenx/agent-skills/blob/main/skills/web-ui/landing-page-ui/SKILL.md · https://www.skills.sh/quegenx/agent-skills/landing-page-ui · repo https://github.com/Quegenx/agent-skills |
| **Gap it fills** | Marketing site as one designed piece: own tokens apart from the app; hero letter assembly; story sections from real product screens; Motion / GSAP / CSS; FAQ, discovery, contact; copy-from-`reference/` production source. Motion is "generous but finite" (hero once; sections clear from blur; reduced-motion rules). |
| **SCOPE recommendation** | **Compose into design-taste, do not vendor whole.** Overlaps the landing job. Valuable delta: (a) site-vs-app separation, (b) product-screen story blocks, (c) reference source tree. Pull those into design-taste's software/SaaS plan and `sections-library`, not a second promoted anti-slop skill. Direct conflict: Quegenx wants scroll blur reveals; design-taste forbids them ([motion.md](../../skills/engineering/design-taste-frontend/references/motion.md)). Resolve with an explicit **software-marketing walkthrough exception** in design-taste, or an opt-in companion, before copying Quegenx motion wholesale. |

### 2.2 SkillMedev `animation-system`

| | |
| --- | --- |
| **Source** | https://github.com/SkillMedev/skills/blob/main/skills/animation-system/SKILL.md · https://www.skills.sh/skillmedev/skills/animation-system |
| **Gap it fills** | Product motion *system*: duration scale, named easings, choreography (stagger, anchor, 5-element cap), GPU-property ban, reduced-motion, per-component mapping. Explicitly not for one-off component specs (`motion-spec`) or kinetic type. |
| **SCOPE recommendation** | **Compose lightly / skip as a new skill.** design-taste already ships named motion tokens and transform/opacity-only rules ([motion.md Tokens](../../skills/engineering/design-taste-frontend/references/motion.md)). Steal the "publish a per-component mapping" deliverable if product UI (not the marketing site) drifts. Do not promote a second motion-system skill without a reflect note that the existing tokens failed. |

### 2.3 fusengine `design-motion`

| | |
| --- | --- |
| **Source** | https://github.com/fusengine/agents/blob/main/plugins/design-expert/skills/design-motion/SKILL.md · https://www.skills.sh/fusengine/claude-plugins/design-motion · https://agentmods.dev/skills/fusengine/agents/design-motion |
| **Gap it fills** | Motion pass *after* layout is settled; 4-question animation gate; bans AI signature `opacity:0 + translateY(20px) + ease-in-out` on every entrance; mandatory `prefers-reduced-motion` in the same pass; GSAP scroll skeletons as gated references. |
| **SCOPE recommendation** | **Compose into design-taste / review, do not add.** The gate and the AI-signature ban match this repo's anti-slop bar. The "never use motion to hide unfinished layout" rule is the right design-before-polish order. Scroll skeletons conflict with design-taste's scroll ban; use the gate, not the skeletons, unless the walkthrough exception lands. |

### 2.4 kensaurus `enhance-web-landing`

| | |
| --- | --- |
| **Source** | https://github.com/kensaurus/skills/blob/main/skills/enhance-web-landing/SKILL.md · catalog https://github.com/kensaurus/cursor-kenji/blob/main/docs/CATALOG.md · https://github.com/kensaurus/skills |
| **Gap it fills** | Anti-slop landing with brief inference, VARIANCE / MOTION / DENSITY dials, preflight, GSAP sticky-stack / horizontal-pan skeletons. Changelog notes lineage from Leonxlnx/taste-skill ([kensaurus CHANGELOG](https://github.com/kensaurus/cursor-kenji/blob/main/CHANGELOG.md)). MIT in frontmatter. |
| **SCOPE recommendation** | **Do not add / do not vendor.** This repo already vendors the tasteskill line as `design-taste-frontend` ([`UPSTREAM.md`](../../UPSTREAM.md); ask-yami routing). Adding enhance-web-landing would duplicate the promoted surface and fight the same agent for triggers. If dials language is useful, fold a short dial line into design-taste's plan step 3. |

### 2.5 motiscope `rebuild-site`

| | |
| --- | --- |
| **Source** | https://github.com/KumarSashank/motiscope/blob/main/skills/rebuild-site/SKILL.md · https://github.com/KumarSashank/motiscope · MIT ([LICENSE](https://github.com/KumarSashank/motiscope/blob/main/LICENSE)) |
| **Gap it fills** | Rebuild a multi-section landing from a **walkthrough screen recording**: measured section timing, curated frames, site plan (system + sections + motion), then GSAP ScrollTrigger (or css / framer) build. Rights / attribution step for third-party designs. |
| **SCOPE recommendation** | **New skill only if the observed failure is "recreate from a recording".** For authoring *this* repo's own site from scratch, it is the wrong tool (it needs a video of something that already moves well). Fits `misc/` or `in-progress/` as a research-to-code study aid, not the promoted engineering set, unless reflect shows repeated walkthrough-clone jobs. Composes with design-taste *after* rebuild if you want the gate. |

### 2.6 Related skills.sh finds (same gap cluster)

| Skill | Source | Gap | SCOPE |
| --- | --- | --- | --- |
| **kiln `motion-direction`** | https://www.skills.sh/kiln-skills/kiln/motion-direction | Forces a per-section motion plan table (role / intensity / effect / tool) before code. | **Compose** into design-taste plan step 3 ("why it moves" already exists in motion.md; promote it to a required table for software landings). |
| **`gsap-scrolltrigger-storytelling`** | https://www.skills.sh/getpoweredbyai/designskills/gsap-scrolltrigger-storytelling | Sticky product storytelling, scrubbed UI reveals, progressive interface states. | **Conflict with design-taste scroll ban.** Candidate for an **opt-in walkthrough skill** or design-taste exception for `site-kind=software` product demos, not a silent second default. |
| **elayadesign `design-to-motion`** | https://www.skills.sh/elayadesign/ai-design-skills/design-to-motion | Animate a settled design (exact frame → empty → load → act → loop); not product interaction motion. | **Compose** with design-before-build: Penpot/OpenPencil settle frame, then this grammar for showcase loops. Do not promote until design-before-build exists. |
| **nexu-io `cinematic-landing-page`** | https://www.skills.sh/nexu-io/open-design/cinematic-landing-page | Locked seed `example.html` for one bakery B2B cinematic page. | **Skip / misc.** One-off seed, not a reusable skill for this fork's bar. |
| **`product-motion-design`** | https://www.skills.sh/divyanshu-iitian/agent-website-design-skills/product-motion-design | Hierarchy / causality / state motion; choose CSS vs Motion vs GSAP vs Three. | **Compose** ideas; overlaps fusengine + SkillMedev. |

### Compose-vs-new summary

| Action | Candidates |
| --- | --- |
| **Compose into `design-taste-frontend` + ask-yami** | Quegenx site-vs-app + story panels; kiln motion table; fusengine animation gate + AI-signature ban; optional software walkthrough exception |
| **Do not add (duplicate)** | kensaurus `enhance-web-landing` (do not vendor) |
| **New only with reflect evidence** | motiscope `rebuild-site`; dedicated scroll-storytelling skill |
| **Design-before-build is not a skill gap alone** | Prefer MCP + workflow docs / thin user-invoked skill that *opens* Penpot (or OpenPencil) before build |

---

## 3. Design-before-build FOSS path

### 3.1 Penpot (primary recommendation for FOSS design ↔ agent)

| Dimension | Finding | Source |
| --- | --- | --- |
| **What it is** | Open-source design & prototyping platform; self-host or SaaS; design expressed with open web standards. | https://github.com/penpot/penpot |
| **License** | **MPL-2.0** (file-level copyleft on modified covered files; Larger Works allowed under other terms). Not AGPL. | https://github.com/penpot/penpot/blob/main/LICENSE · repo license badge |
| **Agent readiness** | First-party **MCP server**: agent reads/writes components, styles, tokens, pages, layers; design-to-code and code-to-design. | https://help.penpot.app/mcp/ · https://github.com/penpot/penpot/blob/main/docs/mcp/index.md · https://penpot.app/ai/mcp-server |
| **Local tools** | `execute_code`, `high_level_overview`, `penpot_api_info`, `export_shape`, `import_image` (remote MCP drops local-path import; export limited). | https://help.penpot.app/mcp/ |
| **Setup** | Remote: account Integrations → MCP key + URL (`design.penpot.app/mcp/stream?userToken=…`), File → MCP Server → Connect. Local: `npx @penpot/mcp@stable`, load plugin from `http://localhost:4400/manifest.json`. Cursor setup documented. | https://help.penpot.app/mcp/ · https://penpot.app/blog/set-up-penpot-mcp-with-cursor-in-5-steps-and-no-code/ · https://www.npmjs.com/package/@penpot/mcp |
| **Operational caveats** | MCP follows the **focused page** in **one** active tab; tab sleep freezes the plugin; agents can write the file (start read-only). Frontier VLM recommended. You bring your own LLM tokens; MCP itself is free/open. | https://help.penpot.app/mcp/ · https://penpot.app/ai/mcp-server |
| **Related first-party** | Integrations / API surface; AI workflows and whitepaper for design-as-code context. | https://penpot.app/integrations-api · https://penpot.app/ai/ai-workflows · https://penpot.app/blog/penpot-ai-whitepaper/ |
| **Fit for this repo** | Strongest "design file the agent and human share before HTML" that stays FOSS and MCP-native. Matches SCOPE "composes": use with existing skills, do not replace design-taste. |

### 3.2 tldraw agent starter kit (canvas agent, not a Figma replacement)

| Dimension | Finding | Source |
| --- | --- | --- |
| **What it is** | Starter that puts a chat agent on a tldraw canvas: create/update/delete shapes, viewport, todos, modes (working / critique), streaming actions. Good for wireflows and Herdr pane layouts before polish. | https://tldraw.dev/starter-kits/agent · `npm create tldraw@latest -- --template agent` |
| **Template license** | Starter kit / examples presented as **MIT**-usable; agent-template repo LICENSE.md is MIT. | https://github.com/tldraw/agent-template/blob/main/LICENSE.md · https://tldraw.dev/blog/tldraw-sdk-4-0 |
| **SDK license caveat** | **Not open source.** SDK is source-available under the tldraw license: **dev free**; **production needs** trial, commercial, or hobby license key. Hobby keeps watermark. Official FAQ: "Is the tldraw SDK open source? No." | https://tldraw.dev/community/license · https://tldraw.dev/sdk-features/license-key · https://tldraw.dev/faq |
| **MCP** | No first-party Penpot-style MCP in the starter docs; agent is in-app / programmatic (`agent.prompt(...)`), not an MCP bridge to Cursor by default. | https://tldraw.dev/starter-kits/agent |
| **Fit** | Excellent for **whiteboard / diagram / layout sketching with an agent on localhost**. Weak as the durable FOSS "Figma alternative" for a shipping marketing design system. Fine for private design-before-build *experiments*; production embedding of the SDK has license cost. Prefer internal prototypes, not shipping the canvas in the public site unless a license is cleared. |

### 3.3 Other FOSS / agent-ready options

| Tool | License / openness | Agent / MCP | Notes | Source |
| --- | --- | --- | --- | --- |
| **OpenPencil** | Claims **MIT** for editor, engine, `.fig` codec, CLI | Built-in agent + **MCP** (stdio/HTTP); CLI headless; Cursor / Claude Code listed | Opens `.fig` / `.pen`; local-first; 126 MCP tools claimed | https://openpencil.dev/ |
| **Pigma** | **MIT** | MCP bridge (`get_design_context`, `use_pigma`, …); `npm run mcp` / relay | Browser editor; local files; agent needs relay/desktop, not static GitHub Pages alone | https://github.com/josei/pigma |
| **pen.dev (Pencil)** | **Not FOSS** (paid agent days; MCP on local `.pen`) | MCP to open local files | Useful commercially; fails "FOSS path" requirement | Secondary survey pointer: https://kite.new/alternatives/figma-mcp (verify on pen.dev before depending) |
| **Excalidraw / Mermaid** | Adjacent via `mermaid-validator` in this repo | Diagrams, not full landing art direction | Fine for structure sketches; not a design-system canvas | local mermaid-validator skill |

### 3.4 Comparison for *this* fork

| Criterion | Penpot | tldraw agent kit | OpenPencil / Pigma |
| --- | --- | --- | --- |
| True FOSS design platform | Yes (MPL-2.0) | No (SDK commercial) | Yes (MIT) |
| Mature team product / self-host story | Strong | N/A (embed SDK) | Younger / active |
| First-party MCP into coding agents | Yes | No (in-app agent) | Yes |
| Best for | Settled UI frames, tokens, design↔code | Sketch / critique canvas on localhost | Local `.fig` + agent, MIT stack |
| License trap | MPL file-level share-alike on modified Penpot files if you fork the product | Production key / watermark | Verify package LICENSE files in the repos before vendoring |

**Practical FOSS path (updated preference):** prefer **OpenPencil** as the design-before-build gate: local `.fig` in git, CLI without the app for export/inspect/`tool call`, MCP (`@open-pencil/mcp`) from Cursor/Claude, official agent skill (`npx skills add open-pencil/open-pencil`), and `.fig` / PNG / HTML / Storybook export ([CLI exporting](https://openpencil.dev/programmable/cli/exporting); [MCP](https://openpencil.dev/programmable/mcp-server); [coding agents](https://openpencil.dev/programmable/coding-agents)). Keep **Penpot** as the backup if a collaborative multi-user cloud canvas matters more than CLI + `.fig`. Use **tldraw** only for throwaway layout critique (aligns with `/prototype`); do not embed the tldraw SDK in production site code without a license key.

---

## 4. Herdr review path

### 4.1 What already exists

**terminal-browser** runs a real browser in a terminal pane, can `--split` beside the agent, open a URL or local HTML, and drive the page with an agent-browser-compatible CLI (`snapshot`, click, fill, eval, WebMCP when the page exposes it). Upstream use cases and Herdr install live in the [herdr-plugin README](https://github.com/zenbu-labs/terminal-browser/blob/9265a06fb875e5ed810359bbf007bd46d1156a3a/herdr-plugin/README.md); CLI behaviour matches the published `terminal-browser open` / `action` interface described there and in the [setup gist](https://gist.github.com/yoelgal/ada4912b477050e63f00c1f3782137a6).

**Herdr plugin API** (v1): plugins declare `[[panes]]`, `[[actions]]`, `[[link_handlers]]`; pane placements include `split`, `tab`, `overlay`, `popup`, `zoomed`; the Herdr CLI is the plugin API ([https://herdr.dev/tui/docs/plugins/](https://herdr.dev/tui/docs/plugins/)).

**terminal-browser as Herdr plugin:** install `zenbu-labs/terminal-browser/herdr-plugin`; actions such as `open-split` / `open-url`; pane entrypoint with `placement = "split"`; optional `^https?://` link handler (Ctrl+click). Documented use case: agent and website in the same tab; open HTML plans in a split ([plugin README](https://github.com/zenbu-labs/terminal-browser/blob/9265a06fb875e5ed810359bbf007bd46d1156a3a/herdr-plugin/README.md); [PR #63](https://github.com/zenbu-labs/terminal-browser/pull/63)).

This repo's Herdr docs cover control / guide / Desktop, not a design-review plugin ([`docs/engineering/herdr.md`](../engineering/herdr.md)).

### 4.2 Adjacent Herdr browser plugins (ecosystem)

Community plugins already put a real browser beside an agent. Useful as existence proof that "review URL in a pane" is a Herdr pattern, not a new category:

| Piece | What it does | Source |
| --- | --- | --- |
| `official.browser` / herdr-browser | Chromium in a Herdr pane; agent MCP + human takeover | https://github.com/salamituns/herdr-browser · https://github.com/ogulcancelik/herdr-browser |
| herdr-plannotator | Opens a review **URL** in a focused browser pane | https://github.com/plannotator/herdr-plannotator |
| herdr-reviewr | Diff review beside the agent (code, not design) | https://github.com/persiyanov/herdr-reviewr |

For *this* fork's installed skills, prefer **terminal-browser** (already on the agent skill path) unless a session is already on herdr-browser.

### 4.3 Opening Penpot or tldraw in a pane

| Target | How | Limits |
| --- | --- | --- |
| **Penpot SaaS** | `terminal-browser open https://design.penpot.app/... --split right` (or Herdr `open-url` / herdr-browser equivalent) | Full web app in a terminal-embedded browser; usable for **visual review** and coarse navigation. Penpot MCP still expects a **focused Penpot tab** with the MCP plugin connected ([help.penpot.app/mcp](https://help.penpot.app/mcp/)). A browser pane *can* be that tab if it stays awake and the plugin connects; treat tab-sleep warnings seriously. |
| **Self-hosted Penpot** | Same, against your origin | Keep-alive / PNA rules for local MCP plugin still apply ([npm `@penpot/mcp`](https://www.npmjs.com/package/@penpot/mcp)). |
| **tldraw agent kit** | Run `npm create tldraw…` locally; `terminal-browser open http://localhost:<port> --split right` | Good side-by-side sketch review. Agent that *draws* is the tldraw in-app agent, not Herdr. |
| **Built marketing HTML** | `terminal-browser open ./index.html --split right` then `terminal-browser action` for scroll / snapshot | Matches design-taste's own browser gate spirit; already the cheapest review loop. |

There is **no** first-party Herdr "Penpot plugin" in the Herdr marketplace docs reviewed; the reusable piece is **browser pane + URL**, not a design-tool-specific host ([plugins docs](https://herdr.dev/tui/docs/plugins/); marketplace is GitHub topic `herdr-plugin`).

### 4.4 What a dedicated Herdr design-review plugin would need

A thin plugin (not a second browser) could:

1. **`[[actions]]`** `review-design`: invoke terminal-browser / herdr-browser `open-url` with a configured Penpot file URL or local preview URL.
2. **`[[panes]]`** optional named entrypoint that always splits right (same pattern as terminal-browser's pane).
3. **Checklist script** that prints the design-taste / articulation checks (hero one screen, product screens real, motion plan table present, reduced-motion) into the agent pane; actual pixel review stays on browser snapshots.
4. **Not** reimplement Penpot MCP. MCP stays in the coding agent (Cursor/Claude). Herdr owns *layout of human attention* (agent left, design right).
5. **Link handler** only if you want `penpot.app` / `localhost` design URLs to open in-pane; avoid claiming all `^https?://` if terminal-browser already does ([PR #63 consent notes](https://github.com/zenbu-labs/terminal-browser/pull/63)).

**Verdict:** Yes, a Herdr plugin *can* navigate/review designs in panes, but today that is **compose terminal-browser (or herdr-browser) + Penpot URL + agent MCP**, not a missing Herdr core feature. A custom plugin is polish (one action, defaults, checklist), not a prerequisite.

---

## 5. Concrete recommendation: top next actions

Ordered for this repo's bar (compose first, new skill only with evidence, evaluate before merge). Prefer these three over inventing a parallel promoted skill or vendoring kensaurus.

### Action 1: Docs + workflow: OpenPencil-before-build gate (highest leverage)

Write a short engineering note (or a section in a future design-taste docs page) that states:

1. For software/SaaS marketing and UI-heavy tickets: settle structure in **OpenPencil** (`.fig` under the repo, MCP and/or CLI) **before** production HTML / `gate.mjs --start`.
2. Agent may create and edit via MCP or `openpencil tool call … --write`; human OK is required before implementing in `site/` or app code ([MCP workflow](https://openpencil.dev/programmable/mcp-server)).
3. Review loop: OpenPencil desktop for canvas; Herdr + `terminal-browser` on exported HTML/PNG or local Vite preview for side-by-side with the coding agent.
4. Export artifacts the coding flow can consume: `openpencil export design.fig -f png|html|fig|storybook` ([exporting](https://openpencil.dev/programmable/cli/exporting)).

Spike: one hero + doors frame as `.fig`, human review, then implement. Pair with ask-yami when the docs land.

### Action 2: Patch `design-taste-frontend` for motion plan + walkthrough (skill draft as a patch, not a sibling skill)

Draft a changeset that:

1. Adds a **required motion plan table** for `site-kind=software` (steal kiln `motion-direction` shape) into the page plan step.
2. Adds an explicit **product walkthrough** section recipe (real app frames, progressive states, Herdr multi-pane showcase beats) using tools design-taste already allows (`fx-tabs` / app-frame / sticky moment), and documents when a **scroll-scrub exception** is allowed vs forbidden.
3. Imports the fusengine **animation gate** + **AI entrance-signature ban** into `motion.md` / finish checks.
4. Optionally points at Quegenx `reference/` patterns for site-vs-app tokens without vendoring the whole skill.
5. Wires ask-yami so "landing", "marketing page", "walkthrough", or "hero showcase" still lands on design-taste (patched), not a new duplicate.

Run `skill-eval` on the patched skill before merge ([`SCOPE.md`](../../SCOPE.md)).

### Action 3: Site kit / in-progress scroll skill only if Action 2 is not enough

If the landing still cannot tell a product story under the scroll ban:

1. Put an **`in-progress/landing-walkthrough`** (or misc) skill that owns GSAP ScrollTrigger storytelling and declares it **overrides** design-taste scroll rules for that page only; or
2. Ship a **checked-in site kit** (starter sections + measured walkthrough: doors beats, changelog-per-ticket cycle, branch lineage naming) under the docs site / marketing folder, reviewed in terminal-browser, without promoting a second anti-slop skill.

Defer **motiscope** and **tldraw production embeds** until there is a reflect note that names the failed session. Prefer **OpenPencil** (CLI + `.fig` + MCP) as the durable FOSS design file; Penpot remains the cloud-collab fallback ([OpenPencil](https://openpencil.dev/); [tldraw license](https://tldraw.dev/community/license)). Do **not** vendor Quegenx, fusengine, or kensaurus wholesale.

---

## 6. OpenPencil decision: skills, flow, coding integration

Decision seed: OpenPencil wins for this fork because agents can drive it headless via CLI, round-trip `.fig`, and use the same MCP tools from Cursor without a paid Figma seat ([CLI](https://openpencil.dev/reference/cli); [MCP](https://openpencil.dev/programmable/mcp-server)).

### Artifact paths

| Path | Job |
| --- | --- |
| `.ui-designs/<surface>/` | Draft canvases (`.fig`, exports). Committed; do not gitignore when packs link here. |
| `docs/agents/ui-design/` | Durable system + per-surface rules across releases. |
| `docs/agents/releases/<N>/design.md` | This release's pack + human approval. |

### Skills required (compose first)

| Skill | Status | Job |
| --- | --- | --- |
| **`open-pencil/open-pencil`** (upstream) | Install via `npx skills add open-pencil/open-pencil` | How to use CLI, MCP, JSX render, eval. Do not re-author; wrap. |
| **`release-ui-design`** (in-progress door) | Drafted | Opens release → publish specs → OpenPencil settle → approve pack → stop. Then `/ship-release`. |
| **`ship-release` / `release-flow`** | Soft hook | No OpenPencil inside. If pack approved, enrich UI tickets; if missing, unchanged; if unapproved, stop. |
| **`design-taste-frontend` (patch still open)** | Existing | Motion plan + walkthrough recipe; still owns taste + gate when building HTML. |
| **`prototype`** | Keep as-is | Throwaway variants *without* a durable `.fig`. |
| **`ask-yami`** | Patched | Routes UI-first release to `/release-ui-design`, then `/ship-release`. |
| **`terminal-browser` / Herdr** | Existing | Review exports or Vite preview beside the agent. |

Do **not** promote a second full landing skill. Do **not** put design settle inside `ship-release`.

### Flow required (happy path)

```text
/release-ui-design <N>
  → open release + name features
  → publish every spec (no tickets)
  → bootstrap or reuse docs/agents/ui-design/
  → settle .ui-designs/<surface>/ in OpenPencil
  → write docs/agents/releases/<N>/design.md → human OK
  → stop

/ship-release <N>
  → if pack approved: slice tickets with screen/frame acceptance
  → else if pack missing: today's ship
  → build / land / tag
```

CLI anchors:

```bash
openpencil info .ui-designs/site/landing.fig
openpencil tree .ui-designs/site/landing.fig
openpencil export .ui-designs/site/landing.fig -f png -o .ui-designs/site/exports/
openpencil tool call <name> .ui-designs/site/landing.fig --args '…' --write
```

### Where it sits in the coding process

| Level | When OpenPencil runs | What lands |
| --- | --- | --- |
| **UI-first release** | `/release-ui-design` after specs, before tickets | Pack + `.ui-designs/` + ui-design docs; then `/ship-release` |
| **Default release** | Never (no pack) | `/ship-release` as today |
| **Marketing build inside a ticket** | Optional under design-taste after plan | `.fig` under `.ui-designs/` when the ticket owns UI |
| **Hotfix / pure logic** | Skip | No design phase |

### Articulation skills / capabilities to bake in

Steal structure, do not vendor whole skills:

1. **Section story plan** (from Quegenx): ordered blocks (hero → problem → product proof → walkthrough → doors/cycle → CTA); every claim beside a real product screen.
2. **Motion plan table** (from kiln): per section: role / intensity / effect / tool; required for software landings inside design-taste.
3. **Animation gate + AI-signature ban** (from fusengine): purpose before keyframes; ban uniform `opacity:0 + translateY(20px)`.
4. **Product walkthrough recipe** (compose): Herdr grid beats, door authority columns, changelog-per-ticket cycle; progressive states with taste-allowed tools first; scroll-scrub only as documented exception.
5. **Release design pack checklist**: specs → `.ui-designs/` frames → exports → approval stamp → `/ship-release`.

Optional later (`in-progress/` only if reflect demands it): scroll-walkthrough override skill. Not day one.

---

## Sources index

| Topic | URL |
| --- | --- |
| Repo scope bar | local `SCOPE.md` |
| design-taste-frontend | local `skills/engineering/design-taste-frontend/SKILL.md`, `references/motion.md` |
| prototype | local `skills/engineering/prototype/SKILL.md` |
| Penpot MCP help | https://help.penpot.app/mcp/ |
| Penpot MCP in-repo docs | https://github.com/penpot/penpot/blob/main/docs/mcp/index.md |
| Penpot MCP product | https://penpot.app/ai/mcp-server |
| Penpot Cursor setup | https://penpot.app/blog/set-up-penpot-mcp-with-cursor-in-5-steps-and-no-code/ |
| Penpot integrations | https://penpot.app/integrations-api |
| Penpot AI workflows | https://penpot.app/ai/ai-workflows |
| Penpot AI whitepaper | https://penpot.app/blog/penpot-ai-whitepaper/ |
| `@penpot/mcp` | https://www.npmjs.com/package/@penpot/mcp |
| Penpot license | https://github.com/penpot/penpot/blob/main/LICENSE |
| tldraw agent kit | https://tldraw.dev/starter-kits/agent |
| tldraw license | https://tldraw.dev/community/license |
| tldraw license keys | https://tldraw.dev/sdk-features/license-key |
| tldraw FAQ (not OSS) | https://tldraw.dev/faq |
| tldraw agent-template | https://github.com/tldraw/agent-template/ |
| Quegenx landing-page-ui | https://github.com/Quegenx/agent-skills/blob/main/skills/web-ui/landing-page-ui/SKILL.md |
| SkillMedev animation-system | https://github.com/SkillMedev/skills/blob/main/skills/animation-system/SKILL.md |
| fusengine design-motion | https://github.com/fusengine/agents/blob/main/plugins/design-expert/skills/design-motion/SKILL.md |
| kensaurus enhance-web-landing | https://github.com/kensaurus/skills/blob/main/skills/enhance-web-landing/SKILL.md |
| motiscope rebuild-site | https://github.com/KumarSashank/motiscope/blob/main/skills/rebuild-site/SKILL.md |
| kiln motion-direction | https://www.skills.sh/kiln-skills/kiln/motion-direction |
| gsap-scrolltrigger-storytelling | https://www.skills.sh/getpoweredbyai/designskills/gsap-scrolltrigger-storytelling |
| OpenPencil | https://openpencil.dev/ |
| Pigma | https://github.com/josei/pigma |
| Herdr plugins | https://herdr.dev/tui/docs/plugins/ |
| terminal-browser Herdr plugin | https://github.com/zenbu-labs/terminal-browser/blob/9265a06fb875e5ed810359bbf007bd46d1156a3a/herdr-plugin/README.md |
| terminal-browser plugin PR | https://github.com/zenbu-labs/terminal-browser/pull/63 |
| herdr-browser | https://github.com/salamituns/herdr-browser · https://github.com/ogulcancelik/herdr-browser |
| herdr-plannotator | https://github.com/plannotator/herdr-plannotator |
| herdr-reviewr | https://github.com/persiyanov/herdr-reviewr |
