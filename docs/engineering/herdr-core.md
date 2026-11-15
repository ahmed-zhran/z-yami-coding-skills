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

The leading word is the **host**. `spec-flow` picks one host and stays there for that spec. On Desktop it calls this skill, labels each ticket terminal into a sibling child tab of the current space (max six per 2×3 grid; the parent's tab stays alone), **steers** that terminal until the pull request URL arrives, lands the ticket under the ship door's authority, then closes the finished child. On the TUI it calls `herdr` instead. `/ship-spec` and `/ship-release` both reach that procedure.

## Common questions

**Why did `/ship-release` stop after I moved from the TUI to Desktop?**

The TUI sets `HERDR_ENV=1`. Desktop sets `HC_TERMINAL_ID` and does not set `HERDR_ENV`. A release that only checked the TUI variable stopped. It now treats either variable as a host.

**Does this replace `hc --skill`?**

No. This copy tells the agent to run `hc --skill` and follow it. The binary you have installed wins when a flag differs from an older note. For children the shipping session started, that session is the person for approvals; it does not send those prompts to you at the child's keyboard. Spec-flow's steer loop owns that behaviour: it polls `hc read` while the child is working, because Cursor allowlist dialogs often never flip status to `blocked`.

**Why is a ticket terminal waiting on a shell approval?**

Cursor's "Run this command?" / "Not in allowlist" dialog usually leaves status as `working`, so `hc wait` alone can sit until timeout with the dialog already on screen. The parent should `hc read` every few seconds and clear each prompt with `hc keys <t> y` (run once; one `y` per "Approval 1 of 2"). If it left that dialog for you, that run was not steering.

## It's working if

- Inside Desktop, a ready ticket shows up as its own terminal in a sibling child tab, and the parent steers it until the pull request URL arrives, then closes that terminal after land.
- Ticket terminals do not wait on you for shell approvals; the parent clears them from a screen-read loop, not only from a `blocked` status.
- The parent lands the ticket when the ship door owns that level (under `/ship-spec` or `/ship-release`).
- Outside both hosts, the release stops instead of building every ticket in the parent session.

## Where it fits

`herdr-core` is the Desktop control skill [spec-flow](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/spec-flow.md) calls when `HC_TERMINAL_ID` is set. [herdr-app](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr-app.md) only changes what the window shows. [herdr](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr.md) is the TUI sibling.
