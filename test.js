const path = require('path')

const { test } = require('tap')

const requireInject = require('require-inject')

const mapWorskpaces = require('./index.js')


test('simple workspaces config', t => {
  const cwd = path.relative(
    __dirname,
    t.testdir({
      a: {
        'package.json': '{ "name": "a" }'
      },
      b: {
        'package.json': '{ "name": "b" }'
      }
    })
  )

  return t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: {
        packages: [
          'a',
          'b'
        ]
      }
    }, { cwd }),
    'should return a valid map'
  )
})

test('workspaces config using simplistic glob', t => {
  const cwd = path.relative(
    __dirname,
    t.testdir({
      packages: {
        a: {
          'package.json': '{ "name": "a" }'
        },
        b: {
          'package.json': '{ "name": "b" }'
        }
      }
    })
  )

  return t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: {
        packages: [
          'packages/*'
        ]
      }
    }, { cwd }),
    'should return a valid map'
  )
})

test('duplicated workspaces config', t => {
  const cwd = t.testdir({
    packages: {
      a: {
        'package.json': '{ "name": "a" }'
      },
      b: {
        'package.json': '{ "name": "a" }'
      }
    }
  })

  return t.rejects(
    mapWorskpaces({
      workspaces: {
        packages: [
          'packages/*'
        ]
      }
    }, { cwd }),
    { code: 'EDUPLICATEWORKSPACE' },
    'should throw an error'
  )
})

test('empty packages declaration', t => {
  const cwd = t.testdir({
    packages: {
      a: {
        'package.json': '{ "name": "a" }'
      }
    }
  })

  return t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: {
        packages: []
      }
    }, { cwd }),
    'should return an empty map'
  )
})

test('invalid packages declaration', t => {
  const cwd = t.testdir({
    packages: {
      a: {
        'package.json': '{ "name": "a" }'
      }
    }
  })

  return t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: {
        packages: ''
      }
    }, { cwd }),
    'should return an empty map'
  )
})

test('no pkg provided', t => {
  const cwd = t.testdir({
    packages: {
      a: {
        'package.json': '{ "name": "a" }'
      }
    }
  })

  return t.resolveMatchSnapshot(
    mapWorskpaces(),
    'should return an empty map'
  )
})

test('no cwd provided', t => {
  const cwd = path.relative(
    __dirname,
    t.testdir({
      packages: {
        a: {
          'package.json': '{ "name": "a" }'
        }
      }
    })
  )

  const mapW = requireInject('./index.js', {
    glob: (pattern, opts, cb) => {
      cb(null, [path.join('packages', 'a')])
    }
  })

  const processCwd = process.cwd
  process.cwd = () => {
    process.cwd = processCwd
    t.ok('should default to process.cwd()')
    return cwd
  }

  return t.resolveMatchSnapshot(
    mapW({
      workspaces: [
        'packages/*'
      ]
    }),
    'should return valid result using cwd value'
  )
})

test('no package name', t => {
  const cwd = path.relative(
    __dirname,
    t.testdir({
      a: {
        'package.json': '{ "version": "1.0.0" }'
      },
      b: {
        'package.json': '{ "name": "b" }'
      }
    })
  )

  return t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: ['a', 'b']
    }, { cwd }),
    'should ignore packages missing a valid name'
  )
})
