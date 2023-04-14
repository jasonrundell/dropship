import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/css'

export const Container = ({ id, classNames, children }) => {
  const style = css`
    margin: 0 auto;
    padding: 0 1.5rem;
    @media (min-width: 48rem) {
      width: 42rem;
      padding: 0;
    }
  `

  return (
    <div id={id} css={style} className={classNames}>
      {children}
    </div>
  )
}

Container.propTypes = {
  /**
   * Assign a unique id to the section. A common use-case.
   */
  id: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Container content.
   */
  children: PropTypes.any.isRequired
}

Container.defaultProps = {
  id: null,
  classNames: null
}
