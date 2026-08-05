import axe from 'axe-core'
import { expect } from 'vitest'

/**
 * Runs axe against a rendered container and asserts there are no violations.
 * Failures list the rule id and the offending markup so the assertion message
 * is actionable on its own.
 */
export async function expectNoAxeViolations(container: HTMLElement) {
  const results = await axe.run(container, {
    // Atoms are rendered in isolation, so page-level landmark and region
    // rules do not apply and would fire on every component.
    rules: {
      region: { enabled: false },
      'page-has-heading-one': { enabled: false },
      'landmark-one-main': { enabled: false },
      // jsdom has no canvas and does not compute layout, so contrast cannot be
      // measured here. Chromatic covers this against a real browser.
      'color-contrast': { enabled: false }
    }
  })

  const messages = results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.help}\n` +
      violation.nodes.map((node) => `  ${node.html}`).join('\n')
  )

  expect(messages, messages.join('\n\n')).toEqual([])
}
