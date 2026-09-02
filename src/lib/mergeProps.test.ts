import { describe, expect, it } from 'vitest'

import { mergeClassNames, mergeStyle } from './mergeProps'

describe('mergeClassNames', () => {
  it('joins every defined class name with a space', () => {
    expect(mergeClassNames('component', 'consumer')).toBe('component consumer')
  })

  it('drops undefined and empty class names instead of leaving gaps', () => {
    expect(mergeClassNames('component', undefined, '', 'consumer')).toBe(
      'component consumer'
    )
  })

  it("keeps the component's own class when no consumer class is given", () => {
    expect(mergeClassNames('component', undefined)).toBe('component')
  })

  it('returns an empty string when nothing is given', () => {
    expect(mergeClassNames(undefined, undefined)).toBe('')
  })
})

describe('mergeStyle', () => {
  it('returns the computed style unchanged when no caller style is given', () => {
    expect(mergeStyle({ '--x': '1px' })).toEqual({ '--x': '1px' })
  })

  it("merges the caller's style on top of the computed style", () => {
    expect(
      mergeStyle({ '--x': '1px', '--y': '2px' }, { color: 'red' })
    ).toEqual({
      '--x': '1px',
      '--y': '2px',
      color: 'red'
    })
  })

  it("lets the caller's style win on a key conflict", () => {
    expect(
      mergeStyle({ color: 'blue' } as Record<string, string>, {
        color: 'red'
      })
    ).toEqual({ color: 'red' })
  })
})
