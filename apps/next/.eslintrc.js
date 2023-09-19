/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['next', 'custom'],
  overrides: [
    {
      files: ['*.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
