import PropTypes from 'prop-types'
import { css } from '@emotion/react'

export const Box = ({ isTight, isRoomy, classNames, children }) => {
  const style = css`
    padding: ${isRoomy ? '2.5rem' : isTight ? '0.25rem' : '1.25rem'};
    line-height: 1.25rem;
  `

  return (
    <div css={style} className={classNames}>
      {children}
    </div>
  )
}

Box.propTypes = {
  /**
   * Smaller padding.
   */
  isTight: PropTypes.bool,
  /**
   * Larger padding.
   */
  isRoomy: PropTypes.bool,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Box can contain any elements.
   */
  children: PropTypes.any.isRequired
}

Box.defaultProps = {
  isTight: false,
  isRoomy: false,
  classNames: null
}
