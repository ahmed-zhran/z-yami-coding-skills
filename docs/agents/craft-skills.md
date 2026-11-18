# Craft skills

Approved coding-craft router for this repo. `/implement` and `ticket-flow` read **only** this file before writing product code.

These skills fill the gap in the **coding itself** (framework, UI craft, mobile, backend architecture, SEO). They are not before-code gates and not after-code gates: `tdd`, typecheck, and `code-review` stay in the implement flow. Package vocabulary skills (`codebase-design`, `domain-modeling`) stay outside this table; other skills call them directly.

Written by `/empower-crafting` after you approve its proposal table. To change it, re-run that skill (it reads `craft-skills-draft.md` and your stack/architecture docs). Do not hand-merge the draft into this file. `/sync-skills` never overwrites this file.

**Rules**

1. Match the ticket (and the surfaces it touches) to every row that applies. One ticket can match several rows.
2. For each matched row, call the Skill tool with each named skill that is **installed** in this harness, then follow that skill while writing code. Do not invent the skill's content when it is missing: skip it and note the miss once.

| When the work is… | Call these skills (in order) | Why |
| --- | --- | --- |

No craft skills are approved yet. Run `/empower-crafting` (from the package draft plus this repo's stack) to fill this table.

After craft skills: continue the implement flow (`tdd` at seams, typecheck/tests, then `code-review`).
