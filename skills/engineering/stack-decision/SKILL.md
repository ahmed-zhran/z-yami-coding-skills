---
name: stack-decision
description: "Choose a surface's language, framework, or key library by interview, and record it as an ADR and a line in docs/agents/stack.md."
argument-hint: "The surface and the choice to make (e.g. 'admin: state management')"
disable-model-invocation: true
---

# Stack Decision

Settle one stack choice for one surface, and record it where every later agent reads it before adding a dependency.

A stack choice is a **one-way door** more often than it looks: the first library picked for state, data fetching, or persistence gets copied into every feature after it. So it gets an interview and an ADR, not a guess inside a ticket.

## Process

1. **Frame it.** Name the surface (from `docs/agents/surfaces.md` if it exists) and the slot being filled: framework, state, data access, persistence, validation, styling, testing, build. Read `docs/agents/stack.md` and any ADR in the area. If the slot is already decided, say so and ask whether this is a reversal.
2. **Gather facts first.** Facts are your job: what the codebase already uses (lockfiles, imports), what the other surfaces use, team familiarity from the history, constraints from ADRs (hosting, offline, compliance). For candidates you are unsure about, call the Skill tool with "research" rather than answering from memory.
3. **Compare two or three real candidates**, including "use what is already installed" whenever that is viable. For each: fit for this surface, cost to adopt, cost to leave, maintenance health, and what it forces on the rest of the code.
4. **Decide by interview.** Call the Skill tool with "grilling". Decisions are the user's; lead with your recommendation and why.
5. **Record.**
   - An ADR: call the Skill tool with "domain-modeling" for the ADR format. Title it as the decision ("Admin uses TanStack Query for server state").
   - A line in `docs/agents/stack.md` under the surface, linking the ADR. Create the file from the template below if it is missing.
   - The surface's `Stack` column in `docs/agents/surfaces.md`, if the map exists.

Done when the ADR exists, `docs/agents/stack.md` has the line, and the user has confirmed the decision.

## `docs/agents/stack.md` template

```markdown
# Stack

Read this before adding a dependency. A slot already filled here is decided: use it, or propose a reversal with `/stack-decision`. Never add a second library for a filled slot.

## <surface>

- **Framework**: <choice> ([ADR-NNNN](../adr/NNNN-...md))
- **State**: <choice> ([ADR-NNNN](...))
- **Data access**: ...
- **Testing**: ...
```

The next decision for the same surface is usually its code architecture: point the user to `/surface-architecture`.
