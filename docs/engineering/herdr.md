## What it does

`herdr` is the Herdr control skill, vendored from Herdr `v0.9.5`. Inside a Herdr pane it drives the `herdr` CLI: layout, commands in other panes, and other agents.

It refuses to run unless `HERDR_ENV=1`. The installed binary is the authority for flags. The skill tells the agent to read `herdr --help` and the command group before it invents a flag. The copy in this repo is a byte match of that tag. The pin is in [`.agents/external-skills.md`](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/.agents/external-skills.md).

## When to reach for it

Type `/herdr`, or the agent reaches for it when you ask to control panes, tabs, workspaces, or another agent, or when [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) starts one session per ready ticket.

For install help, a key that does nothing, or an agent Herdr did not detect, use [herdr-guide](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr-guide.md). This skill does not teach Herdr. It operates it.

## Prerequisites

A Herdr pane (`HERDR_ENV=1`) and the `herdr` binary on `PATH`. The binary and this skill can be from different Herdr versions. When they disagree, the binary wins, which is why the skill reads the live help before the first mutating command.

## The pin

The leading idea is the **pin**. This file is not edited to taste in a consumer repo, and it is not edited here except by moving the pin forward. A newer Herdr release shows up as a diff against `v0.9.5`. Someone reviews that diff, replaces the file, and updates the pin. Until then the published skill stays on `v0.9.5`.

## Common questions

**Does this install Herdr, or replace the binary's skill?**

It does not install the program. If Herdr is running, `herdr --skill` prints the copy bundled with that binary. This package publishes one reviewed copy so every repo shares it. Do not also `npx skills add herdrdev/herdr`. Two skills named `herdr` hide each other.

## It's working if

- Outside Herdr, the agent stops before it runs a control command.
- Inside Herdr, the agent reads the live command help before it splits a pane or starts an agent.
- The skill file in this repo still matches the hash recorded for `v0.9.5`, or the pin has moved on purpose.

## Where it fits

`herdr` is the **control** skill [ship-release](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/ship-release.md) calls when tickets are ready for their own panes. [herdr-guide](https://github.com/ahmed-zhran/z-yami-coding-skills/blob/main/docs/engineering/herdr-guide.md) is the sibling for humans who are stuck or not set up yet. [ask-yami](https://aihero.dev/skills-ask-yami) routes the rest.
