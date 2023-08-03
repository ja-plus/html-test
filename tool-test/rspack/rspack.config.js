const { VueLoaderPlugin } = require('vue-loader');
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: './src/main.js',
  },
  builtins: {
    html: [
      {
        template: './index.html',
      },
    ],
    // vue 要加的
    define: {
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /vue[\\/].+\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@vue/babel-plugin-jsx'],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 注意，为了绝大多数功能的可用性，请确保该选项为 `true`
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader',
            options: {
              // ...
            },
          },
        ],
        type: 'css',
      },
      // {
      //   resourceQuery: /lang=ts/, // 如果需要在 Vue SFC 里使用 Typescript, 请添加该规则
      //   type: 'ts',
      // },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
