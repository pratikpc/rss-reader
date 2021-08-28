const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

module.exports = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      // React Hot Loader Patch
      // 'react-dom': '@hot-loader/react-dom',
      // Custom Aliases
      ...require('./webpack.aliases'),
    },
    fallback: {
      path: require.resolve('path-browserify'),
      timers: require.resolve('timers-browserify'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      stream: require.resolve('stream-browserify'),
    },
  },
  stats: 'minimal',
};
