module.exports = {
  root: true,
  extends: ['@unconfig/eslint-config/base.js'],
  ignorePatterns: [
    '.eslintrc.cjs',
    'apps/backend/src/metadata.ts',
    'apps/backend/dist',
    'packages/database/client/*',
    'packages/database/zod/*',
  ],
}
