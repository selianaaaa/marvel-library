module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier', 'react', '@typescript-eslint'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'arrow-body-style': ['off'],
    'comma-dangle': [2, 'always-multiline'],
    'no-case-declarations': ['off'],
    'react/jsx-pascal-case': ['off'],

    'no-irregular-whitespace': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
  },
};
