---
name: debt
description: "Collect the shortcut: comments left in the code into a debt ledger, and turn the ones worth paying into issues."
disable-model-invocation: true
---

# Debt

`implement` takes the smallest complete change, and marks every deliberate shortcut with a comment in this form:

```text
shortcut: <the limit>, <when to upgrade>
```

For example `// shortcut: loads all rows into memory, paginate past ~10k clinics`. This skill harvests them so "later" does not become "never".

## Process

1. Find every marker: `git grep -n "shortcut:"` (exclude vendored and generated folders). For each, record file, line, the limit, the upgrade trigger, the surface (from `docs/agents/surfaces.md`), and when it was added (`git blame -L <line>,<line> --porcelain`).
2. Check each trigger against reality where you can: table sizes, traffic, the number of callers. Mark each **due** (trigger reached or close), **not yet**, or **unclear**.
3. Write or update `docs/debt.md`: one table, due first, then by age. Keep the entries the user already decided to keep, with their reason.
4. Present the due items. For each one the user wants paid, create an issue on the tracker (labels: `debt`, its surface; `**Base:**` the current default base) whose body links the marker. Use the issue-tracker doc for the commands.
5. When an issue for a marker is closed, the fix removes the marker in the same PR. Markers with no issue and a trigger long past are a finding to raise, not to silently delete.

Done when `docs/debt.md` lists every marker in the code and every due item is either an issue or explicitly kept by the user.
