const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap({
  stats: 'minimal',
  entry: {
    app: './src/app.js',
    // federation: './src/federation.js',//webpack5联邦模块
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8081,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
    alias: {
      '@': path.join(__dirname, '..', 'src'), // 在项目中使用@符号代替src路径，导入文件路径更方便
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx$/, // 一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/, // 屏蔽不需要处理的文件（文件夹）（可选）
        loader: 'babel-loader', // loader的名称（必须）
      },
      {
        test: /\.(t|j)s$/,
        // loader: 'ts-loader',
        loader: 'swc-loader',
      },
      {
        test: /\.svelte$/,
        loader: 'svelte-loader',
      },
      // {
      //   test: /\.m?js$/,
      //   loader: 'esbuild-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     target: 'es2015',
      //   },
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app',
      // library: { type: 'var', name: 'app' },
      remotes: {
        remoteApp: 'app@http://localhost:3000/remoteEntry',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: true, // true：默认值，script标签位于html文件的 body 底部
      hash: true, // 在打包的资源插入html会加上hash
      //  html 文件进行压缩
      minify: {
        removeComments: true, // 去注释
        collapseWhitespace: true, // 压缩空格
        removeAttributeQuotes: true, // 去除属性 标签的 引号  例如 <p id="test" /> 输出 <p id=test/>
      },
    }),
  ],
});
