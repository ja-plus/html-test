const { config } = require('@swc/core/spack');

module.exports = config({
  entry: {
    web: './src/index.js',
    // 可以配置多入口
  },
  output: {
    path: './bundle/',
  },
  module: {},
  options: {},
});
