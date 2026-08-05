import { defineConfig } from 'vite'
import { pigment } from '@pigment-css/vite-plugin'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true, tsconfigPath: './tsconfig.app.json' }),
    pigment()
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
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', '@pigment-css/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@pigment-css/react': 'pigmentCssReact'
        },
        exports: 'named'
      }
    }
  }
})
