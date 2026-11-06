# Sourced by the shared scripts: the project's root, its settings, and the
# few helpers every one of them needs.
#
# The root is TS_ROOT when `ts` ran the script, else the git repository
# holding the current directory — never the script's own location, which is
# technosophia rather than the project.

# The calling script, absolute, before any of them changes directory.
TS_SELF="$(readlink -f "$0")"
TS_NAME="${TS_SELF##*/}"

TS_ROOT="${TS_ROOT:-$(git rev-parse --show-toplevel 2>/dev/null || true)}"
[[ -n "$TS_ROOT" ]] || { echo "${0##*/}: not inside a git repository" >&2; exit 2; }
PROJECT="${PROJECT:-$(basename "$TS_ROOT")}"

# bin/ts.env: KEY=value lines, sourced. Settings already in the environment
# win, so one run can point somewhere else.
if [[ -f "$TS_ROOT/bin/ts.env" ]]; then
  while IFS= read -r line; do
    [[ "$line" =~ ^[[:space:]]*([A-Z_][A-Z0-9_]*)= ]] || continue
    key="${BASH_REMATCH[1]}"
    [[ -n "${!key+x}" ]] && continue
    eval "export $line"
  done < "$TS_ROOT/bin/ts.env"
  unset line key
fi

die() { echo "$TS_NAME: $*" >&2; exit 1; }

# A setting the script cannot do without.
need() {
  local k
  for k in "$@"; do
    [[ -n "${!k:-}" ]] || die "needs $k, set in bin/ts.env"
  done
}

# Host is an ~/.ssh/config alias: no address, user or key in any script.
SSH="ssh -o BatchMode=yes"
remote() { $SSH "$HOST" "$@"; }

# bin/hooks/<script>-<stage>, run if the project has one; its failure is the
# script's.
hook() {
  local stage="$1"; shift
  local h="$TS_ROOT/bin/hooks/$TS_NAME-$stage"
  [[ -x "$h" ]] || return 0
  TS_ROOT="$TS_ROOT" "$h" "$@"
}
has_hook() { [[ -x "$TS_ROOT/bin/hooks/$TS_NAME-$1" ]]; }

# The comment block at the top of the calling script, as its --help.
usage() {
  awk 'NR == 1 { next } /^#/ { sub(/^# ?/, ""); print; next } { exit }' "$TS_SELF"
}

# Env files, compared by key name alone: values are never printed. Enough to
# see that something moved, and useless to anybody reading over a shoulder or
# scrolling back through a terminal.
env_names() { { grep -oE '^[A-Za-z_][A-Za-z0-9_]*=' "$1" | tr -d '=' | sort; } || true; }

# The `|| true` is load-bearing: `diff` exits 1 when the files differ and
# `grep` when it matches nothing, so under pipefail an unguarded assignment
# aborts exactly when there IS a difference — silently, exit 1, which reads
# as having found nothing to do.
env_changed() {
  { diff <(sort "$1") <(sort "$2") \
    | grep -oE '^[<>] [A-Za-z_][A-Za-z0-9_]*=' \
    | grep -oE '[A-Za-z_][A-Za-z0-9_]*' \
    | sort -u | tr '\n' ' '; } || true
}
