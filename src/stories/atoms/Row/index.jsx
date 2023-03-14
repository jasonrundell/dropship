import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

export const Row = ({ justify, classNames, children }) => {
  const style = css`
    display: flex;
    flex-flow: row wrap;
    justify-content: ${justify};
  `

  return (
    <div css={style} className={classNames}>
      {children}
    </div>
  )
}

Row.propTypes = {
  /**
   * Justify content alignment
   */
  justify: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'space-around',
    'space-between',
    'space-evenly'
  ]),
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Row content.
   */
  children: PropTypes.any.isRequired
}

Row.defaultProps = {
  justify: 'start',
  classNames: null
}
