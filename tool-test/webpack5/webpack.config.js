const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildPlugin } = require('esbuild-loader');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap({
  entry: {
    app: './src/app.js',
    federation: './src/federation.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },
  plugins: [
    new ESBuildPlugin(),
    new ModuleFederationPlugin({
      name: 'app',
      // library: { type: 'var', name: 'app' },
      remotes: {
        remoteApp: 'app@http://localhost:3000/remoteEntry'
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
  ],
});