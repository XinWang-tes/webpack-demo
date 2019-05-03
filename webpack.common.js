const path = require('path')
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    path: path.join(__dirname,'/dist'),
    publicPath: '/',
  },
  module: {
    rules:[
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      { 
        test: /\.jsx$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // {
          //   loader: 'style-loader',
          //   options: {
          //     sourceMap: true,
          //   },
          // },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        loader: 'url-loader',
        options: {
          limit: 9000,
          name: 'fonts/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 9000,
          name: 'images/[name].[hash:8].[ext]',
        },
      },
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), "node_modules"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}