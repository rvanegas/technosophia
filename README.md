# technosophia

Development practices, written once, for every project that adopts them.

They are for projects of a particular shape: a few people, much of the work
done by coding agents in sessions, small services each deployed from its own
repository to a server its owners run, and some of those services calling
each other. A project of that shape could take them as they stand.

The name is *τεχνοσοφία*: craft as the application of wisdom, not its
contrary.

## How a project adopts them

A project's `CLAUDE.md` imports the core, which says when to read the rest.
The import is its first line, with nothing before it:

    @~/src/technosophia/WORKING.md

The project's instructions follow in the same file. There is no `AGENTS.md`
beside it: one file, read by the agent the practices are written for.

Every practice here applies unless the project's own instructions say
otherwise. An exception names the practice it departs from and says why.

## `ts`

The shared scripts run through one command, linked once into a directory
already on PATH:

    ln -s ~/src/technosophia/ts ~/.local/bin/ts

`ts` finds the repository through the link, so pulling it updates the
command.

`ts <name>` runs the project's own `bin/<name>` if there is one, else the
shared `bin/<name>` here, with the project's root in `TS_ROOT`; `ts` alone
lists both. A project's script wins: that is how it does something
otherwise. Only `ts` is linked onto PATH, so it is the one command that
enters the executable namespace, and the script names in `bin/` stay plain.

A shared script reads the project's settings from `bin/ts.env` (`KEY=value`
lines; each script's `--help` names the ones it uses), and runs the
project's own steps from `bin/hooks/<script>-<stage>`. Servers are named by
their `~/.ssh/config` alias: no address, user or key is written in a script
or a setting.

This repository names no project. Projects refer to it; it never refers to
them. Whatever belongs to one project stays in that project.

## What is here

| File | Read |
|---|---|
| `WORKING.md` | Every session: branches, the verbs, how a change is recorded, and when to read the rest |
| `LANDING.md` | When landing, and when working in a worktree |
| `PLANNING.md` | When filing or resolving a task, backlog item or decision |
| `INSTRUCTIONS.md` | When adding to a project's agent instructions |
| `SERVICES.md` | When changing a service's config, secrets, health, deploy, or a call between services |
| `CLIENTS.md` | When a project ships an installed client: wire changes, the compatibility floor, store builds |
| `ts`, `bin/`, `lib/` | The dispatcher, the shared scripts, and what they source |
