module.exports = {
  presets: ['@babel/preset-env', '@emotion/babel-preset-css-prop'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-private-property-in-object',
    '@emotion/babel-plugin'
  ]
}
