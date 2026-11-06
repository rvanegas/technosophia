# Clients

For a project that ships a client people install (an app from a store) as
well as the server it talks to. Read this before changing anything the two
say to each other, before raising the compatibility floor, and before an
upload, a submission or a release.

**The store is not a version, it is a population.** What the server owes
compatibility to is the oldest build still installed, which is not the
newest released one and is not something a branch can represent.

## The verbs a store adds

Besides *land* and *deploy* (`WORKING.md`): **upload** sends a build to the
store's testing channel; **submit** puts an uploaded one in front of review;
**release** makes an approved one downloadable. They are days apart, and the
last two are not reversible. Say the one you mean. A script that submits
**stops before the button**: the irreversible half is a person's.

## The documents and scripts

A project that ships to a store keeps three standing documents, which the
shared scripts name:

- **`planning/RELEASING.md`**: the procedure. What each verb costs, the
  app's build settings and why, what to verify before pressing submit, and
  how to write "What's New". Read it before an upload, a submission or a
  release, and not otherwise.
- **`planning/CREDENTIALS.md`**: where the App Store Connect key, the push
  keys and the upload keystore live (`SERVICES.md`).
- **`planning/DEMO-ACCOUNT.md`**: the accounts a reviewer signs in as, and
  the order they are torn down in. **They outlive approval, because every
  update is reviewed.**

The texts a submission sends live in `planning/submissions/`, named after the
version (`whats-new-<version>.txt`, `review-notes-<version>.txt`), so a
version bump moves both.

The scripts, all through `ts`: `upload-ios` (bump, archive, upload, tag,
then `testflight-notes`), `testflight` (what TestFlight holds; read-only),
`testflight-notes` (What to Test from the commit subjects, then distribute),
`set-review-notes`, `submit-ios` (prepares a submission and stops before the
button; `--status` reads, `--sync-released` offers to move `released`), and
`android` (the emulator loop, `--apk`, `--aab`). Their `--help` names the
settings each reads.

## Tags

- **Every upload is tagged `build/<n>`** by the upload script, which refuses
  a dirty tree: a tag is permanent where a deploy is reversible. Tags are not
  pushed automatically; the command is printed.
- **`released` points at what is downloadable.** It moves on release, not
  approval. No sha is written down anywhere: `git describe --tags released`
  says which build, `git diff released..master` is the drift users cannot
  see, and the store's own status is the second opinion. It is a
  **lightweight ref pointing at the `build/<n>` tag object**: `git tag -f
  released build/<n>` moves it. `-a`, or peeling with `^{}`, are the forms
  that break it.

## Never ship a wire change before the client can speak it

The server deploys in a minute; a new build reaches a phone through store
processing plus whenever somebody updates. A server that renames what it
says kills every installed build the instant it restarts. The way to avoid
it is the ordinary two-step: teach the server the old names as aliases,
deploy that, ship the client, remove the aliases once nobody needs them.

**The third step is a shims register** (`planning/SHIMS.md`), with one rule:
whatever you add at step one gets an entry there in the same commit. Every
shim, with the build that retires it, what it touches, and what must *not*
be deleted alongside it. The gate is knowable only when the shim is written;
a week later it is `git tag --contains` and a guess. Read the register when
the floor moves and at no other time. Delete the entry in the commit that
deletes the shim.

## The compatibility floor

A constant in the server names the oldest build it supports. **A shim may be
deleted only once the floor has passed the build that needed it.**

- **The client enforces it**: a build below the floor replaces itself with
  an update screen. So raising it ends sessions on phones, not merely
  licenses a deletion.
- **The server reports the census** on its health endpoint: the oldest build
  that has called in recently, and how many callers sent no build at all.
  While any are silent, the oldest known build is a floor on the known
  population only.
- **Move the floor only once the oldest installed build has already passed
  it.** Always that order. A build too old to show the update screen can
  never be told.
- **The floor is permission to delete a shim, not a record of the
  population.** A raise that frees nothing is the wrong reason to move it.
