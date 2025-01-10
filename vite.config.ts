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
  esbuild: {
    jsxInject: `import React from 'react'`,
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Dropship',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
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
