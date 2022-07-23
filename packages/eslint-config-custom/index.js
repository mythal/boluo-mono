module.exports = {
  plugins: ['formatjs'],
  extends: ['next', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',

    // https://eslint.org/docs/rules/
    // https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'formatjs/no-offset': 'error',
    'formatjs/no-emoji': 'error',
    'formatjs/enforce-default-message': ['error', 'literal'],
    'import/order': 'warn',
    'import/newline-after-import': 'warn',
    'import/first': 'warn',
    'import/no-mutable-exports': 'warn',
    'import/no-cycle': 'warn',
    'import/no-unresolved': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'warn',
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],

      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        // https://typescript-eslint.io/docs/linting/type-linting
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
      ],

      parser: '@typescript-eslint/parser',
      // parserOptions: {
      //   tsconfigRootDir: __dirname,
      //   project: ['./tsconfig.json'],
      // },
      rules: {
        // https://typescript-eslint.io/rules/
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/prefer-regexp-exec': 'warn',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      },
    },
  ],
};
