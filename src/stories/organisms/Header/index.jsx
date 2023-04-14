import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/css'

import { Button } from '../../atoms/Button'

export const Header = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
  classNames,
  welcomeClassNames
}) => {
  const style = css`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      display: inline-block;
      vertical-align: top;
    }

    h1 {
      font-weight: 900;
      font-size: 1.25rem;
      line-height: 1;
      margin: 0.375rem 0 0.375rem 0.625rem;
      display: inline-block;
      vertical-align: top;
    }

    button + button {
      margin-left: 0.625rem;
    }
  `

  const styleWelcome = css`
    font-size: 0.875rem;
    margin-right: 0.625rem;
  `

  return (
    <header>
      <div css={style} className={classNames}>
        <div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                fill="#FFF"
              />
              <path
                d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
                fill="#555AB9"
              />
              <path
                d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
                fill="#91BAF8"
              />
            </g>
          </svg>
          <h1>Acme</h1>
        </div>
        <div>
          {user ? (
            <>
              <span css={styleWelcome} className={welcomeClassNames}>
                Welcome, <b>{user.name}</b>!
              </span>
              <Button size="small" onClick={onLogout} label="Log out" />
            </>
          ) : (
            <>
              <Button size="small" onClick={onLogin} label="Log in" />
              <Button
                primary
                size="small"
                onClick={onCreateAccount}
                label="Sign up"
              />
            </>
          )}
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  /**
   * The user object.
   */
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  /**
   * Callback when the login button is clicked.
   */
  onLogin: PropTypes.func.isRequired,
  /**
   * Callback when the logout button is clicked.
   */
  onLogout: PropTypes.func.isRequired,
  /**
   * Callback when the create account button is clicked.
   */
  onCreateAccount: PropTypes.func.isRequired,
  /**
   * Assign a custom class name or multiple class names to the component.
   */
  classNames: PropTypes.string,
  /**
   * Assign a custom class name or multiple class names to the welcome span.
   */
  welcomeClassNames: PropTypes.string
}

Header.defaultProps = {
  user: null
}
