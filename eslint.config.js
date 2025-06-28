import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import preact from 'eslint-plugin-preact';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  configPrettier,
  {
    plugins: {
      preact,
      '@typescript-eslint': tseslint,
      import: importPlugin,
      'unused-imports': unusedImports,
      prettier,
    },
    rules: {
      // Prettier - set as warn to allow auto-fix, disable conflicting rules
      'prettier/prettier': 'warn',
      // Unused imports
      'unused-imports/no-unused-imports': 'error',
      // Import rules
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-duplicates': 'error',
      // Preact/React rules
      'react/react-in-jsx-scope': 'off',
      'preact/no-unknown-property': 'off',
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      'import/resolver': {
        typescript: {
          // Always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.build.json'],
          noWarnOnMultipleProjects: true,
        },
      },
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
  },
];
