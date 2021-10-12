/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test.virtual.js TAP double-negated > should return the doubly-negated item as part of the Map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test.virtual-double-negated/packages/a",
  "b" => "{CWD}/tap-testdir-test.virtual-double-negated/packages/b",
}
`

exports[`test.virtual.js TAP matched then negated then match again > should include item on returned Map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test.virtual-matched-then-negated-then-match-again/packages/a",
  "b" => "{CWD}/tap-testdir-test.virtual-matched-then-negated-then-match-again/packages/b",
}
`

exports[`test.virtual.js TAP matched then negated then match again then negate again > should exclude negated item from returned Map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test.virtual-matched-then-negated-then-match-again-then-negate-again/packages/a",
}
`

exports[`test.virtual.js TAP negate globs in workspaces config > should not return negated workspaces 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test.virtual-negate-globs-in-workspaces-config/packages/a",
}
`

exports[`test.virtual.js TAP should ignore nested node_modules > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test.virtual-should-ignore-nested-node_modules/packages/a",
}
`

exports[`test.virtual.js TAP simple workspaces config > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test.virtual-simple-workspaces-config/a",
  "b" => "{CWD}/tap-testdir-test.virtual-simple-workspaces-config/b",
}
`

exports[`test.virtual.js TAP transitive dependencies > should return a map containing only the valid workspaces 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test.virtual-transitive-dependencies/packages/a",
}
`

exports[`test.virtual.js TAP triple-negated > should exclude that item from returned Map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test.virtual-triple-negated/packages/a",
}
`

exports[`test.virtual.js TAP unexpected lockfile info > should return an empty map 1`] = `
Array [
  Map {},
  Map {},
  Map {},
]
`
