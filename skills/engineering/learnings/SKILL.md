---
name: learnings
description: "The repo's memory of solved problems: write a short solution note to docs/solutions/ after a non-obvious fix, and search those notes before diagnosing or implementing in the same area. Use after fixing a bug whose cause was not obvious, after an approach failed in an instructive way, or before starting work in an area that has notes; also when the user says 'remember this', 'record the fix', or 'have we seen this before'."
---

# Learnings

Every non-obvious problem solved once should be cheap to solve the second time. A **solution note** is the record: what broke, why, how it was found, and what fixed it. Notes live in the repo (`docs/solutions/`), so the next agent session finds them with a grep instead of rediscovering them.

This is not the glossary (`GLOSSARY.md` holds terms) and not ADRs (`docs/adr/` holds decisions). A note holds an **episode**: a problem and its cause.

Write the note when the fix happens. The post-release gate also blocks the next release until this release's non-obvious fixes each have a note, or the gate file says there were none.

## Read before you work

Before diagnosing a bug or implementing in an area, search the notes:

```bash
grep -ril "<module, error text, or symptom>" docs/solutions/
```

Read the matches. A note that describes this exact symptom changes the plan: start from its cause. Mention in your report which notes you used.

## Write after a non-obvious fix

Write a note when the cause surprised you, the fix took more than one hypothesis, or a tempting approach failed. Skip it when the fix was obvious from the error message.

File: `docs/solutions/<area>-<short-slug>.md`

```markdown
# <symptom, in the words a future reader would search for>

**Area:** <surface / module>  **Issue:** #<n>  **Date:** <YYYY-MM-DD>

## Symptom
<what was observed, exact error text if any>

## Cause
<the real cause, one paragraph>

## Fix
<what changed and why it works; link the PR>

## How it was found
<the feedback loop or probe that cracked it>

## Watch for
<the pattern that will cause it again, and the guard now in place (test, lint rule, type)>
```

Use the `GLOSSARY.md` vocabulary. Keep it under 40 lines; link to the PR for detail.

## Prune

When a note's cause has been designed out (the module was rewritten, a lint rule now prevents it), delete the note in the same PR, or update **Watch for** to name the guard. A stale note that misleads is worse than none.
