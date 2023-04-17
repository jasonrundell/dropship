const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true
      }
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  features: {
    interactionsDebugger: true
  },
  webpackFinal: async (config) => {
    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src')
    })

    // Add babel-loader for Emotion styles
    config.module.rules.push({
      test: /\.jsx?$/,
      include: [path.resolve(__dirname, '../src')],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              [
                '@emotion/babel-preset-css-prop',
                {
                  autoLabel: 'dev-only',
                  labelFormat: '[local]'
                }
              ]
            ],
            plugins: ['@babel/plugin-syntax-jsx']
          }
        }
      ]
    })

    // Return the altered config
    return config
  }
}
