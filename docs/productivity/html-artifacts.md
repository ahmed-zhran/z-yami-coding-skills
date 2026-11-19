## What it does

`html-artifacts` decides when a long human-facing deliverable should be a self-contained `.html` page instead of markdown, then drafts and verifies that page. Markdown stays the default for chat, code, and anything read once and discarded. HTML wins when spatial layout, color, real diagrams, interactivity, or a round-trip editor would help the reader *do* something with the artifact.

It is a judgment call, not a format switch. The skill's job is to decide well, pick the right category reference, and check the page before you see it.

## When to reach for it

Type `/html-artifacts`, or the agent reaches for it automatically when a task fits (plans, explainers, comparisons, decks, dashboards, one-off editors, and similar).

| Situation | Format |
| --- | --- |
| Side-by-side options, visual plans, diagrams, decks, interactive explainers, triage editors | HTML via this skill |
| Short chat answers, code, commands, disposable summaries | Markdown |
| Durable sources of truth (`SKILL.md`, ADRs, `GLOSSARY.md`, research notes) | Markdown (offer an HTML *view* only when someone will read it as a page) |
| GitHub PR body | Markdown via [pr](https://aihero.dev/skills-pr) |
| Architecture deepening survey | [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) (owns its own HTML report) |

## Common questions

**Will this replace markdown for specs and skills?**

No. Durable files that live in git and get diffed stay markdown. This skill is for human-facing pages and tools, not for the repo's sources of truth.

**How is this different from `/improve-codebase-architecture`?**

That skill surveys deepening opportunities and already writes a dedicated HTML report for those candidates. Keep using it for architecture upkeep. Use `html-artifacts` for other long human-facing artifacts.

**Should PR descriptions become HTML?**

The body that lands on GitHub stays markdown (`/pr`). An HTML review tour or annotated-diff companion for humans is fine as a second artifact.

## It's working if

- Long comparisons, plans, or explainers open as a single self-contained `.html` file with real layout (columns, diagrams, navigation), not markdown wrapped in tags.
- Short replies, code, PR bodies, ADRs, and architecture surveys did not become HTML by accident.
- Interactive editors end with a copy/export back to text.
- The page was checked once (headless screenshots or a read-through) before you got the path.

## Where it fits

A **reach-for-it-anytime standalone** for deliverable format. Neighbours: [writing-for-agents](https://aihero.dev/skills-writing-for-agents) for docs agents read; [unslop](https://aihero.dev/skills-unslop) for cleaning prose humans read in markdown; [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) for architecture-candidate HTML; [pr](https://aihero.dev/skills-pr) for GitHub PR bodies. For which skill fits a situation, [ask-yami](https://aihero.dev/skills-ask-yami) is the router over the whole set.
