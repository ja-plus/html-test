/** @type {import("snowpack").SnowpackUserConfig} */
module.exports = {
  type: 'development',
  mount: {
    // 目录：挂载到那个url下，左侧的key表示目录
    src: { url: '/dist' },
    public: { url: '/', static: true }
  },
  plugins: [
    '@snowpack/plugin-sass',
    'snowpack-plugin-less', // 两个style文件同名的情况下，优先sass
    ['@snowpack/plugin-babel', {
      input: ['.js', '.mjs'], // 需要编译的文件后缀
      transformOptions: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              chrome: '68',
            }
          }]
        ]
      }
    }],
    ['@snowpack/plugin-webpack', {
      sourceMap: true,
      htmlMinifierOptions: false, // 是否压缩html 默认true
      // outputPattern: { // 同webpack output.filename
      //   css: '[name].css',
      //   js: '[name].bundle.js',
      //   // assets: 'assets'
      // },
      // extendConfig:(webpackConfig) => {return webpackConfig} // 扩展webpack 配置
      // mainfest: false,//是否生成mainfest文件
      // failOnWarnings: false,// webpack 发出警报是否停止打包
    }]
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
    port: 8080,
    hostname: 'localhost',
    openUrl: '/index.html', // 启动项目时默认打开的path
  },
  buildOptions: {
    /* ... */
    sourcemap: 'inline' // 试验性
  },
};