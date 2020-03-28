/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test.js TAP empty folders > should ignore empty folders 1`] = `
Map {
  "a" => "{CWD}/test-empty-folders/a",
  "b" => "{CWD}/test-empty-folders/b",
}
`

exports[`test.js TAP empty packages declaration > should return an empty map 1`] = `
Map {}
`

exports[`test.js TAP ignore option > should ignore things from opts.ignore 1`] = `
Map {
  "a" => "{CWD}/test-ignore-option/packages/a",
}
`

exports[`test.js TAP invalid packages declaration > should return an empty map 1`] = `
Map {}
`

exports[`test.js TAP missing pkg info > should return an empty map 1`] = `
Array [
  Map {},
  Map {},
  Map {},
]
`

exports[`test.js TAP nested glob lookups > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test-nested-glob-lookups/packages/a",
}
`

exports[`test.js TAP nested node_modules > should ignore packages within node_modules 1`] = `
Map {
  "a" => "{CWD}/test-nested-node-modules/packages/a",
  "b" => "{CWD}/test-nested-node-modules/packages/b",
  "e" => "{CWD}/test-nested-node-modules/foo/bar/baz/e",
}
`

exports[`test.js TAP no cwd provided > should return valid result using cwd value 1`] = `
Map {
  "a" => "{CWD}/test-no-cwd-provided/packages/a",
}
`

exports[`test.js TAP no package name > should ignore packages missing a valid name 1`] = `
Map {
  "b" => "{CWD}/test-no-package-name/b",
}
`

exports[`test.js TAP simple workspaces config > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test-simple-workspaces-config/a",
  "b" => "{CWD}/test-simple-workspaces-config/b",
}
`

exports[`test.js TAP use of / at end of defined globs > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test-use-of-at-end-of-defined-globs/a",
  "b" => "{CWD}/test-use-of-at-end-of-defined-globs/b",
}
`

exports[`test.js TAP workspaces config using simplistic glob > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test-workspaces-config-using-simplistic-glob/packages/a",
  "b" => "{CWD}/test-workspaces-config-using-simplistic-glob/packages/b",
}
`
