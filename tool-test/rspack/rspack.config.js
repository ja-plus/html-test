import { VueLoaderPlugin } from 'vue-loader';
import RspackHtmlPlugin from '@rspack/plugin-html';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
/**
 * @type {import('@rspack/cli').Configuration}
 */
export default {
  context: __dirname,
  entry: {
    main: './src/main.js',
  },
  builtins: {
    // vue 要加的
    define: {
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
    },
  },
  resolve: {
    extensions: ['...', '.jsx', '.tsx', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.jsx$/,
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'ecmascript',
              jsx: true,
            },
          },
        },
      },
      {
        test: /\.ts$/,
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              jsx: true,
            },
          },
        },
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
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              // ...
            },
          },
        ],
        resolve: {
          preferRelative: true,
        },
        // type: 'css',
      },
      // {
      //   resourceQuery: /lang=ts/, // 如果需要在 Vue SFC 里使用 Typescript, 请添加该规则
      //   type: 'ts',
      // },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new RspackHtmlPlugin.default({
      template: './index.html',
    }),
  ],
};
