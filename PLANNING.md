# Planning

Where a project's writing other than its code lives, and how a session finds
it. Read this when filing, resolving or retiring a task, a backlog item or a
decision, or when adding a standing document.

## `planning/`

Everything that is not the agent instructions lives in **`planning/`**. The
instructions file stays at the root because it is the one a fresh reader is
pointed at; the rest are documents you go looking for, and a root that lists
them all buries the code.

Three directories answer a standing question each:

- **`planning/task/`**: the roadmap. Features, audits, open questions, things
  to go and find out.
- **`planning/backlog/`**: what is known and not done.
- **`planning/decision/`**: what was built and why, including what was
  deliberately not built, the half most likely to be mistaken for an
  oversight.

All three are **one file per item**, a paragraph or so each, and `ls` is the
index. A file's name is the slug of its `# ` heading: lowercase, every run of
non-alphanumerics a single hyphen. **A decision's name carries its date too**,
`<date>-<title>.md`, because a decision is dated history and a task is not.
Writing one means adding a file and nothing else: no volume, no cap, no
rollover. Each directory's `README.md` is its whole convention.

`ts task "Some Title"` makes a task; `ts note new backlog|decision "..."` the
others; `ts note check` holds the invariants, and the test suite runs it.

## A quoted title is a reference

**Any verb followed by a quoted string that slugifies to the name of a file in
`planning/task/` or `planning/backlog/` is a reference to that file, and is
not itself a description of the work.** `Do task "Track Usage"` and `Start on
"track-usage"` mean the same thing. Read the file first: what is in it is the
request, and everything the title leaves out is in it. Taking the title at
face value is how you build something adjacent to the ask.

**`ts note find "..."` is that rule, executable.** Resolve a reference with
it rather than by eye: the exact slug, else the file it uniquely prefixes,
else it refuses and says what it collided with. If a quotation coincides with
a filename and the request is plainly about something else, it is a
coincidence; read it as context tells you to, and say which way. **The verb
is not part of the convention**: it says what is wanted done, and a good half
of these are questions rather than features.

## Where a thing is written

- **A design for unbuilt work** lives in the task file that asks for it.
- **An open investigation** lives in `backlog/`.
- **When the work ships**, whatever reasoning survives moves to `decision/`.
- **The top of `planning/` holds only standing documents**: guidance that is
  neither deferred work nor history, with `planning/README.md` saying what
  each is for and when to read it.
- **References inside `planning/`** are by bare filename, since they are
  siblings. From outside, they carry `planning/`.

## Standing documents

A standing document answers a question that keeps being asked: how to
release, where each credential lives, what each state is called. A few rules
keep them true and cheap:

- **A glossary is the source of truth for the vocabulary.** Where a name in
  the code and an entry disagree, one of them is a bug. Ordinary words used
  narrowly are the dangerous ones: read the way English suggests, they get
  the adjacent thing built. Keep a section at the top with **every term in
  one line**, enough for ordinary work, so the glossary is cheap to read
  routinely.
- **Maintain it in the same commit as the code**: rename there when the code
  renames, add an entry when a word starts to mean something new, and edit
  the one-line list in the same breath, since that is the half that gets
  read. A lagging source of truth authorises the wrong word.
- **A style guide for the interface** (colour tokens and what each is spent
  on, type roles, controls, the rules that look like tidying and are not)
  is maintained the same way. A guide describing the app as it was
  authorises the wrong control.
- **A document over about 20KB carries its own index** (`INSTRUCTIONS.md`).

## The archive is archaeology

Decisions are **not consulted as a matter of course**. A collection that
grows to a megabyte costs more to sweep than everything else a session reads.
Go in when a comment or a decision in the code is genuinely inexplicable and
knowing why would change what you do, or when you are about to contradict
something that was clearly decided: a shipped design's reasoning is not
always what the task that asked for it appears to ask. Then match filenames
first (`ts note find`, `ls`), headings second, and never sweep the prose.

Deploys are not in it: they record themselves (`SERVICES.md`).
