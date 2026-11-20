# Craft skills draft

Package **candidates** for `/empower-crafting`. Sync may refresh this file from the published package. `/implement` and `ticket-flow` do **not** read it.

These rows close the gap in the **coding itself**: stack and library craft the model would otherwise invent. They are **not** before-code gates (branch, stack docs) and **not** after-code gates (`tdd`, typecheck, `code-review`, PR). Those stay in `implement` / `ticket-flow` and are never listed here.

`/empower-crafting` reviews this draft (plus surfaces, stack, architecture, and post-release evidence), proposes which rows to keep, drop, or replace, and after you approve writes the live router at `docs/agents/craft-skills.md`. Approved rows are installed into the consumer harness; none of these candidates ship inside the z-yami plugin by default.

Each row is **atomic**: one skill, one job. Stack-conditioned rows (Flutter vs RN, Supabase vs Prisma) are not alternatives; load the row whose **Scope** matches the surface stack.

**Approve this table before installing.** Every row below is Proposed until `/empower-crafting` installs it for that repo.

## All candidate craft skills

| Skill | Scope | Job / why / compose | Usage | Skill link |
| --- | --- | --- | --- | --- |
| `design-taste-frontend` | Web/product UI visual design: new screens, redesign, restyle, landing, marketing, polish, “looks generic / AI” | **ui-taste.** Default visual craft when chosen. Composes with `frontend-design`, React practice, and web guidelines. | Proposed. Install only after `/empower-crafting` approval. | https://www.skills.sh/leonxlnx/taste-skill/design-taste-frontend |
| `frontend-design` | Frontend structure and visual systems: layout, CSS architecture, distinctive production UI beyond tokens alone | **frontend-craft.** Builds real UI structure. Composes with `design-taste-frontend` (taste) and `web-design-guidelines` (audit bar). | Proposed. Load with taste when building or restyling UI. | https://www.skills.sh/anthropics/skills/frontend-design |
| `web-design-guidelines` | Web interface correctness: spacing, type, interaction, accessibility baselines while coding UI | **web-guidelines.** Prescriptive Vercel UI bar. Composes with taste + frontend-craft; does not replace them. | Proposed. Load on UI builds that need guideline/audit-level craft. | https://www.skills.sh/vercel-labs/agent-skills/web-design-guidelines |
| `emil-design-eng` | Motion, micro-interaction, and design-engineering polish | **motion-craft.** Interaction/motion craft. Composes with taste; use when the ticket moves UI, not for static layout alone. | Proposed. Load for motion/interaction-heavy UI work. | https://www.skills.sh/emilkowalski/skill/emil-design-eng |
| `vercel-react-best-practices` | React and Next.js app code: components, hooks, data fetching, performance | **react-practice.** Default React/Next coding craft. Composes with taste, frontend-craft, and composition patterns. | Proposed. Load when writing React/Next application code. | https://www.skills.sh/vercel-labs/agent-skills/vercel-react-best-practices |
| `vercel-composition-patterns` | React component APIs: compound components, avoiding boolean-prop sprawl, scalable composition | **react-composition.** Component-API craft, not a second “best practices” pick. Composes with `vercel-react-best-practices`. | Proposed. Load when designing or refactoring React component APIs. | https://www.skills.sh/vercel-labs/agent-skills/vercel-composition-patterns |
| `vercel-react-native-skills` | React Native / Expo mobile app code | **react-native.** RN coding craft. Composes with `design-mobile-apps` for product UI. | Proposed. Load on React Native surfaces. | https://www.skills.sh/vercel-labs/agent-skills/vercel-react-native-skills |
| `flutter-architecture` | Flutter app boundaries: UI, state, repositories, services | **flutter.** Flutter architecture craft while building features. | Proposed. Load on Flutter surfaces. | https://www.skills.sh/thienqo/flutter-skills/flutter-architecture |
| `design-mobile-apps` | Mobile product screens and mobile-first UI patterns (iOS/Android) | **mobile-ui.** Mobile product UI craft. Composes with RN or Flutter stack skills; not a web ui-taste substitute. | Proposed. Load for mobile product UI work. | https://www.skills.sh/sleekdotdesign/agent-skills/sleek-design-mobile-apps |
| `backend-architecture` | TypeScript/Node backend services: layer boundaries, lean implementations | **backend-arch.** Default backend coding craft for TS/Node services. | Proposed. Load when building or reshaping backend services/APIs. | https://www.skills.sh/we-are-singular/skills/backend-architecture |
| `supabase-postgres-best-practices` | Supabase / Postgres queries, schema, RLS, indexing | **supabase-data.** Data-access craft when the stack is Supabase/Postgres. | Proposed. Load when writing Supabase/Postgres data code. | https://www.skills.sh/supabase/agent-skills/supabase-postgres-best-practices |
| `seo-technical` | Technical SEO while building or fixing a site: crawl, index, CWV, schema, rendering | **seo.** Technical SEO craft for web surfaces. Composes with UI craft; does not replace content strategy. | Proposed. Load when shipping or hardening public web pages for search. | https://www.skills.sh/agricidaniel/claude-seo/seo-technical |

## Conflict rules (for `/empower-crafting`)

- Do not add a second skill for the same **Job** on the same surface.
- Prefer compose across jobs (ui-taste + frontend-craft + react-practice + seo) over duplicates.
- Prefer MIT/Apache and an obvious maintainer when replacing a row later.
- Never put `tdd`, `diagnosing-bugs`, `code-review`, `security-review`, `pr`, `changelog`, `codebase-design`, or `domain-modeling` here: the implement flow and other package skills already own those.
- Never put beta doors (`software-factory`) here unless the human already asked.
- Throwaway layout exploration stays `/prototype`, not a craft-skills row.
