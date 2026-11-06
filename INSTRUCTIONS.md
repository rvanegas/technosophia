# Instructions

How to keep a project's agent instructions (`CLAUDE.md`) worth their
cost, and how to read large files. Read this when adding to the
instructions file, or when it passes its cap.

## The instructions file is paid for every session

**It is loaded in full into every session, before anybody types anything.**
Everything in `planning/` is read only when somebody goes looking, so a
paragraph there is free until it is needed and a paragraph in the
instructions is paid for every time. That asymmetry is the reason for the
split, and it decays quietly: the natural place to write down what just
happened is the file already open.

- **Give it a cap, and state its current length in the file.** Correct that
  figure in the same commit as any change to the file, or the rule governs
  against a number nobody has checked.
- **What does not belong**, and is almost all of any excess:
  - *Deploy narrative.* What was deployed is `ts deploys`, what is running is
    `ts health`, and why is a dated decision if it needs saying.
  - *Reasoning about unshipped work.* It belongs in the task file.
  - *The story behind a rule.* Keep the rule and the cost of breaking it;
    move the account of the afternoon it cost, leaving a pointer.
- **What earns its place is what stops somebody losing a day**: the traps.
  Keep them verbatim however long the file gets. The density of the prose is
  not the problem; accumulation is.
- **When the traps alone reach the cap, split by who needs it**, not by how
  old it is. Move a subject a whole class of work never touches to its own
  standing document, entire, and leave a section that names the traps in it
  and says when to go read it. A trap that bites outside its subject stays.
- **Trim in the same commit** as whatever added the material, while the
  judgement about what is durable is still fresh.

## The cost is in what it points at

A fixed sentence that says *read X* costs whatever X has grown to since
somebody wrote it, so the bill can grow with nothing in the instructions
changing.

- **A pointer says when to read the thing**, not merely that it exists. An
  unconditional *read it* aimed at a file that quadruples is a bill that
  grows on its own.
- **A standing document over about 20KB carries its own index**: a table of
  its sections and when to read each, or a line per term. A pointer can then
  say *read the index*, and a session pays for the paragraph it needs.
- **A record that many sessions append to is one file per entry**, not one
  file. An append-only volume fails at its cap in every way such a scheme
  fails.

## Reading large files

- **A plain read stops at 2,000 lines and drops the tail, silently.** In an
  append-only file that is the newest material; in a source file it is
  whatever function you were looking for. Concluding that a function is
  absent from such a read is a conclusion about the tool, not the file. Grep
  for the line and read the range. It is a reason to read in ranges, not to
  split a file.
- Line length is not a constraint: a read truncates a line at 2,000
  characters.
- **A sentence saying which version you are on can be wrong.** Confirm
  against the manifest (`package.json`, the lockfile) rather than trusting
  the instructions.
