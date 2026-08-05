import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

/** Builds the theme gallery in src/App.tsx, separate from the library build. */
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  base: './',
  build: { outDir: 'demo-dist', emptyOutDir: true }
})
