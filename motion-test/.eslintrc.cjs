const path = require('path');

module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended', 'plugin:react/jsx-runtime'],
  ignorePatterns: ['public', '.eslintrc.cjs'],
  // rely only on @typescript-eslint/parser when files are only ts
  parser: '@babel/eslint-parser',
  plugins: ['react', 'react-refresh', 'prettier'],
  rules: {
    complexity: ['error', 15],
  },
  settings: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/extensions': ['.tsx', '.ts', '.jsx', '.js'],
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
      extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb-typescript',
        'plugin:prettier/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: [
              '**/__tests__/*',
              '**/*.spec.ts',
              '**/*.spec.tsx',
              'src/setUpTest.ts',
              'src/test-utils.tsx',
              'vite.config.ts',
            ],
          },
        ],
        'react/function-component-definition': [
          'error',
          {
            namedComponents: ['arrow-function', 'function-expression'],
          },
        ],
        'react/require-default-props': ['off', { classes: 'defaultProps' }],
        'no-restricted-exports': 'off',
        'no-console': [1, { allow: ['error', 'info'] }],
        'jsx-a11y/control-has-associated-label': [2, { controlComponents: ['Link'] }],
        // trust ts
        'react/no-unknown-property': 'off',
        // as most of current code define styled components at bottom
        '@typescript-eslint/no-use-before-define': 'off',
        // trust ts, but dont abuse it
        'react/jsx-props-no-spreading': 'off',
        // trust ts
        'react/prop-types': 'off',
        '@typescript-eslint/consistent-type-imports': 'warn',
        'import/order': [
          'warn',
          {
            groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'unknown'],
            pathGroupsExcludedImportTypes: [],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            distinctGroup: false,
            'newlines-between': 'always',
          },
        ],
      },
    },
  ],
};
