module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false, // esm 为false
        /**
         * 使用的引入，
         * false
         * 'entry' 文件开头需要import 'core-js' ，才会导入全部polyfill
         * 'usage' 转换使用过的特性
         */
        useBuiltIns: 'usage',
        /**
         * 使用useBuiltIns 需要定义corejs版本，不定义默认为2
         * 注意：这里写corejs: 3的话为3.0，所以一定要带小版本号
         * 会在头部加上 import "core-js/"
         */
        corejs: '3.29.1',
        targets: {
          // esmodules: true,
          chrome: 49,
          // browsers: ['chrome > 49']
        },
        // shippedProposals: true
      },
    ],
  ],
  plugins: [
    [
      // _regeneratorRuntime 用于async await
      // 不使用该插件，则js文件中会注入 _regeneratorRuntime 一个很大的方法。
      '@babel/plugin-transform-runtime',
      {
        // 配置corejs,polyfill方法才不污染全局
        // 使文件头部加上import xx from "@babel/runtime-corejs3/..."
        // 若不配置，会在头部加上 import xx from "@babel/runtime/..."
        // false	npm install --save @babel/runtime
        // 2	npm install --save @babel/runtime-corejs2
        // 3	npm install --save @babel/runtime-corejs3
        corejs: 3,
        // 默认为true
        regenerator: true,
      },
    ],
    // "@babel/plugin-transform-arrow-functions",
    // "@babel/plugin-transform-exponentiation-operator",
    // '@babel/plugin-proposal-object-rest-spread'
  ],
};
