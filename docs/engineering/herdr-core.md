## What it does

`herdr-core` drives Herdr Desktop's terminals through the `hc` command. It starts agents, reads their screens, and sends them the next instruction. The terminals stay up when the window closes.

It is the Desktop host. The TUI skill `herdr` does not run here, because Desktop does not set `HERDR_ENV`. This skill runs when `HC_TERMINAL_ID` is set, and the installed `hc --skill` text is the authority for flags.

## When to reach for it

Type `/herdr-core`, or the agent reaches for it when you are in Herdr Desktop and ask to start, message, or wait on another terminal.

| You want | Reach for |
| --- | --- |
| Start or message an agent in Herdr Desktop | `/herdr-core` |
| Change which space, tab, or pane is on screen | [herdr-app](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr-app.md) |
| The same job inside the terminal multiplexer | [herdr](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr.md) |

## Prerequisites

Herdr Desktop, with `hc` on `PATH`. A session that is already inside a core terminal has `HC_TERMINAL_ID` set. That value is the address other terminals send results back to.

## The host

The leading word is the **host**. `spec-flow` picks one host and stays there for that spec. On Desktop it calls this skill, labels each ticket terminal with the current space and tab so you can see it, **steers** that terminal until the pull request URL arrives, then lands the ticket under the ship door's authority. On the TUI it calls `herdr` instead. `/ship-spec` and `/ship-release` both reach that procedure.

## Common questions

**Why did `/ship-release` stop after I moved from the TUI to Desktop?**

The TUI sets `HERDR_ENV=1`. Desktop sets `HC_TERMINAL_ID` and does not set `HERDR_ENV`. A release that only checked the TUI variable stopped. It now treats either variable as a host.

**Does this replace `hc --skill`?**

No. This copy tells the agent to run `hc --skill` and follow it. The binary you have installed wins when a flag differs from an older note. For children the shipping session started, that session is the person for `blocked` approvals; it does not send those prompts to you at the child's keyboard.

**Why is a ticket terminal waiting on a shell approval?**

The parent should clear it (`hc keys <t> y` for a run-once approve). If it left the terminal blocked for you, that run was not steering.

## It's working if

- Inside Desktop, a ready ticket shows up as its own terminal in the current tab, and the parent steers it until the pull request URL arrives.
- Ticket terminals do not wait on you for shell approvals; the parent clears them.
- The parent lands the ticket when the ship door owns that level (under `/ship-spec` or `/ship-release`).
- Outside both hosts, the release stops instead of building every ticket in the parent session.

## Where it fits

`herdr-core` is the Desktop control skill [spec-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/spec-flow.md) calls when `HC_TERMINAL_ID` is set. [herdr-app](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr-app.md) only changes what the window shows. [herdr](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr.md) is the TUI sibling.
