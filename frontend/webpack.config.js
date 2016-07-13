var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isDev = process.argv.indexOf('--watch') > -1;
var isTest = process.argv[1].indexOf('karma') > -1;

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
  if (!isTest) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }
}

module.exports = {
  entry: ['whatwg-fetch', /* 'actioncable', */ './app/js/index.js'],
  output: output,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  devtool: (isDev || isTest) && 'source-map',
  plugins: plugins
};
