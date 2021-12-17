module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage', // 使用的引入，'entry','usage'
        corejs: 3, // 使用useBuiltIns 需要定义corejs版本，不定义默认为2
        targets: {
          chrome: '42',
          // browsers: ['chrome > 49']
        }
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3, // 配置这个polyfill方法才不污染全局
      }
    ]
    // "@babel/plugin-transform-arrow-functions",
    // "@babel/plugin-transform-exponentiation-operator",
  ]
};