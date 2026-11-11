# Working

The core every session reads. Kept small, since every session in every
project pays for it.

## Branches and verbs

- **`master` is trunk and is the only thing deployed.** Work goes on
  short-lived branches and merges back. There is no develop branch and there
  are no release branches.
- **The verbs are not synonyms.** *Land* merges a branch onto `master`, pushes
  `master`, and cleans up the branch and its worktree. It puts the change in
  nobody's hands. *Deploy* puts it in everybody's hands. A project that ships
  builds through a store adds its own verbs (upload, submit, release) and
  says what each one costs. Changing DNS or a cloud account is a verb of its
  own too. **Say the one you mean**: "ship it" makes a session guess.
- **One verb at a time, and only when asked.** Finish the work, commit it on
  the branch, say it is ready, and stop. Being asked once does not license
  the next time, naming one verb does not name the others, and a change that
  carries no risk is not exempt. When another verb looks necessary to finish
  the thought, say so and ask. The rule is not about care with git. It is
  about who knows that the work is finished: a session cannot tell whether
  more will be asked of it, and the person at the prompt holds that picture
  across every session at once.

## Recording

- **Record the change with the change.** A document that describes something
  changes in the same commit as the thing it describes.
- **Dates are absolute** (`2026-10-25`), never "yesterday" or "last week". A
  finding says when it was found, because what is true changes.
- **Secrets are named, never written**: in documents, commits, logs, and
  command output alike.
- **A commit subject opens with a verb**: Fixed, Added, Improved, Changed,
  Removed; Bumped a build or version; Recorded a decision or deploy; Filed a
  task or backlog item; Documented standing guidance. The list is a default,
  not a cage: when none fits, use the best verb and propose adding it. The
  body is prose and says why. History is not rewritten to match.
- **Every commit a session writes carries two trailers**, `Co-Authored-By`
  and `Claude-Session: https://claude.ai/code/session_<id>`, the
  conversation the change was argued in. A commit says what changed and a
  decision says why; neither reaches the transcript, where the rejected
  approach and the question that reframed it are. Only a running session
  knows its own URL, so nothing can add it afterwards.
- **No compatibility code where nothing installed depends on it.** No
  deprecation shims, compatibility flags or legacy fallbacks: if something
  changes, change it completely, and rename cleanly, without aliases.
  Existing *data* is still migrated, by a script, when it would otherwise
  break. A project with installed clients is the exception, and keeps a
  register of the shims it owes them (`CLIENTS.md`). **Say so whenever the
  rule decides something**: name what changes completely, what that breaks
  or leaves behind, and the migration it calls for, so the person at the
  prompt sees the cost paid each time for the simplicity.
- **The tests are the record** of what is covered. A hand-kept table of
  which test covers what duplicates the suite and goes stale faster than
  the code.

## Scripts

`ts <name>` runs a project's `bin/<name>`, else technosophia's shared one,
from anywhere in the project; `ts` alone lists them. Run them through `ts`,
never by path.

## Read when

- `LANDING.md`: before starting work on a branch, and when asked to land.
- `PLANNING.md`: when filing, resolving or retiring a task, backlog item or
  decision, or when a quoted title is in the request.
- `INSTRUCTIONS.md`: when adding to the agent instructions file.
- `SERVICES.md`: before changing a service's config, secrets, health,
  deploy, or a call between services.
- `CLIENTS.md`: before changing what an installed client and its server say
  to each other, moving the compatibility floor, or uploading, submitting or
  releasing a build.
