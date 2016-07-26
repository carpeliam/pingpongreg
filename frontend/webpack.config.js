var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isDev = process.argv.indexOf('--watch') > -1;
var isTest = process.argv[1].indexOf('karma') > -1;

var entry = ['whatwg-fetch', './app/js/index.js'];
var output;
var loaders = [{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
}];

var plugins = [
  new HtmlWebpackPlugin({ title: 'Ping Pong Registration' }),
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
