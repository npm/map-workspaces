/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test.virtual.js TAP negate globs in workspaces config > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test-virtual-negate-globs-in-workspaces-config/packages/a",
}
`

exports[`test.virtual.js TAP should ignore nested node_modules > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test-virtual-should-ignore-nested-node-modules/packages/a",
  "not-a-workspace" => "{CWD}/test-virtual-should-ignore-nested-node-modules/packages/a/node_modules/not-a-workspace",
}
`

exports[`test.virtual.js TAP simple workspaces config > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test-virtual-simple-workspaces-config/a",
  "b" => "{CWD}/test-virtual-simple-workspaces-config/b",
}
`

exports[`test.virtual.js TAP transitive dependencies > should return a map containing only the valid workspaces 1`] = `
Map {
  "a" => "{CWD}/test-virtual-transitive-dependencies/packages/a",
}
`

exports[`test.virtual.js TAP unexpected lockfile info > should return an empty map 1`] = `
Array [
  Map {},
  Map {},
  Map {},
]
`
