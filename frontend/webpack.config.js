var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isDev = process.argv.indexOf('--watch') > -1;
var isTest = process.argv[1].indexOf('karma') > -1;

var entry = ['whatwg-fetch', './app/js/index.js', './app/css/index.scss'];
var output;
var loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!sass')
  },
  {
    test: /\.(png|jpg|gif|woff|woff2)$/,
    loader: 'url-loader?limit=8192'
  }
];

var plugins = [
  new HtmlWebpackPlugin({
    title: 'Ping Pong Registration',
    template: 'app/index.html',
    trackingId: process.env.GA_TRACKING_ID
  }),
  new ExtractTextPlugin('index.css'),
  new webpack.DefinePlugin({
    ACTION_CABLE_SERVER_URL: isDev ? undefined : JSON.stringify('wss://pivotal-samo-pong-reg.cfapps.io:4443/cable'),
    'process.env.NODE_ENV': JSON.stringify((isDev || isTest) ? 'development' : 'production')
  })
];

if (isDev) {
  entry.unshift('react-addons-perf');
  output = { path: path.join(__dirname, '..', 'backend', 'public'), filename: 'index.js' };
  loaders.push({ test: require.resolve('react-addons-perf'), loader: 'expose?Perf' });
} else {
  output = { path: path.join(__dirname, 'dist'), filename: 'index-[hash].js' };
  if (!isTest) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }
}

module.exports = {
  entry: entry,
  output: output,
  module: { loaders },
  devtool: isDev && 'source-map',
  plugins: plugins
};
