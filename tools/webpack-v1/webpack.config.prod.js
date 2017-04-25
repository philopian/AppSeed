const path = require('path');
const config = require('./config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BowerWebpackPlugin = require("bower-webpack-plugin");

const configWebpack = {
  resolve: {
    modulesDirectories: ["node_modules", "bower_components"]
  },
  debug: true,
  devtool: 'source-map',
  target: 'web',
  noInfo: false,
  watch: false,
  caching: false,

  entry: [
    path.resolve(__dirname, 'www/js')
  ],
  output: {
    path: path.resolve(__dirname, config.distFileName),
    publicPath: '/',
    filename: 'code/bundle.js'
  },
  exclude: "bower_components/**/*.css",
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new BowerWebpackPlugin({
      modulesDirectories: ["bower_components"],
      manifestFiles: "bower.json",
      includes: /.*/,
      excludes: [/.*\.css/, /.*\.scss/],
      searchResolveModulesDirectories: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      foundation: "foundation-sites"
    }),
    new HtmlWebpackPlugin({
      template: 'www/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        // minifyURLs: true
      },
      inject: true
    }),
    new ExtractTextPlugin('code/app.css', { allChunks: false }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html-loader', options: { minimize: true } },
      { test: /\.js$/, loaders: ['babel'] },
      { test: /\.scss$/, exclude: /bower_components/, loader: ExtractTextPlugin.extract('style', "css!postcss!sass") },
      { test: /\.(jpg|jpeg|png|svg|gif)$/, loader: 'file-loader?name=assets/images/[name].[ext]' },

      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    ]
  }
}
module.exports = configWebpack;