const { promisify } = require('util')
const path = require('path')

const rpj = require('read-package-json-fast')
const glob = require('glob')
const pGlob = promisify(glob)

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
          return {}
        } else {
          throw err
        }
      })
  )

  return Promise.all(promisedPackageJsons)
}

function getDuplicateWorkspace () {
  return Object.assign(
    new Error('must not have multiple workspaces with the same name'),
    { code: 'EDUPLICATEWORKSPACE' }
  )
}

async function mapWorkspaces (opts = {}) {
  const { pkg = {} } = opts
  const { workspaces = [] } = pkg
  const patterns = Array.isArray(workspaces.packages)
    ? workspaces.packages
    : workspaces
  const results = new Map()

  if (!Array.isArray(patterns) || !patterns.length) { return results }

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
    const packagePathname = pkgPathnames[index]
    const { name } = packageJsons[index]
    if (name) {
      if (results.get(name)) {
        throw getDuplicateWorkspace()
      }

      results.set(name, path.dirname(packagePathname))
    }
  }

  return results
}

module.exports = mapWorkspaces
