const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'vue3': 'vue3/dist/vue.esm-bundler.js'
      }
    }
  },
  chainWebpack(config) {
    // config.module.rule('vue').exclude.add('/src/vue3');
    // config
    //   .module
    //   .rule('vue3')
    //   .before('vue')
    //   .test(/\.vue3\.vue$/)
    //   // .include.add('/src/vue3')
    //   // .end()
    //   .use('vue3')
    //   .loader('vue-loader-v16')
    // config
    //   .module
    //   .rule('less')
    //   .exclude
    //   .add('/src/vue3')
    
    // config
    //   .module
    //   .rule('vue3-less-conf')
    //   .before('less')
    //   .test(/\.less$/)
    //   .include
    //   .add('/src/vue3')
    //   .end()
    //   .use('vue3-style')
    //   .loader('vue-style-loader')
    //   .end()
    //   .use('vue3-css')
    //   .loader('css-loader')
    //   .end()
    //   .use('vue3-less')
    //   .loader('less-loader')
    //   .end()
      
     
  }
})
