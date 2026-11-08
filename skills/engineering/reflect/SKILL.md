---
name: reflect
description: "After a session, turn what went wrong or right into proposed edits to the skills, AGENTS.md, or repo docs, so the next session starts smarter."
argument-hint: "Optional: what to focus on"
disable-model-invocation: true
---

# Reflect

Skills and steering files get better only when real sessions feed back into them. This skill looks back over the current session (or a session log the user points to) and proposes concrete edits. `/retro` improves the **environment** (checks, tooling, navigation); `reflect` improves the **instructions**: the skills themselves and the files agents read.

## Process

1. **Collect evidence.** Walk the session and list every moment where:
   - the user corrected the agent, repeated an instruction, or said "no";
   - a skill step was skipped, misread, or produced the wrong artifact;
   - the agent had to rediscover something a file could have told it;
   - something worked unusually well and is not written down anywhere.

   Quote the moment. No quote, no item.

2. **Find the owner** of each item, the one file that should change:

   | The lesson is about | Owner |
   |---------------------|-------|
   | How a skill behaves | that skill's `SKILL.md` (in this skills repo) |
   | This project's rules or conventions | the project's `AGENTS.md`, or a doc it points to |
   | A domain term | `GLOSSARY.md` (call the Skill tool with "domain-modeling") |
   | A solved problem | `docs/solutions/` (call the Skill tool with "learnings") |
   | A mechanical mistake a check could catch | not here: suggest `/retro` |

3. **Draft the edit** for each item. Call the Skill tool with "writing-for-agents" before editing any skill or steering file. Prefer the smallest edit that changes behaviour: a sharper leading word, a completion criterion, a gotcha. Deleting a line that caused the mistake beats adding a paragraph that argues with it.

4. **Present** the drafts, most impactful first, each with its quoted evidence and the diff. The user approves, edits, or drops each one. Never apply an unapproved edit.

5. **Apply** the approved edits. For a skill edit, call the Skill tool with "skill-eval" on the changed skill and report the score change; an edit that lowers the score needs a reason.

Done when every collected item is applied, dropped by the user, or handed to `/retro`.

## Gotchas

- One session is one data point. When an item fixes a one-off slip rather than a pattern, say so and let the user decide.
- Skill edits in a project's local copy drift from the skills repo. Make the edit in the skills repo when the lesson is general, and in the project only when it is project-specific.
