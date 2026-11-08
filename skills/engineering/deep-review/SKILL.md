---
name: deep-review
description: "An extremely strict maintainability review of a branch: hunts for restructurings that delete complexity instead of moving it, and treats file sprawl, ad-hoc branching, boundary leaks, and pass-through wrappers as blockers. Use only when the user explicitly asks for a deep, harsh, strict, or thermo-nuclear code quality review, or passes --deep to code-review."
---

# Deep Review

A demanding audit of structure and maintainability. Where the Standards axis of `code-review` checks the diff against written rules, this review asks whether the change could be **dramatically simpler**, and refuses to approve working code that leaves the codebase messier.

It reports; it never edits. Big restructurings it proposes become new tickets, not scope added to the ticket under review: the implementation stayed small on purpose (the smallest complete change), and the structural follow-up is recorded instead of smuggled in.

Inspired by the thermo-nuclear code quality review in [cursor/plugins](https://github.com/cursor/plugins/tree/main/thermos).

## Inputs

- The diff: `git diff <fixed-point>...HEAD`, the fixed point from the caller or the branch's recorded base.
- The surface's architecture doc (`docs/agents/architecture/<surface>.md`) and `docs/agents/stack.md` when they exist. They define the **canonical layer** for each kind of logic, so "is this in the right place" is judged against the project's chosen architecture, not the reviewer's taste.
- Call the Skill tool with "codebase-design" for the vocabulary (deep module, seam, locality, leverage).

## What to hunt

**The code judo move.** For every meaningful change, ask whether a reframing would make whole branches, flags, modes, helpers, or layers disappear. A refactor that moves complexity around without reducing the number of concepts a reader holds is not an improvement.

Presumptive blockers, each needing a strong reason to stand:

- The diff pushes a file from under 1000 lines to over it (or past the architecture doc's ceiling).
- New ad-hoc conditionals bolted onto an unrelated flow ("weird ifs in random places"), one-off booleans, or nullable modes that complicate existing control flow.
- Feature logic leaking into a shared module, or implementation detail leaking through an interface.
- Logic in the wrong layer per the architecture doc, or a bespoke helper where a canonical one exists.
- Thin wrappers, identity abstractions, or pass-through helpers that add indirection without clarity.
- Casts, `any`, `unknown`, or optional parameters papering over an invariant that should be an explicit type.
- Partial updates that can leave state half-applied when an atomic shape is obvious.
- Independent work serialised for no reason, when the parallel version is also simpler.

## Report

Order findings by: structural regressions, missed dramatic simplifications, branching growth, boundary and type problems, file size, modularity, legibility. Prefer a few high-conviction findings over a long list; no cosmetic nits while structural issues stand.

```markdown
## Deep review

**Verdict:** APPROVE | REQUEST CHANGES

### <finding>
**Where:** path L10-40
**Problem:** <what makes the code harder to reason about>
**Simpler shape:** <the reframing, in a few lines of pseudocode or a file tree>
**Scope:** fix in this PR | follow-up ticket
```

Mark **fix in this PR** only for regressions the diff introduced. Anything that restructures code the diff did not create is a **follow-up ticket**: list them at the end so the caller can publish them (`/to-tickets`, or the issue tracker directly).

Be direct and serious, never rude. "This adds another special case to an already busy flow; can we move it behind its own module?" is the register.
