const tap = require('tap')
const { test } = tap

const mapWorkspaces = require('../')

tap.cleanSnapshot = str => {
  const cleanPath = path => path
    .replace(/\\+/g, '/') // normalize slashes
    .replace(/"\w:/g, '"') // gets rid of drive letter in snapshot
    .replace(/^\w:/g, '') // gets rid of drive letter in cwd/paths
  const cwd = cleanPath(process.cwd())
  const pathname = cleanPath(str)
  return pathname.split(cwd).join('{CWD}')
}

test('simple workspaces config', t => {
  const cwd = t.testdir()
  t.matchSnapshot(
    mapWorkspaces.virtual({
      cwd,
      lockfile: {
        name: 'workspace-simple',
        lockfileVersion: 2,
        requires: true,
        packages: {
          '': {
            name: 'workspace-simple',
            workspaces: {
              packages: [
                'a',
                'b',
              ],
            },
          },
          a: {
            name: 'a',
            version: '1.0.0',
            dependencies: {
              b: '^1.0.0',
            },
          },
          b: {
            name: 'b',
            version: '1.0.0',
          },
          'node_modules/a': {
            resolved: 'a',
            link: true,
          },
          'node_modules/b': {
            resolved: 'b',
            link: true,
          },
        },
        dependencies: {
          a: {
            version: 'file:a',
          },
          b: {
            version: 'file:b',
          },
        },
      },
    }),
    'should return a valid map'
  )
  t.end()
})

test('unexpected lockfile info', t => {
  const cwd = t.testdir()

  const results = [
    mapWorkspaces.virtual({
      cwd,
      lockfile: 1,
    }),
    mapWorkspaces.virtual({
      cwd,
      lockfile: 'foo',
    }),
    mapWorkspaces.virtual({
      cwd,
      lockfile: {},
    }),
  ]
  t.matchSnapshot(results, 'should return an empty map')
  t.end()
})

test('invalid options', t => {
  const invalid = [
    () => mapWorkspaces.virtual({}),
    () => mapWorkspaces.virtual({ lockfile: null }),
    () => mapWorkspaces.virtual([]),
    () => mapWorkspaces.virtual('foo'),
    () => mapWorkspaces.virtual(1),
    () => mapWorkspaces.virtual(NaN),
    () => mapWorkspaces.virtual(null),
    () => mapWorkspaces.virtual(),
  ]

  for (const i of invalid) {
    t.throws(
      i,
      { code: 'EMAPWORKSPACESLOCKFILE' },
      'should throw a TypeError'
    )
  }

  t.end()
})

test('no cwd provided', t => {
  const cwd = t.testdir()

  const processCwd = process.cwd
  process.cwd = () => {
    process.cwd = processCwd
    t.ok('should default to process.cwd()')
    t.end()
    return cwd
  }

  mapWorkspaces.virtual({
    lockfile: {
      name: 'workspace-simple',
      packages: {
        '': {
          name: 'workspace-simple',
          workspaces: {
            packages: [
              'a',
              'b',
            ],
          },
        },
        a: {
          name: 'a',
          version: '1.0.0',
        },
      },
    },
  })
})

test('should ignore nested node_modules', t => {
  const cwd = t.testdir()
  t.matchSnapshot(
    mapWorkspaces.virtual({
      cwd,
      lockfile: {
        name: 'workspace-ignore-nm',
        lockfileVersion: 2,
        requires: true,
        packages: {
          '': {
            name: 'workspace-ignore-nm',
            workspaces: {
              packages: [
                'packages/**',
              ],
            },
          },
          'node_modules/a': {
            resolved: 'packages/a',
            link: true,
          },
          'packages/a': {
            name: 'a',
            version: '1.0.0',
          },
          'packages/a/node_modules/not-a-workspace': {
            name: 'not-a-workspace',
          },
        },
        dependencies: {
          a: {
            version: 'file:packages/a',
          },
        },
      },
    }),
    'should return a valid map'
  )
  t.end()
})

test('transitive dependencies', t => {
  const cwd = t.testdir()
  t.matchSnapshot(
    mapWorkspaces.virtual({
      cwd,
      lockfile: {
        name: 'workspaces-transitive-deps',
        version: '1.0.0',
        lockfileVersion: 2,
        requires: true,
        packages: {
          '': {
            name: 'workspaces-transitive-deps',
            version: '1.0.0',
            workspaces: [
              'packages/**',
            ],
          },
          'node_modules/a': {
            resolved: 'packages/a',
            link: true,
          },
          'node_modules/once': {
            name: 'once',
            version: '1.4.0',
            resolved: 'https://registry.npmjs.org/once/-/once-1.4.0.tgz',
            integrity: 'sha1-WDsap3WWHUsROsF9nFC6753Xa9E=',
            dev: true,
            dependencies: {
              wrappy: '1',
            },
          },
          'node_modules/wrappy': {
            name: 'wrappy',
            version: '1.0.2',
            resolved: 'https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz',
            integrity: 'sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8=',
            dev: true,
          },
          'packages/a': {
            name: 'a',
            version: '1.0.0',
            devDependencies: {
              once: '^1.4.0',
            },
          },
        },
        dependencies: {
          a: {
            version: 'file:packages/a',
          },
          once: {
            version: '1.4.0',
            resolved: 'https://registry.npmjs.org/once/-/once-1.4.0.tgz',
            integrity: 'sha1-WDsap3WWHUsROsF9nFC6753Xa9E=',
            dev: true,
            requires: {
              wrappy: '1',
            },
          },
          wrappy: {
            version: '1.0.2',
            resolved: 'https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz',
            integrity: 'sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8=',
            dev: true,
          },
        },
      },
    }),
    'should return a map containing only the valid workspaces'
  )
  t.end()
})

test('negate globs in workspaces config', t => {
  const cwd = t.testdir()
  t.matchSnapshot(
    mapWorkspaces.virtual({
      cwd,
      lockfile: {
        name: 'negate-glob-example',
        lockfileVersion: 2,
        requires: true,
        packages: {
          '': {
            name: 'negate-glob-example',
            workspaces: {
              packages: [
                'packages/*',
                '!packages/b',
              ],
            },
          },
          'packages/a': {
            name: 'a',
            version: '1.0.0',
          },
          'packages/b': {
            name: 'b',
            version: '1.0.0',
          },
          'node_modules/a': {
            resolved: 'packages/a',
            link: true,
          },
        },
        dependencies: {
          a: {
            version: 'file:packages/a',
          },
          b: {
            version: 'file:packages/b',
          },
        },
      },
    }),
    'should not return negated workspaces'
  )
  t.end()
})

test('double-negated', t => {
  const cwd = t.testdir()
  t.matchSnapshot(
    mapWorkspaces.virtual({
      cwd,
      lockfile: {
        name: 'negate-glob-example',
        lockfileVersion: 2,
        requires: true,
        packages: {
          '': {
            name: 'negate-glob-example',
            workspaces: {
              packages: [
                'packages/*',
                '!!packages/b',
              ],
            },
          },
          'packages/a': {
            name: 'a',
            version: '1.0.0',
          },
          'packages/b': {
            name: 'b',
            version: '1.0.0',
          },
          'node_modules/a': {
            resolved: 'packages/a',
            link: true,
          },
        },
        dependencies: {
          a: {
            version: 'file:packages/a',
          },
          b: {
            version: 'file:packages/b',
          },
        },
      },
    }),
    'should return the doubly-negated item as part of the Map'
  )
  t.end()
})

test('triple-negated', t => {
  const cwd = t.testdir()
  t.matchSnapshot(
    mapWorkspaces.virtual({
      cwd,
      lockfile: {
        name: 'negate-glob-example',
        lockfileVersion: 2,
        requires: true,
        packages: {
          '': {
            name: 'negate-glob-example',
            workspaces: {
              packages: [
                'packages/*',
                '!!!packages/b',
              ],
            },
          },
          'packages/a': {
            name: 'a',
            version: '1.0.0',
          },
          'packages/b': {
            name: 'b',
            version: '1.0.0',
          },
          'node_modules/a': {
            resolved: 'packages/a',
            link: true,
          },
        },
        dependencies: {
          a: {
            version: 'file:packages/a',
          },
          b: {
            version: 'file:packages/b',
          },
        },
      },
    }),
    'should exclude that item from returned Map'
  )
  t.end()
})

test('matched then negated then match again', t => {
  const cwd = t.testdir()
  t.matchSnapshot(
    mapWorkspaces.virtual({
      cwd,
      lockfile: {
        name: 'negate-glob-example',
        lockfileVersion: 2,
        requires: true,
        packages: {
          '': {
            name: 'negate-glob-example',
            workspaces: {
              packages: [
                'packages/*',
                '!packages/b',
                'packages/b',
              ],
            },
          },
          'packages/a': {
            name: 'a',
            version: '1.0.0',
          },
          'packages/b': {
            name: 'b',
            version: '1.0.0',
          },
          'node_modules/a': {
            resolved: 'packages/a',
            link: true,
          },
        },
        dependencies: {
          a: {
            version: 'file:packages/a',
          },
          b: {
            version: 'file:packages/b',
          },
        },
      },
    }),
    'should include item on returned Map'
  )
  t.end()
})

test('matched then negated then match again then negate again', t => {
  const cwd = t.testdir()
  t.matchSnapshot(
    mapWorkspaces.virtual({
      cwd,
      lockfile: {
        name: 'negate-glob-example',
        lockfileVersion: 2,
        requires: true,
        packages: {
          '': {
            name: 'negate-glob-example',
            workspaces: {
              packages: [
                'packages/**',
                '!packages/foo',
                'packages/foo/*',
                '!packages/foo/b',
              ],
            },
          },
          'packages/a': {
            name: 'a',
            version: '1.0.0',
          },
          'packages/foo/b': {
            name: 'b',
            version: '1.0.0',
          },
          'node_modules/a': {
            resolved: 'packages/a',
            link: true,
          },
        },
        dependencies: {
          a: {
            version: 'file:packages/a',
          },
          b: {
            version: 'file:packages/foo/b',
          },
        },
      },
    }),
    'should exclude negated item from returned Map'
  )
  t.end()
})
