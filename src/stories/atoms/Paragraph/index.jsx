import PropTypes from 'prop-types'
import { css } from '@emotion/react'

export const Paragraph = ({ classNames, children }) => {
  const style = css`
    line-height: 1.3;
  `
  return (
    <p css={style} className={classNames}>
      {children}
    </p>
  )
}

Paragraph.propTypes = {
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Paragraph content.
   */
  children: PropTypes.any.isRequired
}

Paragraph.defaultProps = {
  classNames: null
}
