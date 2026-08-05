/**
 * vite-plugin-dts emits a single dist/index.d.ts. In a "type": "module"
 * package that file is resolved as ESM types, so consumers using the
 * "require" condition get types that only work under dynamic import.
 * TypeScript resolves the CJS entry against index.d.cts, so emit one.
 */
import { copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dist = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'dist'
)

await copyFile(path.join(dist, 'index.d.ts'), path.join(dist, 'index.d.cts'))
