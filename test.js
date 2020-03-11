const tap = require('tap')
const { test } = tap

const requireInject = require('require-inject')

const mapWorskpaces = require('./index.js')

tap.cleanSnapshot = str =>
  str.split(process.cwd()).join('{CWD}').replace('\\', '/')

test('simple workspaces config', t => {
  const cwd = t.testdir({
    a: {
      'package.json': '{ "name": "a" }'
    },
    b: {
      'package.json': '{ "name": "b" }'
    }
  })

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
  const cwd = t.testdir({
    packages: {
      a: {
        'package.json': '{ "name": "a" }'
      },
      b: {
        'package.json': '{ "name": "b" }'
      }
    }
  })

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
  t.testdir({
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
  const cwd = t.testdir({
    packages: {
      a: {
        'package.json': '{ "name": "a" }'
      }
    }
  })

  const mapW = requireInject('./index.js', {
    glob: (pattern, opts, cb) => {
      cb(null, 'packages/a')
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
  const cwd = t.testdir({
    a: {
      'package.json': '{ "version": "1.0.0" }'
    },
    b: {
      'package.json': '{ "name": "b" }'
    }
  })

  return t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: ['a', 'b']
    }, { cwd }),
    'should ignore packages missing a valid name'
  )
})

test('empty folders', t => {
  const cwd = t.testdir({
    a: {
      'package.json': '{ "name": "a" }'
    },
    b: {
      'package.json': '{ "name": "b" }'
    },
    c: {}
  })

  return t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: {
        packages: [
          'a',
          'b',
          'c'
        ]
      }
    }, { cwd }),
    'should ignore empty folders'
  )
})

test('unexpected rpj errors', t => {
  const cwd = t.testdir({
    a: {
      'package.json': '{ "name": "a" }'
    },
    b: {
      'package.json': '{ "name": "b" }'
    }
  })

  const err = new Error('ERR')
  err.code = 'ERR'

  const mapW = requireInject('./index.js', {
    'read-package-json-fast': () => Promise.reject(err)
  })

  return t.rejects(
    mapW({
      workspaces: {
        packages: [
          'a',
          'b'
        ]
      }
    }, { cwd }),
    err,
    'should reject with unexpected error'
  )
})

test('nested glob lookups', t => {
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
        packages: [
          'packages/**'
        ]
      }
    }, { cwd }),
    'should return a valid map'
  )
})

test('use of / at end of defined globs', t => {
  const cwd = t.testdir({
    a: {
      'package.json': '{ "name": "a" }'
    },
    b: {
      'package.json': '{ "name": "b" }'
    }
  })

  return t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: {
        packages: [
          'a/',
          'b/'
        ]
      }
    }, { cwd }),
    'should return a valid map'
  )
})
