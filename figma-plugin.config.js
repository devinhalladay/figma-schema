module.exports = (webpackConfig) => ({
  ...webpackConfig,
  resolve: {
    ...webpackConfig.resolve,
    alias: {
      ...webpackConfig.resolve.alias,
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  stats: "detailed",
});
