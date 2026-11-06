# technosophia

Development practices, written once, for every project that adopts them.

They are for projects of a particular shape: a few people, much of the work
done by coding agents in sessions, small services each deployed from its own
repository to a server its owners run, and some of those services calling
each other. A project of that shape could take them as they stand.

The name is *τεχνοσοφία*: craft as the application of wisdom, not its
contrary.

## How a project adopts them

A project's agent instructions (`CLAUDE.md`, `AGENTS.md`) import the core:

    @~/src/technosophia/WORKING.md

and point at the rest for when it comes up. Every practice here applies
unless the project's own instructions say otherwise. An exception names the
practice it departs from and says why.

This repository names no project. Projects refer to it; it never refers to
them. Whatever belongs to one project stays in that project.

## What is here

| File | Read |
|---|---|
| `WORKING.md` | Every session: branches, the verbs, and how a change is recorded |
| `SERVICES.md` | When changing a service's config, secrets, health, deploy, or a call between services |
