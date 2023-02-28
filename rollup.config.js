import styles from 'rollup-plugin-styles'

export default {
  output: {
    // Governs names of CSS files (for assets from CSS use `hash` option for url handler).
    // Note: using value below will put `.css` files near js,
    // but make sure to adjust `hash`, `assetDir` and `publicPath`
    // options for url handler accordingly.
    assetFileNames: '[name]-[hash][extname]'
  },
  plugins: [
    styles({
      mode: 'emit',
      modules: true,
      // ...additionally using autoModules
      autoModules: true
    })
  ]
}
