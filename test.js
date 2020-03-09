const { test } = require('tap')
const mapWorskpaces = require('./index.js')

test('simple workspaces config', t => {
  const cwd = t.testdir({
    a: {
      'package.json': '{ "name": "a" }'
    },
    b: {
      'package.json': '{ "name": "b" }'
    }
  })

  t.resolveMatchSnapshot(
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
  t.end()
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

  t.resolveMatchSnapshot(
    mapWorskpaces({
      workspaces: {
        packages: [
          'packages/*'
        ]
      }
    }, { cwd }),
    'should return a valid map'
  )
  t.end()
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

  t.rejects(
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
  t.end()
})
