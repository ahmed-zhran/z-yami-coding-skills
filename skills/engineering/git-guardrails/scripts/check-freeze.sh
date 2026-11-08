#!/bin/bash
# Freeze guard: when .guardrails/freeze exists, edits are allowed only under the paths it lists (one per line).
# Claude Code: PreToolUse, matcher Edit|Write|MultiEdit. Cursor: preToolUse, matcher Write.

INPUT=$(cat)
ROOT="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
FREEZE="$ROOT/.guardrails/freeze"
[ -f "$FREEZE" ] || exit 0

FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // .tool_input.target_file // empty')
[ -n "$FILE" ] || exit 0

case "$FILE" in
  /*) REL="${FILE#"$ROOT"/}" ;;
  *) REL="$FILE" ;;
esac

while IFS= read -r allowed; do
  [ -z "$allowed" ] && continue
  case "$REL" in
    "$allowed"|"$allowed"/*) exit 0 ;;
  esac
done < "$FREEZE"

echo "BLOCKED: '$REL' is outside the frozen scope ($(paste -sd, "$FREEZE")). Ask the user to widen the freeze if this edit is needed." >&2
exit 2
