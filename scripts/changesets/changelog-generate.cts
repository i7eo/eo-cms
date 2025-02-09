import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { changesetsChangelogGenerate } from '@unconfig/changeset-config'
import { PKG_PREFIX, PROJECT_CHANGELOG_TEMP_FILE } from '@eo-cms/metas'

const cwd = process.cwd()
const excludeFileNames = ['.DS_Store', 'README.md']

function filterGuard(name: string) {
  return !excludeFileNames.includes(name)
}

const apps = readdirSync(resolve(__dirname, '../../apps'))
  .map((name) => `${PKG_PREFIX}/${name}`)
  .filter(filterGuard)

const packages = readdirSync(resolve(__dirname, '../../packages'))
  .map((name) => `${PKG_PREFIX}/${name}`)
  .filter(filterGuard)

changesetsChangelogGenerate({
  packages: [...packages],
  ignorePackages: [...apps],
  projectChangelogTempPath: PROJECT_CHANGELOG_TEMP_FILE,
  cwd,
})
