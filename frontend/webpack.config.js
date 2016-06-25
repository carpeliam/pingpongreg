var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isDev = process.argv.indexOf('--watch') > -1;

var output;
var plugins = [
  new HtmlWebpackPlugin({
    title: 'Ping Pong Registration'
  })
];

if (isDev) {
  output = { path: path.join(__dirname, '..', 'backend', 'public'), filename: 'index.js' };
} else {
  output = { path: path.join(__dirname, 'dist'), filename: 'index-[hash].js' };
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: './app/js/index.js',
  output: output,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  devtool: isDev && 'source-map',
  plugins: plugins
};
