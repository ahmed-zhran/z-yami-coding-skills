# Child sessions (Herdr hosts)

How `/ship-spec` and `/ship-release` open, pack, and retire ticket sessions. `spec-flow` owns this. `release-flow` uses the same procedure for bug tickets opened while testing. Do not invent a second layout.

The parent session (the one running this ship) stays alone in its own tab. Children never share that tab.

## Policy

1. **Host.** Pick once per run: TUI when `HERDR_ENV` is `1`, Desktop when `HC_TERMINAL_ID` is set. Same host for every child of that run.
2. **Child tabs.** Open children in sibling tabs of the same workspace (TUI) or space (Desktop). Label them `tickets` (or `tickets-2`, `tickets-3`, …). Never split the parent's pane for a ticket.
3. **Cap.** At most **6** live child panes or terminals per child tab. A seventh opens a new child tab and packs the same way.
4. **Grid.** Each child tab aims for a **2×3** board: three panes across the top row, three across the bottom, as equal as the host allows. Fill empty shells before creating a new tab.
5. **Focus.** Stay in the parent's workspace (TUI) or space (Desktop). Create and fill with `--no-focus` / `--focus false`. Never `space.select`, never steal window focus, and never drive the human's focused space for experiments, unless the human asked to watch a child or the task cannot stay in the current space (say so briefly first).
6. **Retire.** When a child this run started has finished its land (or this run no longer needs it), close that pane or terminal so it stops taking a slot. When a child tab this run created has no remaining live children, close the tab. Never close the parent's pane, tab, workspace, or space.

## Open or fill a slot

Before starting a ready ticket, find a free slot on an existing child tab this run owns (fewer than 6 live panes/terminals). If none, create the next child tab and build its empty grid, then take the first free shell.

### TUI (`HERDR_ENV=1`)

Call the Skill tool with "herdr". Commands:

```bash
herdr tab create --workspace "$HERDR_WORKSPACE_ID" --cwd "$PWD" --label tickets --no-focus
```

Read `.result.tab.tab_id` and `.result.root_pane.pane_id`. Build an equal 2×3 from that root (`--ratio` is the fraction kept by the first side). Keep focus off the new panes:

```bash
# root = top-left. Bottom row:
herdr pane split "$ROOT" --direction down --ratio 0.5 --cwd "$PWD" --no-focus
# top row into thirds (first keeps 1/3, then the remainder splits in half):
herdr pane split "$ROOT" --direction right --ratio 0.333 --cwd "$PWD" --no-focus
herdr pane split "$MID_TOP" --direction right --ratio 0.5 --cwd "$PWD" --no-focus
# bottom row the same, starting from the bottom-left pane id
```

Start the ticket agent in a free shell pane (interactive prompt, no foreground command). Name it usefully (`ticket-<issue>`). Task: call the Skill tool with "ticket-flow" for that issue, stop when the pull request is open, wait for this parent to say land.

### Desktop (`HC_TERMINAL_ID` set)

Call the Skill tool with "herdr-core" and "herdr-app". Run `hc --skill` and `herdr-app --skill` before inventing a flag. Keep the parent's space; never `space.select`. Create a sibling tab there without moving the human's view:

```bash
herdr-app ls
herdr-app do tab.new --name tickets --space <space-id> --folder "$PWD" --focus false
```

Read the new tab id from the reply or a fresh `herdr-app ls`. Grow toward the same 2×3 with `pane.split` (`right` / `down`) on panes in that tab. Prefer an empty shell in the grid over a new tab until the tab holds 6. When `pane.split` exposes a ratio argument, use the same thirds as the TUI path; until then, keep the 2×3 tree even if column widths are only approximately even.

Place each ticket with `hc run --bg` in `$PWD`, named `ticket-<issue>` (letters, digits, hyphens only). Pass `--label herdr.space=<id>` and `--label herdr.tab=<id>` for the **child** tab, not the parent's. Start the same kind of agent this session is, in a fresh context window, with the task in the launch: call the Skill tool with "ticket-flow" for that issue, stop when the pull request is open, report that URL with `hc send` to `$HC_TERMINAL_ID`, and wait for this parent to say land. That agent does not land on its own and does not start further agents. If `first_message.sent` is false, read the terminal and send the task once it is ready.

## Retire a finished child

After this session has landed that ticket (or abandoned the child for good):

- **TUI:** `herdr pane close <pane-id>` for the pane this run opened. If the child tab has no panes left that this run still needs, `herdr tab close <tab-id>`.
- **Desktop:** `hc kill <t>; hc rm <t>`, then `herdr-app do pane.close --pane <pane-id>` when a pane remains. If the child tab has no remaining terminals this run owns, `herdr-app do tab.close --id <tab-id> --confirmed true`.

Only clean up children this run started. Leave the parent's tab alone.
