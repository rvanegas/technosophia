# Bash completion for ts: the command names, the project's and the shared
# ones, as `ts` alone lists them. Sourced from ~/.bashrc:
#
#   source ~/src/technosophia/completion.bash
#
# Only the first word is completed. After it, the words are the script's own
# and bash falls back to file names (-o default).

_ts() {
  [[ $COMP_CWORD -eq 1 ]] || return 0
  COMPREPLY=($(compgen -W "$(ts --names 2>/dev/null)" -- "${COMP_WORDS[1]}"))
}
complete -o default -F _ts ts
