import PropTypes from 'prop-types'

export const Main = ({ children }) => {
  return <main id="main">{children}</main>
}

Main.propTypes = {
  /**
   * Main content.
   */
  children: PropTypes.any.isRequired
}

Main.defaultProps = {}
