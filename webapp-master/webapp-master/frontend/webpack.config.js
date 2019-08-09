const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const SRC_PATH = __dirname + '/src';
const BUILD_PATH = __dirname + '/public';

// default NODE_ENV to development
const NODE_ENV = process.env['NODE_ENV'] || 'development';

let config = (module.exports = {
  context: SRC_PATH,
  entry: {
    hot: 'react-hot-loader/patch',
    index: './index.js',
    styles: './main.css',
  },
  output: {
    path: BUILD_PATH + '/app/dist',
    filename: '[name].bundle.js?[hash]',
    publicPath: 'app/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
    alias: {
      webapp: SRC_PATH,
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: __dirname + '/public/index_template.html',
      filename: '../../index.html',
      alwaysWriteToDisk: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: __dirname + '/public/app/dist',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

if (NODE_ENV === 'development') {
  config.output.filename = '[name].hot.bundle.js?[hash]';
  config.output.publicPath =
    'http://localhost:8080/' + config.output.publicPath;
  config.devServer = {
    hot: true,
    inline: true,
    contentBase: BUILD_PATH,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // if webpack doesn't reload UI after code change in development
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: 1000
    // }
    // if you want to reduce stats noise
    // stats: 'minimal' // values: none, errors-only, minimal, normal, verbose
  };
}
