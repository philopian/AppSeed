const path = require('path');
const webpack = require("webpack");
const BowerWebpackPlugin = require("bower-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  resolve: {
    modulesDirectories: ["node_modules", "bower_components"]
  },
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  target: 'web',
  noInfo: false,
  watch: true,
  caching: true,

  entry: [
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'www/js')
  ],
  output: {
    path: path.resolve(__dirname, 'www'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  exclude: "**/*.css",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BowerWebpackPlugin({
      modulesDirectories: ["bower_components"],
      manifestFiles: "bower.json",
      includes: /.*/,
      excludes: [],
      searchResolveModulesDirectories: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      foundation: "foundation-sites"
    })
  ],
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html', options: { minimize: true } },
      { test: /\.css$/, exclude: /node_modules/, loader: "style!css" },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },

      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.(jpg|jpeg|png|svg|gif)$/, loader: 'file-loader?name=[path][name].[ext]' },
    ]
  }
}
module.exports = config;