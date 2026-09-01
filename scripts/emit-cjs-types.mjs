/**
 * vite-plugin-dts emits a single dist/index.d.ts. In a "type": "module"
 * package that file is resolved as ESM types, so consumers using the
 * "require" condition get types that only work under dynamic import.
 * TypeScript resolves the CJS entry against index.d.cts, so emit one.
 */
import { copyFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dist = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'dist'
)

const entry = path.join(dist, 'index.d.ts')
const types = await readFile(entry, 'utf8')

/**
 * `bundleTypes` needs @microsoft/api-extractor, which unplugin-dts declares
 * as an OPTIONAL peer. If it goes missing the plugin does not fail — it emits
 * `export * from './src/index.js'` instead, pointing at a directory `files`
 * never publishes. The package still builds and still packs; it just ships
 * types that resolve to nothing. Fail here instead, where the cause is
 * legible, rather than leaving it to whoever installs the release.
 */
const unbundled = types.match(/from '(\.[^']*)'/)
if (unbundled) {
  throw new Error(
    `dist/index.d.ts still imports ${unbundled[1]}, so the declaration ` +
      'rollup did not run. Check that @microsoft/api-extractor is installed.'
  )
}

await copyFile(entry, path.join(dist, 'index.d.cts'))
