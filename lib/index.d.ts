export type GlobPatterns = string[];

/**
 * This configuration includes `nohoist` which
 * is only supported in `yarn`, but for completeness,
 * we have included it here.
 */
export interface WorkspacesConfig {
  packages: GlobPatterns;
  nohoist?: GlobPatterns;
}

/**
 * A very limited set of `package.json` properties
 * that are utilized for @npmcli/map-workspaces
 */
export interface PackageJson {
  name: string;
  workspaces?: WorkspacesConfig | GlobPatterns;
}

/**
 * Just the very minimum types used by
 * `@npmcli/map-workspaces`
 */
export interface MapWorkspacesOpts {
  ignore: string[];
  cwd: string;
  pkg: PackageJson;
}

export type FoundWorkspaces = Map<string, string>;
export type MapWorkspacesOutput = Promise<FoundWorkspaces>;

declare const mapWorkspaces: (opts: MapWorkspacesOpts) => MapWorkspacesOutput;
export default mapWorkspaces;
