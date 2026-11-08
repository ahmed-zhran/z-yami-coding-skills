---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up, or start a background agent on it with --bg.
argument-hint: "[--bg] What will the next session be used for?"
disable-model-invocation: true
---

Write a handoff document summarising the current conversation so a fresh agent can continue the work. Save to the temporary directory of the user's OS (`$TMPDIR`, else `/tmp`; `%TEMP%` on Windows) - not the current workspace.

Include a "suggested skills" section in the document, naming which skills the next agent should call the Skill tool for.

Do not duplicate content already captured in other artifacts (specs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead. When the work is on a branch, name the branch, its recorded base, and its worktree path.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.

## `--bg`: start a background agent on it

When the arguments start with `--bg`, write the document as above, then launch a background agent seeded with it instead of stopping:

- **Claude Code**: `claude --bg --name "<descriptive name>" -- "$(cat <doc>)"`. Passing the file keeps the shell from running backticks or expanding `$` in the summary. The user manages it with `claude agents`.
- **Cursor**: start a background or cloud agent with the document as its prompt, using the harness's agent tool, and give it a descriptive name.
- **Any other harness** without background agents: stop after writing the file and tell the user the path, so they can open a new session on it.

Always give the agent a descriptive name (e.g. "Fix login bug"): it is what the user sees in the agent list. Since the document becomes the agent's prompt, the redaction rule above is mandatory here.
