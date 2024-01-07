/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/test.js TAP backslashes are normalized > matches with backslashes 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-backslashes-are-normalized/packages/a",
}
`

exports[`test/test.js TAP double negate patterns > should include doubly-negated items into resulting map 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-double-negate-patterns/packages/a",
}
`

exports[`test/test.js TAP duplicated workspaces glob pattern > should allow dup glob-declared packages that resolve to same pathname 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-duplicated-workspaces-glob-pattern/packages/a",
  "b" => "{CWD}/test/tap-testdir-test-duplicated-workspaces-glob-pattern/packages/nested/b",
}
`

exports[`test/test.js TAP empty folders > should ignore empty folders 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-empty-folders/a",
  "b" => "{CWD}/test/tap-testdir-test-empty-folders/b",
}
`

exports[`test/test.js TAP empty packages declaration > should return an empty map 1`] = `
Map {}
`

exports[`test/test.js TAP ignore option > should ignore things from opts.ignore 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-ignore-option/packages/a",
}
`

exports[`test/test.js TAP match duplicates then exclude one > should include the non-excluded item on returned Map 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-match-duplicates-then-exclude-one/packages/a",
}
`

exports[`test/test.js TAP matched then negated then match again > should include item on returned Map 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-matched-then-negated-then-match-again/packages/b/a",
}
`

exports[`test/test.js TAP matched then negated then match again with wildcards > should exclude item on returned Map 1`] = `
Map {}
`

exports[`test/test.js TAP missing pkg info > should return an empty map 1`] = `
Array [
  Map {},
  Map {},
  Map {},
]
`

exports[`test/test.js TAP multiple duplicated workspaces config > should throw an error listing all duplicates 1`] = `
Error: must not have multiple workspaces with the same name
package 'a' has conflicts in the following paths:
    {CWD}/test/tap-testdir-test-multiple-duplicated-workspaces-config/packages/a
    {CWD}/test/tap-testdir-test-multiple-duplicated-workspaces-config/packages/b
    {CWD}/test/tap-testdir-test-multiple-duplicated-workspaces-config/packages/c
package 'b' has conflicts in the following paths:
    {CWD}/test/tap-testdir-test-multiple-duplicated-workspaces-config/packages/d
    {CWD}/test/tap-testdir-test-multiple-duplicated-workspaces-config/packages/e {
  "code": "EDUPLICATEWORKSPACE",
}
`

exports[`test/test.js TAP multiple negate patterns > should not include any negated pattern 1`] = `
Map {}
`

exports[`test/test.js TAP negate pattern > should not include negated patterns 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-negate-pattern/packages/a",
}
`

exports[`test/test.js TAP nested glob lookups > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-nested-glob-lookups/packages/a",
}
`

exports[`test/test.js TAP nested node_modules > should ignore packages within node_modules 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-nested-node_modules/packages/a",
  "b" => "{CWD}/test/tap-testdir-test-nested-node_modules/packages/b",
  "e" => "{CWD}/test/tap-testdir-test-nested-node_modules/foo/bar/baz/e",
}
`

exports[`test/test.js TAP no cwd provided > value is pkg pathname 1`] = `
{CWD}/packages/a
`

exports[`test/test.js TAP no package name > should return map containing valid names as keys 1`] = `
Map {
  "@foo/bar" => "{CWD}/test/tap-testdir-test-no-package-name/packages/@foo/bar",
  "a" => "{CWD}/test/tap-testdir-test-no-package-name/packages/a",
  "b" => "{CWD}/test/tap-testdir-test-no-package-name/packages/b",
}
`

exports[`test/test.js TAP root declared within workspaces > should allow the root package to be declared within workspaces 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-root-declared-within-workspaces/packages/a",
  "root-workspace" => "{CWD}/test/tap-testdir-test-root-declared-within-workspaces",
}
`

exports[`test/test.js TAP simple workspaces config > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-simple-workspaces-config/a",
  "b" => "{CWD}/test/tap-testdir-test-simple-workspaces-config/b",
}
`

exports[`test/test.js TAP simple workspaces config with scoped pkg > should return a valid map 1`] = `
Map {
  "@ruyadorno/scoped-a" => "{CWD}/test/tap-testdir-test-simple-workspaces-config-with-scoped-pkg/packages/a",
  "@ruyadorno/scoped-b" => "{CWD}/test/tap-testdir-test-simple-workspaces-config-with-scoped-pkg/packages/b",
}
`

exports[`test/test.js TAP triple negate patterns > should exclude thrice-negated items from resulting map 1`] = `
Map {}
`

exports[`test/test.js TAP try to declare node_modules > should not include declared packages within node_modules 1`] = `
Map {}
`

exports[`test/test.js TAP use of / at end of defined globs > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-use-of-at-end-of-defined-globs/a",
  "b" => "{CWD}/test/tap-testdir-test-use-of-at-end-of-defined-globs/b",
}
`

exports[`test/test.js TAP workspaces config using simplistic glob > should return a valid map 1`] = `
Map {
  "a" => "{CWD}/test/tap-testdir-test-workspaces-config-using-simplistic-glob/packages/a",
  "b" => "{CWD}/test/tap-testdir-test-workspaces-config-using-simplistic-glob/packages/b",
}
`

exports[`test/test.js TAP workspaces order > should match the exact order of workspaces 1`] = `
Map {
  "@npmcli/docs" => "{CWD}/test/tap-testdir-test-workspaces-order/docs",
  "@npmcli/smoke-tests" => "{CWD}/test/tap-testdir-test-workspaces-order/smoke-tests",
  "@npmcli/mock-registry" => "{CWD}/test/tap-testdir-test-workspaces-order/mock-registry",
  "@npmcli/mock-globals" => "{CWD}/test/tap-testdir-test-workspaces-order/mock-globals",
  "a" => "{CWD}/test/tap-testdir-test-workspaces-order/workspaces/a",
  "b" => "{CWD}/test/tap-testdir-test-workspaces-order/workspaces/b",
}
`
