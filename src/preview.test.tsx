import type { Decorator } from '@storybook/react-vite'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import preview from '../.storybook/preview'

/**
 * The theme decorator has to serve two viewers with opposite needs.
 *
 * A story is shown alone on a canvas, so the themed wrapper should fill it —
 * otherwise the design's background stops partway down the page. Docs renders
 * every story as an inline block sized to its own content, and a wrapper
 * demanding viewport height cannot fit in one: it overflows, the block clips
 * to a short strip, and since the wrapper leads with padding the strip is
 * mostly empty. Ten docs pages read as blank.
 */

const decorator = preview.decorators as Decorator[]

const wrapperFor = (viewMode: 'story' | 'docs') => {
  const Story = () => <p>story content</p>
  const context = {
    globals: {},
    viewMode
  } as unknown as Parameters<Decorator>[1]

  const { container } = render(<>{decorator[0](Story as never, context)}</>)

  return container.querySelector<HTMLElement>('[data-theme]')
}

describe('the theme decorator', () => {
  it('is registered', () => {
    expect(decorator).toHaveLength(1)
  })

  it('fills the canvas in story view', () => {
    expect(wrapperFor('story')?.style.minHeight).toBe('100vh')
  })

  it('does not impose viewport height in docs view', () => {
    // Docs blocks are content-sized. Anything viewport-tall here overflows the
    // block and clips the story out of sight.
    expect(wrapperFor('docs')?.style.minHeight).toBe('')
  })

  it('still themes the story in both views', () => {
    for (const viewMode of ['story', 'docs'] as const) {
      expect(wrapperFor(viewMode)?.getAttribute('data-theme')).toBe('hangar')
    }
  })
})
