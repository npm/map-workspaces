const tap = require('tap')
const { test } = tap

const requireInject = require('require-inject')

const mapWorskpaces = require('./index.js')

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

test('nested node_modules', t => {
  const cwd = t.testdir({
    node_modules: {
      d: {
        'package.json': '{ "name": "d" }'
      }
    },
    foo: {
      bar: {
        node_modules: {
          f: {
            'package.json': '{ "name": "f" }'
          }
        },
        baz: {
          e: {
            'package.json': '{ "name": "e" }'
          }
        }
      }
    },
    packages: {
      node_modules: {
        g: {
          'package.json': '{ "name": "g" }'
        }
      },
      a: {
        'package.json': '{ "name": "a" }',
        node_modules: {
          c: {
            'package.json': '{ "name": "c" }'
          }
        }
      },
      b: {
        'package.json': '{ "name": "b" }'
      }
    }
  })

  return t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: [
        'packages/*',
        'foo/**'
      ]
    }, { cwd }),
    'should ignore packages within node_modules'
  )
})

test('ignore option', t => {
  const cwd = t.testdir({
    foo: {
      bar: {
        baz: {
          e: {
            'package.json': '{ "name": "e" }'
          }
        },
        node_modules: {
          b: {
            'package.json': '{ "name": "b" }'
          }
        }
      }
    },
    packages: {
      a: {
        'package.json': '{ "name": "a" }',
        node_modules: {
          c: {
            'package.json': '{ "name": "c" }'
          }
        }
      }
    }
  })

  return t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: [
        'packages/*',
        'foo/**'
      ]
    }, { cwd, ignore: ['**/baz/**'] }),
    'should ignore things from opts.ignore'
  )
})
