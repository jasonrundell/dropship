module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['react'],
  rules: {
    'multiline-ternary': ['error', 'never'],
    'react/jsx-props-no-spreading': 'error',
    'react/no-unused-prop-types': [
      'error',
      {
        skipShapeProps: true,
        additionalHooks: 'useRecoilCallback', // allows specific hooks as well
        propTypes: {
          css: PropTypes.any // allows the css prop to be unused
        }
      }
    ]
  }
}
