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
         */
        corejs: '3.21',
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
      '@babel/plugin-transform-runtime',
      {
        corejs: 3, // 配置这个polyfill方法才不污染全局
      },
    ],
    // "@babel/plugin-transform-arrow-functions",
    // "@babel/plugin-transform-exponentiation-operator",
    // '@babel/plugin-proposal-object-rest-spread'
  ],
};
