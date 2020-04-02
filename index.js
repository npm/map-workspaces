const { promisify } = require('util')
const path = require('path')

const getName = require('@npmcli/name-from-folder')
const minimatch = require('minimatch')
const rpj = require('read-package-json-fast')
const glob = require('glob')
const pGlob = promisify(glob)

function appendNegatedPatterns (patterns) {
  const results = []
  for (let pattern of patterns) {
    const excl = pattern.match(/^!+/)
    if (excl) {
      pattern = pattern.substr(excl[0].length)
    }

    // strip off any / from the start of the pattern.  /foo => foo
    pattern = pattern.replace(/^\/+/, '')

    // an odd number of ! means a negated pattern.  !!foo ==> foo
    const negate = excl && excl[0].length % 2 === 1
    results.push({ pattern, negate })
  }

  return results
}

function getPatterns (workspaces) {
  return [
    ...appendNegatedPatterns(
      Array.isArray(workspaces.packages)
        ? workspaces.packages
        : workspaces
    ),
    { pattern: '**/node_modules/**', negate: true },
  ]
}

function isEmpty (patterns) {
 return !Array.isArray(patterns) || !patterns.length
}

function getPackageName (pkg, pathname) {
    const { name } = pkg
    return name || getName(pathname)
}

function concatResults (globs) {
  return globs.reduce((res, glob) => res.concat(glob), [])
}

function getGlobPattern (pattern) {
  return pattern.endsWith('/')
    ? pattern
    : `${pattern}/`
}

function getPackages (pkgPathnames) {
  const promisedPackageJsons = pkgPathnames.map(
    packagePathname => rpj(packagePathname)
      .catch(err => {
        if (err.code === 'ENOENT') {
          return null
        } else {
          throw err
        }
      })
  )

  return Promise.all(promisedPackageJsons)
}

function getDuplicateWorkspaceError () {
  return Object.assign(
    new Error('must not have multiple workspaces with the same name'),
    { code: 'EDUPLICATEWORKSPACE' }
  )
}

function getMissingPkgError () {
  return Object.assign(
    new TypeError('mapWorkspaces missing pkg info'),
    { code: 'EMAPWORKSPACESPKG' }
  )
}

function getMissingLockfileError () {
  return Object.assign(
    new TypeError('mapWorkspaces.virtual missing lockfile info'),
    { code: 'EMAPWORKSPACESLOCKFILE' }
  )
}

async function mapWorkspaces (opts = {}) {
  if (!opts || !opts.pkg) {
    throw getMissingPkgError()
  }

  const { workspaces = [] } = opts.pkg
  const patterns = getPatterns(workspaces)
  const results = new Map()

  if (isEmpty(patterns)) {
    return results
  }

  const globOpts = {
    ...opts,
    ignore: [
      ...opts.ignore || [],
      ...['**/node_modules/**']
    ]
  }
  const getPathnames = () => Promise.all(
    patterns.map(pattern => pGlob(getGlobPattern(pattern), globOpts))
  )

  const getPackagePathname = pathname => {
    const cwd = opts.cwd ? opts.cwd : process.cwd()
    return path.join(cwd, pathname, 'package.json')
  }

  const retrievePackagePathnames = pathnames =>
    pathnames.map(
      pathname => getPackagePathname(pathname)
    )

  const pkgPathnames = await getPathnames()
    .then(concatResults)
    .then(retrievePackagePathnames)

  const packageJsons = await getPackages(pkgPathnames)
  for (const index of pkgPathnames.keys()) {
    if (!packageJsons[index]) {
      continue
    }

    const packagePathname = path.dirname(pkgPathnames[index])
    const name = getPackageName(packageJsons[index], packagePathname)

    if (results.get(name)) {
      throw getDuplicateWorkspaceError()
    }

    results.set(name, packagePathname)
  }

  return results
}

mapWorkspaces.virtual = function (opts = {}) {
  if (!opts || !opts.lockfile) {
    throw getMissingLockfileError()
  }

  const { packages = {} } = opts.lockfile
  const { workspaces = [] } = packages[''] || {}
  const patterns = getPatterns(workspaces)

  // uses a pathname-keyed map in order to negate the exact items
  const pathnames = new Map()

  if (isEmpty(patterns)) {
    return pathnames
  }

  const getPackagePathname = pathname => {
    const cwd = opts.cwd ? opts.cwd : process.cwd()
    return path.join(cwd, pathname)
  }

  for (const packageKey of Object.keys(packages)) {
    if (packageKey === '') {
      continue
    }

    for (const item of patterns) {
      if (minimatch(packageKey, item.pattern)) {
        const packagePathname = getPackagePathname(packageKey)
        const name = getPackageName(packages[packageKey], packagePathname)

        if (item.negate) {
          pathnames.delete(packagePathname)
        } else {
          pathnames.set(packagePathname, name)
        }
      }
    }
  }

  // Invert pathname-keyed to a proper name-to-pathnames Map
  return new Map(Array.from(pathnames, item => item.reverse()))
}

module.exports = mapWorkspaces
