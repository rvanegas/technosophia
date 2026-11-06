# Services

Rules for a service and for calls between services. Read this before changing
a service's config, secrets, health check, deploy, or hostname, or any call to
or from another service. An exception is a bug in the service, not in the
rule.

## Config and secrets

- **Config** lives at `~/.config/<project>/config.toml`, with an environment
  variable for each key. On a server, it is the service's `.env`.
- **Secrets** are never in a synced tree or a repository, and they live in
  files of mode 600. A secret is copied from source to destination without
  being printed.
- **Keys live outside any tree a deploy syncs with `--delete`**, under
  `~/.config/<project>`: a key inside the tree is one a later deploy
  removes. Exclude the pattern from the deploy and from git as well, both
  deliberately.
- **The server's `.env` has a local copy**, the backup and the place a
  credential is authored. `ts env-pull` and `ts env-push` move it, by key
  name, never printing a value.
- **The credentials are listed in one place**, `planning/CREDENTIALS.md`:
  each one, where it lives,
  what it can do, and what losing it costs, with a row per credential saying
  when to read it. Nowhere else names them or counts them: a count in two
  places is a count that disagrees with itself.

## Health and deploy

- **Every service answers `GET /healthz`** with JSON carrying `ok` and
  `commit`: the deployed sha, with `-dirty` added if the tree was dirty. A
  static site serves the same JSON as `/deployed.json`.
- **`ts deploy` ships the working tree, stamped with the commit.** It
  refuses a dirty tree unless asked (`--dirty`), and the stamp then says
  `-dirty`. It runs the project's tests, type checks and builds first
  (`deploy-pre`), and stops if they fail.
- **A deploy ends by checking** that the commit it sent is the one answering:
  on the server first, where the service listens (`HEALTH_LOCAL`), then at
  the public hostname. If not, the deploy failed: a restart that did not
  take looks healthy otherwise, and the two checks say which half failed.
- **A deploy records itself on the server**, one line per outcome, failures
  included; `ts deploys` reads it. Nobody writes a deploy down by hand, and
  no document carries a deployed sha: what is running is a measurement, and
  `ts health` takes it.
- **One hostname per service**, the service's name under a shared domain.
  An exception is recorded where the project's hosting is recorded.

## Calls between services

- **One implementation per capability, so two surfaces cannot diverge.** A
  service's CLI, its API, its tools and its scheduled jobs are thin over
  the same code. A second path to the same capability is a second surface,
  and it drifts from the first without anybody deciding it should.
- **Across projects, that means over HTTPS and only through the callee's
  API**: never shelling out to another project's CLI, importing its
  modules, or reaching into its container or database. Each of those makes
  something the callee never published into a surface it now has to keep.
  When a caller needs more, the callee expands its API.
- Operator tasks (migrations, backups, debugging) are exempt.
- **A bearer token names the caller.** A service holds a static token of its
  own, and a person's browser sends that person's access token. A key is
  never shared between consumers.
- **A person's access to another service is a grant from the callee, never a
  shared identity.** The callee is an OAuth authorization server, and the
  caller holds a token for that one person, scoped and revocable. Where
  several services need to know who someone is, one of them is the identity
  provider. A service that only needs to know who someone is becomes an
  identity-only client, and its tokens reach the provider's `/me` and
  nothing else.
- **Browsers are allowed by CORS** only from the apps' own origins.
- **The callee owns the contract.** It publishes its response shapes at
  `/openapi.json`. A typed client generates its types from that file, and a
  client that parses by hand tests against a recorded real response.
- **Every call between services is recorded** in one place: caller, callee,
  address, the credential the caller holds, and the contract. A new call is
  added there in the same commit as the caller's change.

## Cloud accounts

- **One identity per consumer**, named `<project>-<purpose>`, with least
  privilege. Its policy is kept in a repository.
- **Every resource is tagged `project=<name>`.**
