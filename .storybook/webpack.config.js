const path = require('path')

module.exports = ({ config }) => {
  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@emotion/babel-preset-css-prop')
  ]

  return config
}
