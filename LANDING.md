# Landing

The mechanics of *land*, once it has been asked for (`WORKING.md`), and of
the worktrees work is done in. Read this when asked to land, and when
starting work in a worktree.

## Land: merge, push, clean up

**"Land it" means merge, push and clean up, in one phrase, and puts the
change in nobody's hands.** Get the branch onto `master`, **push `master` to
the origin**, remove the worktree if the work was done in one, delete the
branch locally and on the origin.

- **The push is not optional and is the step that gets skipped.** A change
  that has landed on one machine is one that every other checkout, and any
  deploy run from one, silently does not have. Since `ts deploy` ships the
  working tree rather than a ref, the server can be running it while the
  origin has never heard of it.
- **Assume `master` has moved.** Several sessions work one repository at
  once from separate worktrees. Re-read it at the moment of merging, not
  before: rebase onto what is there now, re-run the tests if the rebase moved
  anything, and only then fast-forward. **`--ff-only`** makes a stale
  assumption fail loudly instead of inventing a merge commit.
- **Rebase only while nobody else has the branch.** It rewrites commits that
  are already pushed, so it needs a force-push: harmless for a branch one
  session made, not harmless once anything pulls it. When the branch is
  shared, or the rebase throws conflicts whose resolution is a judgement
  rather than a formality, make an ordinary merge commit instead and say so.
  Landing is not the moment to invent what the change meant.
- **The worktree goes before the branch.** Git refuses to delete a branch
  checked out somewhere, and the error names neither the worktree nor which
  one. A session inside a worktree has to leave it first, since the merge
  happens where `master` is checked out.
- **`git branch -d` refuses a branch whose upstream has diverged** even when
  `master` already contains every commit, which is what rebasing a pushed
  branch leaves behind. Reading that refusal as "not merged" is how somebody
  talks themselves out of a landing that was complete.
- **Fold any pending edit to the task file into the landing commit.** A
  session finishing a task often finds its file already deleted or rewritten
  in the working tree, because the person at the prompt reached the same
  conclusion from the other end. That edit is the same statement the landing
  is, so it belongs in the same commit. **Take theirs where the two
  disagree**: a deleted file beats a note explaining why the entry was kept.

## Worktrees

- **Never switch branches in the main checkout.** Other sessions commit
  there. Branch in a worktree, and before landing check that `master..branch`
  holds only your commits.
- **A worktree lives inside its repository, at `.claude/worktrees/<branch>`**,
  never in a directory beside it: `git worktree add -b <branch>
  .claude/worktrees/<branch> master`. Inside, it is found from the checkout
  it belongs to and goes when the repository does; beside, it reads as a
  project of its own. **The path is gitignored in every project**, since each
  worktree holds its own `.git` file, and `git add -A` in the main checkout
  would otherwise stage it as an embedded repository.
- **A fresh worktree has no dependencies: run `ts worktree-setup` in it
  first.** Git populates it with tracked files only, and the first test run
  fails as a missing command, which reads like a broken toolchain.
- **Never symlink the main checkout's modules.** An install in the worktree
  writes through the link, so a branch that bumps a dependency changes what
  `master` builds against.
