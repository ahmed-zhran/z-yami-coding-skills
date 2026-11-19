# Skill Evaluation: html-artifacts

> Evaluated: 2026-11-19
> Source: `skills/productivity/html-artifacts/`
> Evaluator: skill-evaluation v2.1.0
> Framework: [Anthropic Skill Best Practices](https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills) + Matt Pocock's [writing-great-skills](https://www.youtube.com/watch?v=UNzCG3lw6O0)

## Summary

| Metric | Value |
|--------|-------|
| Overall Score | 85.74/100 |
| Grade | A |
| Category | code-scaffolding-and-templates (primary action: emit a self-contained HTML file; conditionals overridden N/A) |
| Invocation | model-invoked |
| Files | SKILL.md + 12 references + LICENSE + NOTICE + agents/openai.yaml |
| Criteria scored / N/A | 14 scored, 4 N/A |

`score.py` input: `1:90:2 2:85:2 3:95:1 4:95:2 5:90:2 6:92:1 7:75:2 8:85:2 9:70:2 10:90:2 11:88:1 12:80:2 13:82:1 14:95:1 15:NA:1 16:NA:1 17:NA:1 18:NA:1`

## Scorecard

### Axis 1: Trigger

| # | Criterion | Weight | Score | Notes |
|---|-----------|--------|-------|-------|
| 1 | Invocation design | 2x | 90/100 | Model-invoked fits: format judgment should fire without a slash. `SKILL.md` frontmatter omits `disable-model-invocation`. |
| 2 | Description quality | 2x | 85/100 | Leads with "Produce"; one trigger per branch; package carve-outs named in the description (durable SoT, `pr`, `improve-codebase-architecture`). Slightly long for always-loaded context. |

### Axis 2: Structure

| # | Criterion | Weight | Score | Notes |
|---|-----------|--------|-------|-------|
| 3 | Steps vs. reference clarity | 1x | 95/100 | Workflow is five ordered steps; category patterns live in `references/`. |
| 4 | Branch-aware disclosure & pointers | 2x | 95/100 | Category index table: "If the request is about… Read…". |
| 5 | Conciseness | 2x | 90/100 | SKILL.md ~118 lines; bulk disclosed. |
| 6 | Coherent scope | 1x | 92/100 | Format judgment only; siblings named for architecture HTML and PR bodies. |

### Axis 3: Steering

| # | Criterion | Weight | Score | Notes |
|---|-----------|--------|-------|-------|
| 7 | Leading words | 2x | 75/100 | *judgment call*, *artifact*, *round trip*, *verify*. Could collapse more prose into one house word. |
| 8 | Completion criteria & legwork | 2x | 85/100 | Rule 8 + verify reference; workflow step 5 ends on verified delivery. |
| 9 | Gotchas section | 2x | 70/100 | Carve-outs and "What this skill is not" plus per-reference Common mistakes; no single Gotchas heading. |
| 10 | Grounded in expertise | 2x | 90/100 | Upstream from observed HTML-vs-markdown need (Thariq / dogum); package carve-outs from this repo's SoT and `/improve-codebase-architecture`. |
| 11 | Avoids railroading | 1x | 88/100 | Decide lists + category refs; defaults over menus. |

### Axis 4: Pruning

| # | Criterion | Weight | Score | Notes |
|---|-----------|--------|-------|-------|
| 12 | No-ops (deletion test) | 2x | 80/100 | Mild restatement between description carve-outs and "In this package" / "Stay in markdown" (intentional for trigger + body). |
| 13 | Single source of truth | 1x | 82/100 | Category details only in references; package carve-outs also in ask-yami/docs (router, not skill body duplication of rules). |
| 14 | Relevance & sediment | 1x | 95/100 | Fresh v2.0.0 pin; no stale CDN or path leftovers after overlay. |

### Conditional criteria

| # | Criterion | Weight | Score | Notes |
|---|-----------|--------|-------|-------|
| 15 | Setup flow | 1x | N/A | Not a library/setup skill. |
| 16 | Memory mechanism | 1x | N/A | Stateless deliverable skill. |
| 17 | Scripts & libraries | 1x | N/A | `verify.mjs` is an example inside a reference, not a packaged skill script. |
| 18 | On-demand hooks | 1x | N/A | No hook surface. |

## Trigger Eval

Trigger eval: skipped (no sub-agent spawn in this authoring session). Prompts recorded for regression:

### Prompts tested (design only)

| # | Prompt | Expected | Triggered | Other skills |
|---|--------|----------|-----------|--------------|
| 1 | Compare three ways to implement debounced search and recommend one | should-trigger | n/a | |
| 2 | Make an interactive explainer for consistent hashing I can share | should-trigger | n/a | |
| 3 | Build a triage board for these 24 tickets and let me export markdown | should-trigger | n/a | |
| 4 | Draw a flowchart of our deploy pipeline as a page | should-trigger | n/a | |
| 5 | Write a post-mortem for yesterday's outage as a shareable page | should-trigger | n/a | |
| 6 | Open a PR for this branch with a good description | should-not-trigger | n/a | pr |
| 7 | Add a term to GLOSSARY.md for Order intake | should-not-trigger | n/a | domain-modeling |
| 8 | Survey this repo for deepening opportunities | should-not-trigger | n/a | improve-codebase-architecture |
| 9 | What does this one function do in one sentence | should-not-trigger | n/a | none |
| 10 | Write an ADR for choosing Postgres | should-not-trigger | n/a | domain-modeling / grill-with-docs |

## Failure-mode diagnosis

| Mode | Finding |
|------|---------|
| Premature completion | Low risk: verify step is explicit. |
| Weak steering | Leading words only medium-strong (#7). |
| Duplication | Carve-outs repeated description ↔ body (acceptable for trigger). |
| Sediment | None at pin. |
| Sprawl | Contained by disclosure. |
| No-ops | Minor restatement only. |
| Buried steps | Workflow stays above the fold. |

## Prioritized Actions

1. After a few consumer sessions, tighten the description if context load shows over-trigger on "spec"/"review" (already partially carved).
2. Consider a short Gotchas heading that points at the three package carve-outs only (drop restatement elsewhere if that lands).
3. Re-run trigger eval with sub-agents before the next pin bump.

## Bonus patterns

| Bonus | Status |
|-------|--------|
| Validation loops | Present (rule 8 / verify-before-delivering) |
| Output templates | Present (example sketches in references) |
| Procedures over declarations | Present (workflow + decide lists) |
| Defaults over menus | Present (baseline CSS; category index) |
| Trace-checkable steering | Partial (*judgment call*, *verify*) |

*Generated for the z-yami promotion of dogum/html-artifacts v2.0.0.*
