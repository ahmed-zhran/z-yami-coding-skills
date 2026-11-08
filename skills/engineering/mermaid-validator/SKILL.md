---
name: mermaid-validator
description: "Validate Mermaid diagrams in markdown with @probelabs/maid before they are committed. Use when the user asks to validate Mermaid or check diagrams, or when you are about to commit markdown that contains a Mermaid block."
metadata:
  credits:
    skill: mermaid-validator
    author: dt418
    license: MIT
    url: "https://github.com/dt418/mermaid-validator-agent-skill"
---

# Mermaid Validator

A Mermaid block that renders in one viewer can fail in another. Validate with `@probelabs/maid`, which is stricter than GitHub's renderer, so a diagram that passes here renders everywhere.

## Validate

```bash
npx @probelabs/maid <file>                                 # one file
find docs -name "*.md" -print0 | xargs -0 -n1 npx @probelabs/maid   # a tree
npx @probelabs/maid "docs/**/*.md" --fix                  # auto-fix the common cases
```

Exit `0` means every diagram is valid; exit `1` means at least one is not. Done when every changed markdown file with a Mermaid block exits `0`.

## Common fixes

| Issue | Invalid | Valid |
|-------|---------|-------|
| Pipe in label | `A[text\|desc]` | `A["text\|desc"]` |
| Parentheses | `A[Name (X)]` | `A["Name (X)"]` |
| Leading slash | `A[/path]` | `A["/path"]` |
| Arrow syntax | `A -> B` | `A --> B` |
| Brackets | `A[items[]]` | `A["items[]"]` |
| Reserved id | `end[End]` | `endNode[End]` |

When in doubt, wrap the label in double quotes.

## Gotchas

- Some editor previews (Cursor's among them) support only a subset of GitHub's Mermaid. If the repo documents a subset (for example "`flowchart` only"), that rule wins over what `maid` accepts.
- Sequence-diagram activation warnings are acceptable; errors are not.
- To make it permanent, add `npx @probelabs/maid "docs/**/*.md"` to CI or a pre-commit hook (call the Skill tool with "setup-pre-commit" if none exists).
