import React from 'react'
import PropTypes from 'prop-types'
import { icons } from './shared/icons'

import './icon.css'
/**
 * An Icon is a piece of visual element, but we must ensure its accessibility while using it.
 * It can have 2 purposes:
 *
 * - *decorative only*: for example, it illustrates a label next to it. We must ensure that it is ignored by screen readers, by setting `aria-hidden` attribute (ex: `<Icon icon="check" aria-hidden />`)
 * - *non-decorative*: it means that it delivers information. For example, an icon as only child in a button. The meaning can be obvious visually, but it must have a proper text alternative via `aria-label` for screen readers. (ex: `<Icon icon="print" aria-label="Print this document" />`)
 */
export const Icon = ({ icon, block, ...props }) => {
  return (
    <svg
      className={`storybook-icon ${block ? 'storybook-icon--block' : ''}`}
      viewBox="0 0 1024 1024"
      width="20px"
      height="20px"
      {...props}
    >
      <path className="storybook-icon__path" d={icons[icon]} />
    </svg>
  )
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  block: PropTypes.bool
}

Icon.defaultProps = {
  block: false
}
