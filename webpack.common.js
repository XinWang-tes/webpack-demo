const path = require('path')
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        test: /\.jsx?$/, 
        loader: 'babel-loader', 
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), "node_modules"]
  },
}