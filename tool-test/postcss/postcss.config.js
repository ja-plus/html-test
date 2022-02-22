module.exports = {
  // parser: 'sugarss',
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 0
    }),
    // 压缩css
    // require('cssnano')({
    //   preset: 'default'
    // })
  ]
};
