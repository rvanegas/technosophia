// Required by the shared Node scripts: the project's root, its name, and its
// settings, read as lib/common.sh reads them for the bash ones.
//
// The root is TS_ROOT when `ts` ran the script, else the git repository
// holding the current directory — never the script's own location.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

function findRoot() {
  if (process.env.TS_ROOT) return process.env.TS_ROOT;
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    console.error(`${path.basename(process.argv[1])}: not inside a git repository`);
    process.exit(2);
  }
}

const ROOT = findRoot();
// Named for the main checkout, not this one: a worktree's directory is named
// for its branch, and ~/.config/<project> would follow it.
const PROJECT = process.env.PROJECT || path.basename(path.dirname(
  execFileSync('git', ['rev-parse', '--path-format=absolute', '--git-common-dir'], {
    cwd: ROOT, encoding: 'utf8',
  }).trim(),
));

// bin/ts.env: KEY=value lines. The environment wins, so one run can point
// somewhere else.
const file = {};
const envFile = path.join(ROOT, 'bin', 'ts.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) file[m[1]] = m[2].trim().replace(/^(["'])(.*)\1$/, '$2');
  }
}

const expand = (v) => v.replace(/^~(?=\/|$)/, os.homedir()).replace(/\$HOME\b/g, os.homedir());

function setting(key, fallback) {
  const v = process.env[key] ?? file[key];
  return v == null || v === '' ? fallback : expand(v);
}

// Where a project's credentials live, outside any tree: ~/.config/<project>.
const CONFIG_DIR = path.join(os.homedir(), '.config', PROJECT);
// The Expo app, relative to the root.
const APP_DIR = setting('APP_DIR', 'app');

module.exports = { ROOT, PROJECT, setting, CONFIG_DIR, APP_DIR };
