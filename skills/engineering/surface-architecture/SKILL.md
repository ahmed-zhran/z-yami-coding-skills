---
name: surface-architecture
description: "Choose how code is organised inside one surface (feature modules, page-based, clean/hexagonal, vertical slices...), write its architecture doc, and enforce it with lint rules."
argument-hint: "The surface (e.g. 'admin', 'api')"
disable-model-invocation: true
---

# Surface Architecture

The stack says *what* a surface is built with. The **architecture doc** says *how code is written inside it*: where a new feature goes, which folder may import which, where state, data fetching, validation, and tests live. Without one, every agent session invents its own layout, and the surface drifts into a ball of mud one reasonable-looking ticket at a time.

This skill picks a style for one surface, writes `docs/agents/architecture/<surface>.md`, records the choice as an ADR, and makes the import rules **mechanical**: a broken rule fails lint, not review.

Call the Skill tool with "codebase-design" for the deep-module vocabulary (module, interface, seam, depth, locality). Use it in the doc.

## Process

### 1. Explore

Read `docs/agents/surfaces.md`, `docs/agents/stack.md`, existing ADRs, and the surface's current tree. Note its size, its stack, how it is already organised (even if inconsistently), and the hot spots in recent history. An existing de facto layout that works is a candidate, not something to replace by default.

### 2. Choose the style

Call the Skill tool with "grilling". Lead with a recommendation. Common styles:

| Surface | Style | Fits when |
|---------|-------|-----------|
| Frontend | **Feature modules** (`features/<name>/` owning its UI, hooks, API calls, tests; `shared/` for the rest) | Most apps; features change independently |
| Frontend | **Route/page-based** (colocate under the router's file tree) | Small apps, or frameworks with file routing where a page is the unit |
| Frontend | **Feature-Sliced Design** (`app / pages / widgets / features / entities / shared`, imports only downward) | Large apps, many contributors, strict layering wanted |
| Backend | **Layered** (routes, services, repositories) | CRUD-heavy, small domain |
| Backend | **Clean / hexagonal** (domain core, ports, adapters at the edge) | Rich domain rules, several I/O adapters, long life |
| Backend | **Vertical slices** (one folder per use case, end to end) | Many independent use cases, little shared logic |
| Package | **Deep module** (small public entry files, everything else private) | Shared libraries |

Settle, one at a time: the style; the folder tree; what each layer or folder owns; the **dependency rule** (who may import whom); where state, data fetching, validation, errors, and tests go; naming; file-size ceiling (default: split before 400 lines, never cross 1000); and the shared-code policy (what earns a place in `shared/`).

### 3. Write the architecture doc

Write `docs/agents/architecture/<surface>.md`:

```markdown
# <Surface> architecture

**Style:** <style> ([ADR-NNNN](../../adr/NNNN-...md))

## Tree
<annotated folder tree>

## Dependency rule
<who may import whom; a short table or list>

## Where things go
| Concern | Location | Rule |
|---------|----------|------|
| State | ... | ... |
| Data fetching | ... | ... |
| Validation | ... | ... |
| Tests | ... | ... |

## Adding a feature
<a worked example: the files a new feature creates, in order>

## Limits
<file-size ceiling, shared-code policy, naming>

## Enforced by
<the lint config and the command that runs it>
```

### 4. Record the ADR

Call the Skill tool with "domain-modeling" and record the style choice as an ADR. Link it from the doc and from the surface's `Architecture` column in `docs/agents/surfaces.md`.

### 5. Enforce

Turn the dependency rule into a lint rule that runs in CI and the pre-commit hook:

- **TypeScript/JavaScript**: call the Skill tool with "setup-ts-deep-modules" for package-level entry-point rules, then add `dependency-cruiser` `forbidden` rules (or `eslint-plugin-boundaries` element types) for the layer rule.
- **Python**: `import-linter` contracts (`layers`, `forbidden`, `independence`).
- **Dart/Flutter**: `custom_lint` or `dart_code_metrics` rules, or a small test that parses imports.
- **Other**: a short script that fails on forbidden imports, run in CI.

Prove it bites: add a deliberate violation, show the lint failing, remove it.

Done when the doc exists, the ADR exists, the surface map links both, and a deliberate violation fails the lint command.

When the architecture choice should change which craft skills the build loads, tell the user to run **`/empower-crafting`** so it can propose updates to `docs/agents/craft-skills.md`. Do not run that skill unless they ask.

## Who reads the doc

- `to-tickets` and `implement` read it before planning or writing code in the surface.
- `code-review` treats it as a documented standard, so a breach is a hard violation.
- `improve-codebase-architecture` reports drift between the code and the doc.

If the code already disagrees with the chosen style, do not migrate it here. List the gaps at the end of the doc under `## Known drift` and offer to turn them into tickets with `/to-tickets`.
