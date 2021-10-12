/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test.js TAP double negate patterns > should include doubly-negated items into resulting map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-double-negate-patterns/packages/a",
}
`

exports[`test.js TAP duplicated workspaces glob pattern > should allow dup glob-declared packages that resolve to same pathname 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-duplicated-workspaces-glob-pattern/packages/a",
  "b" => "{CWD}/tap-testdir-test-duplicated-workspaces-glob-pattern/packages/nested/b",
}
`

exports[`test.js TAP empty folders > should ignore empty folders 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-empty-folders/a",
  "b" => "{CWD}/tap-testdir-test-empty-folders/b",
}
`

exports[`test.js TAP empty packages declaration > should return an empty map 1`] = `
Map {}
`

exports[`test.js TAP ignore option > should ignore things from opts.ignore 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-ignore-option/packages/a",
}
`

exports[`test.js TAP missing pkg info > should return an empty map 1`] = `
Array [
  Map {},
  Map {},
  Map {},
]
`

exports[`test.js TAP multiple negate patterns > should not include any negated pattern 1`] = `
Map {}
`

exports[`test.js TAP negate pattern > should not include negated patterns 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-negate-pattern/packages/a",
}
`

exports[`test.js TAP nested glob lookups > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-nested-glob-lookups/packages/a",
}
`

exports[`test.js TAP nested node_modules > should ignore packages within node_modules 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-nested-node_modules/packages/a",
  "b" => "{CWD}/tap-testdir-test-nested-node_modules/packages/b",
  "e" => "{CWD}/tap-testdir-test-nested-node_modules/foo/bar/baz/e",
}
`

exports[`test.js TAP no cwd provided > value is pkg pathname 1`] = `
{CWD}/packages/a
`

exports[`test.js TAP no package name > should return map containing valid names as keys 1`] = `
Map {
  "@foo/bar" => "{CWD}/tap-testdir-test-no-package-name/packages/@foo/bar",
  "a" => "{CWD}/tap-testdir-test-no-package-name/packages/a",
  "b" => "{CWD}/tap-testdir-test-no-package-name/packages/b",
}
`

exports[`test.js TAP root declared within workspaces > should allow the root package to be declared within workspaces 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-root-declared-within-workspaces/packages/a",
  "root-workspace" => "{CWD}/tap-testdir-test-root-declared-within-workspaces",
}
`

exports[`test.js TAP simple workspaces config > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-simple-workspaces-config/a",
  "b" => "{CWD}/tap-testdir-test-simple-workspaces-config/b",
}
`

exports[`test.js TAP simple workspaces config with scoped pkg > should return a valid map 1`] = `
Map {
  "@ruyadorno/scoped-a" => "{CWD}/tap-testdir-test-simple-workspaces-config-with-scoped-pkg/packages/a",
  "@ruyadorno/scoped-b" => "{CWD}/tap-testdir-test-simple-workspaces-config-with-scoped-pkg/packages/b",
}
`

exports[`test.js TAP triple negate patterns > should exclude thrice-negated items from resulting map 1`] = `
Map {}
`

exports[`test.js TAP try to declare node_modules > should not include declared packages within node_modules 1`] = `
Map {}
`

exports[`test.js TAP use of / at end of defined globs > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-use-of-at-end-of-defined-globs/a",
  "b" => "{CWD}/tap-testdir-test-use-of-at-end-of-defined-globs/b",
}
`

exports[`test.js TAP workspaces config using simplistic glob > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/tap-testdir-test-workspaces-config-using-simplistic-glob/packages/a",
  "b" => "{CWD}/tap-testdir-test-workspaces-config-using-simplistic-glob/packages/b",
}
`
