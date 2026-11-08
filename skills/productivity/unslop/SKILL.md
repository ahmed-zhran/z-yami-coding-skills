---
name: unslop
description: "Find and remove AI writing tells (filler openers, inflated vocabulary, reflexive triads, hedging stacks, recap closers) from prose humans will read: PR bodies, changelogs, release notes, READMEs, ADRs, specs. Use before publishing any of those, or when the user says unslop, de-slop, 'sounds like AI', or 'make this read human'."
metadata:
  credits:
    skill: avoid-ai-writing
    author: Conor Bronsdon
    license: MIT
    url: "https://github.com/conorbronsdon/avoid-ai-writing"
---

# Unslop

Prose for humans should read like a person who knows the subject wrote it. This skill finds the patterns that make text read as machine-written and fixes them with **minimal, targeted edits**. It is a quality pass, not a detector verdict: humans write these patterns too.

Scope: prose humans read. Docs that agents consume (skills, `AGENTS.md`) follow `writing-for-agents` instead. Never touch code, commands, paths, identifiers, quotations, tables of data, or frontmatter.

## Modes

- **detect**: list findings with the line, the pattern, and a suggested fix. Change nothing.
- **rewrite** (default when another skill calls this before publishing): apply the fixes in place, then re-read once.

## Patterns

| Pattern | Looks like | Fix |
|---------|-----------|-----|
| Filler opener | "In today's fast-paced world", "It's worth noting that", "Let's dive in" | Delete; start with the claim |
| Inflated vocabulary | delve, leverage (verb), robust, seamless, crucial, pivotal, tapestry, landscape, realm, unlock, elevate, empower | The plain word, or delete |
| Reflexive triad | three adjectives or clauses where one carries the meaning | Keep the one that is true |
| Hedge stack | "may potentially", "could possibly help to" | One hedge, only if the uncertainty is real |
| Not-X-but-Y | "This isn't just a fix, it's a rethink" | State Y |
| Recap closer | "In summary", "Overall", a closing paragraph repeating the body | Delete |
| Signposting | "Here's the thing:", "The key takeaway is" | Delete the frame, keep the content |
| Empty intensifier | truly, incredibly, extremely, very | Delete or give the number |
| Emoji bullets and bold everywhere | decoration that carries no meaning | Plain bullets; bold only the one term the reader must not miss |
| Em-dash chains | several em dashes per paragraph | Comma, colon, period, or parentheses, whichever the sentence wants |
| Vague attribution | "experts say", "studies show" | Name the source or delete |
| Sycophancy | "Great question", "Absolutely" | Delete |

## Contract

- **Keep the meaning.** Every number, unit, negation, condition, and claim survives. Never add facts, experience, or confidence the source does not have; flag the gap instead.
- **Keep the voice.** Minimal edits, not a rewrite into your style. A paragraph with no findings stays untouched.
- **Done** when a re-read finds no pattern above in the edited scope, and the diff changes only flagged spans.
