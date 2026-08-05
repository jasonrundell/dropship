import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      // vite-plugin-dts 5 (unplugin-dts) renamed rollupTypes to bundleTypes.
      bundleTypes: true,
      tsconfigPath: './tsconfig.app.json',
      // Without this the emit walks every file the tsconfig includes and
      // ships declarations for tests and stories alongside the library.
      include: [
        'src/index.ts',
        'src/lib/**/*.ts',
        'src/stories/atoms/**/*.tsx'
      ],
      exclude: ['**/*.test.*', '**/*.stories.*']
    }),
    vanillaExtractPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Dropship',
      formats: ['es', 'cjs'],
      // The package is "type": "module", so the CJS build needs a .cjs
      // extension or Node parses it as ESM and consumers get a syntax error.
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
    },
    cssCodeSplit: false,
    // public/ holds Storybook demo assets; they must not ship in the package.
    copyPublicDir: false,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: (asset) =>
          asset.names?.some((name) => name.endsWith('.css'))
            ? 'style.css'
            : '[name][extname]',
        exports: 'named'
      }
    }
  }
})
