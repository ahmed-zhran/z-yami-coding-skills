#!/bin/bash
# Shell guard for Claude Code (PreToolUse, matcher Bash) and Cursor (beforeShellExecution).
# Exit 2 blocks the command in both harnesses.

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // .command // empty')
ROOT="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"

# Long-lived branches: never force-pushed, never pushed to directly. Work lands through a PR.
PROTECTED='(main|master|release/[^ ]+)'

DANGEROUS_PATTERNS=(
  "git push .*(--force|-f)( |$)"
  "git push( .*)? --delete (origin )?$PROTECTED"
  "git reset --hard"
  "git clean -[a-z]*f"
  "git branch -D"
  "git checkout (-- )?\.( |$)"
  "git restore (--staged )?\.( |$)"
)

# A direct push to a long-lived branch is blocked unless the branch does not exist on the remote yet
# (creating a new release branch is allowed; adding commits to an existing one is not).
DIRECT_PUSH="git push( .*)? (origin )?(HEAD:)?$PROTECTED( |$)"

# Careful mode (touch .guardrails/careful): also block destructive non-git commands.
CAREFUL_PATTERNS=(
  "rm -rf"
  "DROP (TABLE|DATABASE|SCHEMA)"
  "TRUNCATE "
  "(migrate|migration).*(down|reset|rollback)"
  "kubectl delete"
  "terraform (apply|destroy)"
  "gh release delete"
  "git tag -d"
)

block() {
  echo "BLOCKED: '$COMMAND' matches '$1'. The user has prevented you from doing this. Ask them to run it if it is really needed." >&2
  exit 2
}

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  echo "$COMMAND" | grep -qE -- "$pattern" && block "$pattern"
done

if echo "$COMMAND" | grep -qE -- "$DIRECT_PUSH"; then
  BRANCH=$(echo "$COMMAND" | grep -oE -- "(HEAD:)?$PROTECTED( |$)" | head -1 | sed 's/^HEAD://; s/ $//')
  if git -C "$ROOT" ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
    block "direct push to existing long-lived branch $BRANCH"
  fi
fi

if [ -f "$ROOT/.guardrails/careful" ]; then
  for pattern in "${CAREFUL_PATTERNS[@]}"; do
    echo "$COMMAND" | grep -qiE -- "$pattern" && block "$pattern (careful mode)"
  done
fi

exit 0
