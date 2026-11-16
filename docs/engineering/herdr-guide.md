## What it does

`herdr-guide` helps a human understand, install, or troubleshoot Herdr. It teaches the concept model, the first-run path, the keyboard, config, and a short set of diagnosis recipes.

It does not drive panes. Splitting, starting agents, and reading another pane are the `herdr` skill. This one points at the Herdr docs when a command is not already written here, and it does not invent keybindings or flags.

## When to reach for it

Type `/herdr-guide`, or the agent reaches for it when you ask what Herdr is, how to install it, why a key does nothing, or why an agent was not detected.

| You want | Reach for |
| --- | --- |
| Set up Herdr, or work out why it misbehaved | `/herdr-guide` |
| Split panes, run a command, or start an agent in a TUI pane | [herdr](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr.md) |
| Run a terminal or show it in Herdr Desktop | [herdr-core](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr-core.md) and [herdr-app](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr-app.md) |
| One spec, or a release, that opens one session per ready ticket | [ship-spec](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-spec.md) or [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) |

## Prerequisites

None for an explanation. Diagnosis commands (`herdr agent list`, `herdr status`) need the binary installed. The canonical docs are https://herdr.dev/tui/docs/.

## Diagnosis before invention

The leading idea is **diagnosis**. A wrong agent state starts with `herdr agent list` and `herdr agent explain`, not a guess. A dead keybinding is usually the outer terminal, and the guide sends the human to Herdr's keyboard page. Logs live under the Herdr config directory. Anything not written in the skill is looked up, not invented.

The page this skill was copied from tells an agent to install `herdr` from `herdrdev/herdr`. This copy does not. The control skill is already in this package, and a second install would hide it.

## Common questions

**Why is this a separate skill from `herdr`?**

They do different jobs. One operates Herdr from inside a pane. This one teaches a human who is setting it up or stuck. Herdr publishes them as two documents for that reason.

**The upstream page changed. Do I edit this file in my app repo?**

No. The pin and the check live in this package. A newer page is reviewed in the coding-skills repo, then published, then picked up with `/sync-skills`.

## It's working if

- A setup conversation starts with the mouse, and does not hand over tmux commands.
- A failed key or a missing agent ends with a Herdr command or a docs link, not a guessed flag.
- When someone asks how agents should share the window, the answer is Focus etiquette: own space, no focus theft, non-focusing creates.
- The agent does not offer to `npx skills add herdrdev/herdr`.

## Where it fits

`herdr-guide` is a **standalone** next to the control skill. [herdr](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr.md) is what a release calls when it needs panes. [ask-yami](https://aihero.dev/skills-ask-yami) routes the set.
