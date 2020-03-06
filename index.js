const { promisify } = require('util')
const path = require('path')

const rpj = require('read-package-json-fast')
const glob = require('glob')
const pGlob = promisify(glob)

function concatResults(globs) {
  return globs.reduce(
    (res, glob) => res.concat(glob)
  , [])
}

function getPackages(pkgPathnames) {
  const promisedPackageJsons = pkgPathnames.map(
    packagePathname => rpj(packagePathname)
  )

  return Promise.all(promisedPackageJsons)
}

async function mapWorkspaces(pkg = {}, opts) {
  const { workspaces = [] } = pkg
  const patterns = Array.isArray(workspaces.packages)
    ? workspaces.packages
    : workspaces
  const results = new Map()

  if (!Array.isArray(patterns) || !patterns.length)
    return results

  const getPathnames = () => Promise.all(
    patterns.map(pattern => pGlob(pattern, opts))
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

  const packageJsons = await getPackages(pkgPathnames) || []
  pkgPathnames.forEach((packagePathname, index) => {
    const { name } = packageJsons[index] || {}
    if (name) {
      results.set(name, path.dirname(packagePathname))
    }
  })

  return results
}

module.exports = mapWorkspaces
