const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  devtool: 'eval',
  entry: {
    app: './src/app.js'
  },
  devServer: {
    open: true,
    hot: true
  },
  // resolve: {
  //   alias: {
  //     vue: 'vue/dist/vue.esm'
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new webpack.DefinePlugin({
      version: '"hahahaha"' // 替换代码中的这个字符
    })
  ]
};