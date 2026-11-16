# Craft skills draft

Package **candidates** for `/empower-crafting`. Sync may refresh this file from the published package. `/implement` and `ticket-flow` do **not** read it.

These rows close the gap in the **coding itself**: stack and library craft the model would otherwise invent. They are **not** before-code gates (branch, stack docs) and **not** after-code gates (`tdd`, typecheck, `code-review`, PR). Those stay in `implement` / `ticket-flow` and are never listed here.

`/empower-crafting` reviews this draft (plus surfaces, stack, architecture, and post-release evidence), proposes which rows to keep, drop, or replace, and after you approve writes the live router at `docs/agents/craft-skills.md`.

## All candidate craft skills (one table)

| When the work is… | Skill | Job | In this package? | Source hint | Why / compose |
| --- | --- | --- | --- | --- | --- |
| Frontend **UI / visual design** (new screen, redesign, restyle, landing, marketing, polish, “looks generic / AI”) | `design-taste-frontend` | ui-taste | yes | vendored tasteskill | Default visual winner; do not install a second ui-taste |
| Extra frontend craft (layout systems, CSS architecture, composition beyond taste) | `frontend-design` | frontend-craft | no | skills.sh (Anthropic / ecosystem listing) | Composes with ui-taste; never a second taste skill |
| React / Next app code (components, hooks, data fetching, perf) | `vercel-react-best-practices` | framework-practice | no | skills.sh / Vercel lineage | Prefer as React/Next practice winner |
| React composition patterns | `vercel-composition-patterns` | framework-practice | no | skills.sh | Same job as above: pick **one** React practice winner |
| Generic React patterns (if not on Vercel stack) | `react-best-practices` | framework-practice | no | skills.sh (e.g. prisma-labs-dev/skills) | Alternate framework-practice; one winner only |
| Interaction / motion craft (when stack needs it) | `emil-design-eng` or `web-design-guidelines` | frontend-craft | no | skills.sh | Optional enhancer; drop if it fights taste motion rules |
| Flutter app architecture | `flutter-architecture` | mobile | no | skills.sh/thienqo/flutter-skills | Flutter architecture craft |
| Flutter architecture (official plugin line) | `flutter-apply-architecture-best-practices` | mobile | no | skills.sh/flutter/agent-plugins | Alternate mobile winner for Flutter |
| React Native | `vercel-react-native-skills` | mobile | no | skills.sh/vercel-labs/agent-skills | When stack is RN, not Flutter |
| Mobile product / screen patterns | `design-mobile-apps` | mobile | no | skills.sh | Only if mobile stack; check overlap with ui-taste |
| Module / interface design inside a surface (depth, seams, adapters) | `codebase-design` | module-design | yes | this package | Deep-module vocabulary while shaping code |
| Backend architecture / service boundaries | `backend-architecture` | backend-arch | no | search skills.sh / agenticskills.io | Placeholder name: empower picks a maintained MIT/Apache skill |
| Postgres / Supabase data access | `supabase-postgres-best-practices` | data-access | no | skills.sh/supabase/agent-skills | When stack fills that slot |
| Prisma / Postgres data access | Prisma postgres skills (e.g. `prisma-postgres`) | data-access | no | skills.sh/prisma/skills | Alternate data-access; one winner per data stack |
| Accessibility while building UI | a maintained a11y skill (empower names one) | a11y | no | skills.sh / agenticskills.io | Complements ui-taste; does not replace it |
| Browser verify while building UI | `agent-browser` | browser-verify | no | skills.sh/vercel-labs/agent-browser | Optional; complements taste’s gate |

## Conflict rules (for `/empower-crafting`)

- One winner per **Job** (do not install two skills that own the same job).
- Prefer skills that **compose across different jobs** (ui-taste + frontend-craft + framework-practice) over duplicates of one job.
- Prefer MIT/Apache and an obvious maintainer when candidates are equal.
- Never put `tdd`, `diagnosing-bugs`, `code-review`, `security-review`, `pr`, or `changelog` in this table: the implement flow already owns those.
- Never put beta doors (`release-ui-design`, `software-factory`) here unless the human already asked for that capability.
- Throwaway layout exploration stays `/prototype` (a detour), not a craft-skills row.
