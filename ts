#!/bin/bash
#
# Runs a project's script, or a shared one, from anywhere in the project.
#
#   ts                  list the commands, the project's first
#   ts <name> [args]    run bin/<name> from the project, else the shared one
#
# The project is the git repository holding the current directory. Its own
# bin/<name> wins over a shared one of the same name: that is how a project
# does something otherwise. Every script runs with TS_ROOT set to the
# project's root, and the shared ones read their settings from
# $TS_ROOT/bin/ts.env.
#
# Only this file goes on PATH, so the script names stay plain without
# entering the executable namespace.

set -euo pipefail

shared="$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)/bin"
root="$(git rev-parse --show-toplevel 2>/dev/null || true)"

# The first comment line after the shebang and the bare `#`.
summary() {
  awk 'NR == 1 { next }
       /^(#|\/\/) *$/ { next }
       /^(#|\/\/) / { sub(/^(#|\/\/) /, ""); print; exit }
       { exit }' "$1"
}

list() {
  local dir="$1" mark="$2" f name
  for f in "$dir"/*; do
    [[ -f "$f" && -x "$f" ]] || continue
    name="$(basename "$f")"
    [[ "$mark" == shared && -n "$root" && -x "$root/bin/$name" ]] && continue
    printf "  %-20s %s\n" "$name" "$(summary "$f")"
  done
}

if [[ $# -eq 0 || "$1" == -h || "$1" == --help ]]; then
  if [[ -n "$root" && -d "$root/bin" ]]; then
    echo "$(basename "$root")'s own:"
    list "$root/bin" own
    echo
  fi
  echo "shared (technosophia):"
  list "$shared" shared
  exit 0
fi

name="$1"
shift
[[ "$name" == */* ]] && { echo "ts: a name, not a path: $name" >&2; exit 2; }

if [[ -n "$root" && -x "$root/bin/$name" ]]; then
  exec env TS_ROOT="$root" "$root/bin/$name" "$@"
fi
if [[ -x "$shared/$name" ]]; then
  [[ -n "$root" ]] || { echo "ts: not inside a git repository" >&2; exit 2; }
  exec env TS_ROOT="$root" "$shared/$name" "$@"
fi
echo "ts: no command '$name' — \`ts\` lists them" >&2
exit 127
