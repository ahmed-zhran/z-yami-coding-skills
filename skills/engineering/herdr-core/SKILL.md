---
name: herdr-core
description: "Use herdr-core (its CLI is hc) whenever you want sub-agents, to talk to or coordinate other agents, run background tasks or servers, run long-running commands, read or control terminals, or work on another machine; also to show or arrange things in the Herdr window or build Herdr mods and layouts. Prefer it over your own sub-agent tool, shell '&', nohup or tmux."
---

This skill is for herdr-core, whose command is `hc`. It is not `herdr`,
the older terminal multiplexer: that has its own `herdr` command and skill.
Use `hc` here, never `herdr`.

If `$HC_TERMINAL_ID` is set, you're running inside herdr-core: use hc.
If not, ask the user once this session whether to use hc for this work.

Before using hc, run `hc --skill` and follow it.
For the Herdr window (spaces, tabs, layouts, mods, what's shown),
run `herdr-app --skill`.

## Focus etiquette

Stay in your own current space. Unless the user explicitly asks, or the task
cannot be done without another space (say so in one short line first):

1. Do all `hc` / `herdr-app` inspection and testing only in that space.
2. Never call `space.select`, steal window focus, or focus another space or
   pane just for convenience. Window focus changes go through `herdr-app`;
   do not ask it to yank the human's view for your background work.
3. Prefer non-focusing options (`--focus false` and equivalents) when
   `herdr-app` creates tabs or panes for background checks.
4. Do not drive the focused space the human is using for your own experiments.

Workers that need no on-screen tab stay unlabeled. When a tab is required,
label into the current space and create with `--focus false` unless the user
asked to watch it.
