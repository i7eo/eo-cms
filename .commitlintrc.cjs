const fs = require('node:fs')
const path = require('node:path')
const _config = require('@unconfig/commitlint-config').all

const headerMaxLengthConfig = [..._config.rules['header-max-length']]
headerMaxLengthConfig.pop()
const excludeFileNames = ['.DS_Store', 'README.md']

function createScopes() {
  function filterGuard(name) {
    return !excludeFileNames.includes(name)
  }

  const apps = fs
    .readdirSync(path.resolve(__dirname, 'apps'))
    .filter(filterGuard)

  const packages = fs
    .readdirSync(path.resolve(__dirname, 'packages'))
    .filter(filterGuard)

  return [
    '.changeset',
    '.vscode',
    ...apps,
    'docs',
    ...packages,
    'scripts',
    'typings',
    'repository-config',
  ]
}

module.exports = {
  ..._config,

  prompt: {
    ..._config.prompt,
    scopes: [...createScopes()],
  },
  rules: {
    ..._config.rules,
    'scope-enum': [2, 'always', createScopes()],
    "header-max-length": [...headerMaxLengthConfig, 128]
  },
}
