import React from 'react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Link } from './Link'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Link',
  component: Link
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Link {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Link'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Link'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Link'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Link'
}

export const WithInteractions = (args) => <Link {...args} />
WithInteractions.args = {
  primary: true,
  to: 'https://github.com/jasonrundell/dropship',
  size: 'medium',
  onClick: undefined,
  label: 'Dropship',
  target: '_blank',
  rel: 'noopener noreferrer'
}

WithInteractions.play = async ({ canvasElement }) => {
  // Assigns canvas to the component root element
  const canvas = within(canvasElement)
  const linkElement = canvas.getByRole('link')
  expect(linkElement).not.toBeNull()
  expect(linkElement).toHaveAttribute('href', 'https://github.com/jasonrundell/dropship')
  expect(linkElement).toHaveAttribute('target', '_blank')
  expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer')
  expect(linkElement.textContent).toEqual('Dropship')
}
