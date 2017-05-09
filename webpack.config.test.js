const path = require('path');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: './tests/www/__all__.js',
  output: {
    path: path.resolve(__dirname, "tests-reports"),
    filename: 'frontend-test-bundle.js'
  },

  externals: [nodeExternals()],
  resolve: {
    modules: ['node_modules', 'bower_components'],
    descriptionFiles: ['package.json', 'bower.json'],
    alias: {
      foundation: 'foundation-sites/dist/js/foundation.min.js'
    }
  },

  plugins: [
    // new WebpackShellPlugin({
    //   verbose: false,
    //   onBuildExit: "node_modules/.bin/mocha --colors --require ./tests/www/__spec-helper__.js ./tests-reports/frontend-test-bundle.js --reporter mocha-simple-html-reporter --reporter-options output=tests-reports/index.html"
    // }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': 'jquery',
    })
  ],

  module: {
    rules: [
      { test: /\.html$/, use: [{ loader: 'html-loader', options: { minimize: true }, }], },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], },
      { test: /\.js$/, exclude: /node_modules/, use: [{ loader: 'babel-loader', query: { compact: false } }], },
      { test: /\.(jpg|jpeg|png|svg|gif)$/, loader: 'file-loader?name=[path][name].[ext]' },

      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }] },
      { test: /\.(woff|woff2)$/, use: [{ loader: 'url-loader?prefix=font/&limit=5000' }] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader?limit=10000&mimetype=application/octet-stream' }] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }] },
    ]
  }
};