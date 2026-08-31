import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    // `.claude` holds agent worktrees — full copies of this repo at other
    // commits. Their test files are collected by the default glob and pass,
    // which quietly inflates the run with results from code that is not on
    // this branch.
    exclude: [...configDefaults.exclude, '.claude/**'],
    // The vanilla-extract plugin runs its own Vite compiler for .css.ts files;
    // isolating each test file in a forked process lets it be torn down cleanly.
    pool: 'forks',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'json-summary'],
      include: ['src/lib/**/*.ts', 'src/components/**/*.tsx'],
      exclude: ['**/*.stories.*'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
    }
  }
})
