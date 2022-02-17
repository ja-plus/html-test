const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { ESBuildPlugin } = require('esbuild-loader');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap({
  devtool: 'eval',
  entry: {
    app: './src/app.js',
    svelteApp: './src/svelteApp.js'
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
  resolve: {
    alias: {
      svelte: path.resolve(__dirname, 'node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  module: {
    rules: [
      // {
      //   test: /\.m?js$/,
      //   loader: 'babel-loader?cacheDirectory',
      // },
      {
        test: /\.m?js$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015'
        }
      },
      {
        test: /\.svelte$/,
        loader: 'svelte-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.ts$/,
        // loader: 'ts-loader'
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015'
        }
      }
    ]
  },
  plugins: [
    new ESBuildPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new webpack.DefinePlugin({
      version: '"hahahaha"' // 替换代码中的这个字符
    })
  ]
});