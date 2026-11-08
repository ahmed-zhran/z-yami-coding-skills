---
name: git-guardrails
description: Set up agent hooks (Claude Code or Cursor) that block dangerous git commands (force push, direct pushes to main or release branches, reset --hard, clean, branch -D), with an optional careful mode for destructive non-git commands and a freeze mode that limits edits to chosen paths. Use when the user wants to prevent destructive operations, add git safety hooks, or restrict the agent to one folder.
---

# Setup Git Guardrails

Installs hooks that intercept dangerous commands before the agent runs them. Ordinary `git push` of a work branch stays allowed, because `start-work`, `land`, and `release` need it; what is blocked is anything that rewrites or bypasses a **long-lived branch** (`main`, `master`, `release/*`).

## What gets blocked

Always:

- Force push (`git push --force`, `-f`). `--force-with-lease` on a work branch stays allowed, because restacking needs it.
- Direct push to, deletion of, or rebase of a long-lived branch
- `git reset --hard`, `git clean -f`, `git branch -D`, `git checkout .`, `git restore .`

**Careful mode** (on while `.guardrails/careful` exists): also `rm -rf`, `DROP`/`TRUNCATE`, migration rollbacks, `kubectl delete`, `terraform apply|destroy`, deleting releases or tags.

**Freeze mode** (on while `.guardrails/freeze` exists): edits are allowed only under the paths listed in that file, one per line. Use it for a debugging session that must not wander, or a ticket scoped to one surface.

Turning either mode on or off is creating or deleting the file. Add `.guardrails/` to `.gitignore`; modes are per checkout, not shared.

## Steps

### 1. Ask harness and scope

Which harness: **Claude Code**, **Cursor**, or both. Then: **this project only** or **all projects**.

### 2. Copy the scripts

Copy [scripts/block-dangerous-git.sh](scripts/block-dangerous-git.sh) and [scripts/check-freeze.sh](scripts/check-freeze.sh) to the hooks folder for the choice, and `chmod +x` both:

| Harness | Project | Global |
|---------|---------|--------|
| Claude Code | `.claude/hooks/` | `~/.claude/hooks/` |
| Cursor | `.cursor/hooks/` | `~/.cursor/hooks/` |

Both scripts need `jq`; check `command -v jq` and tell the user to install it if missing.

### 3. Register the hooks

Merge into the existing settings; never overwrite other hooks.

**Claude Code** (`.claude/settings.json` or `~/.claude/settings.json`):

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-git.sh" }] },
      { "matcher": "Edit|Write|MultiEdit", "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/check-freeze.sh" }] }
    ]
  }
}
```

For global scope, use `~/.claude/hooks/...` paths.

**Cursor** (`.cursor/hooks.json`, or `~/.cursor/hooks.json` with `./hooks/...` paths):

```json
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [{ "command": ".cursor/hooks/block-dangerous-git.sh", "failClosed": true }],
    "preToolUse": [{ "command": ".cursor/hooks/check-freeze.sh", "matcher": "Write" }]
  }
}
```

### 4. Ask about customization

Ask whether to add or remove patterns, or change which branches count as long-lived. Edit the copied script.

### 5. Verify

```bash
echo '{"tool_input":{"command":"git push --force origin main"}}' | <path>/block-dangerous-git.sh; echo "exit $?"
echo '{"command":"git push -u origin ticket/12-rooms"}' | <path>/block-dangerous-git.sh; echo "exit $?"
```

The first must exit `2` with a BLOCKED message; the second must exit `0`. Done when both hold.
