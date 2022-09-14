import React from 'react'

import { Icon } from './Icon'
import { icons } from './shared/icons'

export default {
  title: 'Design System/Icon',
  component: Icon
}

export const Labels = (args) => (
  <>
    There are {Object.keys(icons).length} icons
    <ul className="storybook-stories-icon__list">
      {Object.keys(icons).map((key) => (
        <li className="storybook-stories-icon__list-item" key={key}>
          <Icon icon={key} aria-hidden />
          <div style={{ color: '#666;', fontSize: '12px;' }}>{key}</div>
        </li>
      ))}
    </ul>
  </>
)

export const NoLabels = (args) => (
  <ul className="storybook-stories-icon__list">
    {Object.keys(icons).map((key) => (
      <li
        className="storybook-stories-icon__list-item storybook-stories-icon__list-item--minimal"
        key={key}
      >
        <Icon icon={key} aria-label={key} />
      </li>
    ))}
  </ul>
)

NoLabels.storyName = 'no labels'

export const Inline = (args) => (
  <>
    this is an inline <Icon {...args} /> icon (default)
  </>
)
Inline.args = {
  icon: 'facehappy',
  'aria-label': 'Happy face'
}

export const Block = (args) => (
  <>
    this is a block <Icon {...args} /> icon
  </>
)
Block.args = {
  icon: 'facehappy',
  'aria-label': 'Happy face',
  block: true
}
