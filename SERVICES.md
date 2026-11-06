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

## Health and deploy

- **Every service answers `GET /healthz`** with JSON carrying `ok` and
  `commit`: the deployed sha, with `-dirty` added if the tree was dirty. A
  static site serves the same JSON as `/deployed.json`.
- **The deploy script stamps the commit.** By default it refuses a dirty
  tree. Asked explicitly, it ships the working tree as it stands, and the
  stamp says so.
- **A deploy ends by checking** that the commit it sent is the one answering,
  first on the server and then at the public hostname. If either check fails,
  the deploy failed.
- **One hostname per service**, the service's name under a shared domain.
  An exception is recorded where the project's hosting is recorded.

## Calls between services

- **Over HTTPS, and only through the callee's HTTP API.** Never through its
  database, its files, or its internals.
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
