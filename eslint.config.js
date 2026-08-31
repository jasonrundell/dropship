import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import storybook from 'eslint-plugin-storybook'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // `.claude` holds agent worktrees — full copies of this repo at other
  // commits. Linting them reports errors against code that is not on this
  // branch, and fails the run outright when several are present.
  { ignores: ['dist', 'storybook-static', 'coverage', 'public', '.claude'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // react-hooks 7 ships the React Compiler rules (purity, immutability,
      // refs, set-state-in-render, error-boundaries) in this config. The
      // top-level configs.* entries are still eslintrc-shaped; the flat
      // variants live under configs.flat.
      reactHooks.configs.flat['recommended-latest']
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.browser
    },
    plugins: {
      'react-refresh': reactRefresh
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      // Public props are documented via JSDoc on interfaces; an unused
      // parameter is still worth flagging, but an intentional _-prefixed one
      // is not.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ]
    }
  },
  {
    files: ['**/*.test.{ts,tsx}', 'src/test/**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },
  {
    files: ['vite.config.ts', 'vitest.config.ts', '.storybook/*.ts'],
    languageOptions: {
      globals: globals.node
    }
  },
  ...storybook.configs['flat/recommended']
)

/*
 * eslint-plugin-jsx-a11y is deliberately absent. Its latest release (6.10.2,
 * October 2024) declares support only through ESLint 9, and forcing an
 * unsupported pairing is what left `npm run lint` crashing for months before
 * this. Accessibility is covered instead by axe assertions in every component
 * test and by @storybook/addon-a11y. Add the plugin back once it supports
 * ESLint 10.
 */
