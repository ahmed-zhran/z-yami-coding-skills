## What it does

`herdr-app` changes what the Herdr Desktop window shows: spaces, tabs, panes, layouts, and mods. It does not start the agent. `hc` does that, and this skill makes the terminal visible.

A terminal with no `herdr.space` label stays hidden. `spec-flow` uses this skill so each ticket terminal is labeled into a sibling child tab of the current space (not the parent's tab). `/ship-spec` and `/ship-release` both reach that procedure.

**Focus etiquette** is the default: stay in the agent's current space, create with `--focus false`, and never `space.select` or yank the window for convenience unless you asked, or the work cannot stay put (the agent says so first).

## When to reach for it

Type `/herdr-app`, or the agent reaches for it when you ask to change the Herdr window, or when a terminal started with `hc` should appear on screen.

| You want | Reach for |
| --- | --- |
| Show, split, or focus something in the window | `/herdr-app` |
| Start the agent, read its screen, or send it a message | [herdr-core](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr-core.md) |

## Prerequisites

The Herdr Desktop window, and `herdr-app` on `PATH`. `herdr-app ls` talks to the running window. Launching bare `herdr-app` opens or raises that window, so the skill uses the subcommands instead.

## The window

The leading word is the **window**. Core keeps the terminals alive after the window closes. This skill only decides what you see. The live command list is `herdr-app --skill` from the installed binary.

## Common questions

**Why is a ticket terminal missing from the window?**

`hc` workers with no space label stay hidden. The release labels `herdr.space` and `herdr.tab` from `herdr-app ls` so the terminal joins a sibling child tab in that space.

**Why did the window jump to another space while an agent was testing?**

That agent ignored Focus etiquette. Inspection, shots, and panel checks stay in the agent's own space. `space.select` and focus-stealing creates are only for when you asked to move, or when the task cannot use the current space.

## It's working if

- `herdr-app ls` shows the ticket terminal under the current space in a child tab, not the parent's tab.
- The agent did not open a new space unless you asked for one, and new tabs used `--focus false` unless you asked to watch them.
- Your focused space did not jump while the agent inspected or took shots.
- Starting and messaging the agent still went through `hc`, not through a window command.

## Where it fits

`herdr-app` is the window half of Herdr Desktop. [herdr-core](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr-core.md) runs the terminals. [spec-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/spec-flow.md) calls both when the session is Desktop.
