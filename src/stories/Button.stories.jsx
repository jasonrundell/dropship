import React from 'react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Button } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button'
}

export const WithInteractions = (args) => <Button {...args} />
WithInteractions.args = {
  backgroundColor: null,
  primary: true,
  size: 'medium',
  onClick: undefined,
  label: 'Dropship'
}

WithInteractions.play = async ({ canvasElement }) => {
  // Assigns canvas to the component root element
  const canvas = within(canvasElement)
  const buttonElement = canvas.getByRole('button')
  await userEvent.click(buttonElement)
  expect(buttonElement).not.toBeNull()
  expect(buttonElement).toHaveAttribute('type', 'button')
  expect(buttonElement.textContent).toEqual('Dropship')
}
