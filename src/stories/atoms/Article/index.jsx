import PropTypes from 'prop-types'
import { css } from '@emotion/react'

export const Article = ({ id, classNames, children }) => {
  const style = css`
    width: 100%;
  `

  return (
    <article id={id} css={style} className={classNames}>
      {children}
    </article>
  )
}

Article.propTypes = {
  /**
   * Assign a unique id to the section. A common use-case.
   */
  id: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Section content.
   */
  children: PropTypes.any.isRequired
}

Article.defaultProps = {
  id: null,
  classNames: null
}
