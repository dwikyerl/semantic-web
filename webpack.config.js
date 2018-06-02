const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const javascript = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
  },
};

const eslint = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader',
  },
};

const scss = {
  test: /\.scss$/,
  use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
};

const images = {
  test: /\.(png|jp(e*)g|svg|ico)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8000, // Convert images < 8kb to base64 strings
        name: 'images/[hash]-[name].[ext]',
      },
    },
  ],
};

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [javascript, eslint, scss, images],
  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: 'style.[hash].css',
    //   disable: false,
    //   allChunks: true
    // }),
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
  ],
};
