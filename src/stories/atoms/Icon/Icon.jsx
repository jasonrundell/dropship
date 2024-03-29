import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { icons } from '../../../shared/icons'

/**
 * An Icon is a piece of visual element, but we must ensure its accessibility while using it.
 * It can have 2 purposes:
 *
 * - *decorative only*: for example, it illustrates a label next to it. We must ensure that it is ignored by screen readers, by setting `aria-hidden` attribute (ex: `<Icon icon="check" aria-hidden />`)
 * - *non-decorative*: it means that it delivers information. For example, an icon as only child in a button. The meaning can be obvious visually, but it must have a proper text alternative via `aria-label` for screen readers. (ex: `<Icon icon="print" aria-label="Print this document" />`)
 */

const StyledIcon = styled.svg`
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  vertical-align: middle;

  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
`

const StyledPath = styled.path`
  fill: currentColor;
`

export const Icon = ({
  icon,
  block,
  ariaLabel,
  classNames,
  pathClassNames
}) => (
  <StyledIcon
    role="img"
    aria-label={ariaLabel}
    className={classNames}
    viewBox="0 0 1024 1024"
    width="20px"
    height="20px"
    block={block}
  >
    <StyledPath className={pathClassNames} d={icons[icon]} />
  </StyledIcon>
)

Icon.propTypes = {
  /**
   * Set the id/name of the icon to use.
   */
  icon: PropTypes.string.isRequired,
  /**
   * Icon will display with block display style. This is useful for icons that are used inline with text.
   */
  block: PropTypes.bool,
  /**
   * Description of icon for screen readers.
   */
  ariaLabel: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the svg element.
   */
  classNames: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the svg path.
   */
  pathClassNames: PropTypes.string
}

Icon.defaultProps = {
  block: false,
  ariaLabel: null
}
