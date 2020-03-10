/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test.js TAP empty folders > should ignore empty folders 1`] = `
Map {
  "a" => "test-empty-folders/a",
  "b" => "test-empty-folders/b",
}
`

exports[`test.js TAP empty packages declaration > should return an empty map 1`] = `
Map {}
`

exports[`test.js TAP invalid packages declaration > should return an empty map 1`] = `
Map {}
`

exports[`test.js TAP no cwd provided > should return valid result using cwd value 1`] = `
Map {
  "a" => "test-no-cwd-provided/packages/a",
}
`

exports[`test.js TAP no package name > should ignore packages missing a valid name 1`] = `
Map {
  "b" => "test-no-package-name/b",
}
`

exports[`test.js TAP no pkg provided > should return an empty map 1`] = `
Map {}
`

exports[`test.js TAP simple workspaces config > should return a valid map 1`] = `
Map {
  "a" => "test-simple-workspaces-config/a",
  "b" => "test-simple-workspaces-config/b",
}
`

exports[`test.js TAP workspaces config using simplistic glob > should return a valid map 1`] = `
Map {
  "a" => "test-workspaces-config-using-simplistic-glob/packages/a",
  "b" => "test-workspaces-config-using-simplistic-glob/packages/b",
}
`
