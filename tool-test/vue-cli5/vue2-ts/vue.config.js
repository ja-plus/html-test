const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  lintOnSave: 'warning',
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end();
  },
});
