const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].chunk.[chunkhash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].[hash].css',
    //   chunkFilename: '[id].[hash].css'
    // }),
    // new ExtractTextPlugin({
    //   filename: 'xin.css'
    // }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
      },
    },
  },
  //感觉webpack现在自带打包
  // optimization: {
  //   minimizer: [new TerserPlugin({
  //     parallel: true,
  //     cache: true,
  //   })],
  // },
})