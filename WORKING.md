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
