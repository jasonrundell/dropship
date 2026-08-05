import { describe, expect, it } from 'vitest'

import * as dropship from './index'

/**
 * The export list is the package's public API. Anything added here is a
 * feature; anything removed or renamed is a breaking change.
 */
const EXPECTED_EXPORTS = [
  'Blockquote',
  'Box',
  'Button',
  'Container',
  'Grid',
  'Heading',
  'Link',
  'Row',
  'Spacer'
]

describe('public API', () => {
  it('exports exactly the documented components', () => {
    expect(Object.keys(dropship).sort()).toEqual(EXPECTED_EXPORTS)
  })

  it('exports every component as a renderable value', () => {
    for (const name of EXPECTED_EXPORTS) {
      const exported = dropship[name as keyof typeof dropship]
      expect(exported, `${name} should be defined`).toBeDefined()
      expect(['function', 'object'], `${name} should be a component`).toContain(
        typeof exported
      )
    }
  })
})
