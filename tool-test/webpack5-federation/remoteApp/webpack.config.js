const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  entry: {
    app2: './index.js'
  },
  devServer: {
    port: 3000
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app', // 名称任意，不需与入口相同
      filename: 'remoteEntry',
      library: { type: 'var', name: 'app' },
      // 导出的文件
      exposes: {
        // 左边是使用该模块时import(${name}/ ${key})
        './index': './index',
        './console': './func'
      }
    })
  ]
};