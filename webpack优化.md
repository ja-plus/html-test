​
性能优化
工程化相关（webpack）：
提取公共代码(Webpack4 webpack.optimize.splitChunks)，拆分出入口文件main.js中import导入的依赖，不包括异步加载（() => import()）的依赖。
组件懒加载 requese.ensure([],callback,'chunkName') 这个也可以，现已经逐步被import()替代，例：vue--"component: () => import()"（关于为什么使用import却没有懒加载，请移步至：import()分片问题）
按需引入echarts，elementUI，antdesign，lodash等包。
echarts4/5按需引入官网例子不相同。 echarts5官网按需引入例子
lodash: babel-plugin-lodash + lodash-webpack-plugin。 lodash按需引入
代码压缩，压缩JS：UglifyJS/UglifyES 。压缩CSS：cssnano 
开启代码压缩（gzip，brotli，sdch，deflate，...）
Webpack 配置externals，并在index.html用<script>引入依赖的min.js文件，vue，echarts等。不打包，也提升了构建速度。
使用CDN加载静态资源(同上配置externals)
prerender-spa-plugin 设定预加载页面 (前端SEO优化)
prerender-spa-plugin 利用了 Puppeteer 的爬取页面的功能。原理是在 Webpack 构建阶段的最后，在本地启动一个 Puppeteer 的服务，访问配置了预渲染的路由，然后将 Puppeteer 中渲染的页面输出到 HTML 文件中，并建立路由对应的目录。引用自[参考资料2]

web-webpack-plugin为每个js生成一个入口文件 AutoWebPlugin插件的使用(每页都是首屏，相当于不要SPA特性)（很久没更新了，低版本webpack可能有用）
路由中加入 Magic comment（Webpack4.6.0+） /* webpackPreload: true */预加载首屏需要的资源 /* webpackPrefetch: true */预下载即将可能用到的资源（浏览器空闲时下载被注释的组件）[参考资料1]
雪碧图 svg-sprite-loader （减少图片请求数）
使用url-loader(依赖file-loader)将小图片通过base64的方式嵌入html（减少图片请求数）
开启Tree Shaking去除无用代码，优化文件大小，配置optimization.usedExports = true  。仅支持es module
使用es module语法import {a, b} from './util.js' 引入。假设a,b是function。
若代码中使用了a() ，则打包时会抽取出util.js的function a(){}的部分代码。util.js中的其他未使用的function代码不会打包。（可以优化lodash-es等工具类）
若util.js用export default导出。则无法触发TreeShaking。

打包后：

unesed harmony export 未使用的function不打包

 babel 配置可能导致打包过大 （babel入门见参考资料8） 
module.exports = {
  presets: [
    ["@babel/preset-env",
      {
        //打包不同的模块cmd，umd,cjs,esm等，尤其umd代码会比较多|
        modules: false, // false 代表esm
        //按需引入需要polyfill的内容，@babel/polyfill已废弃，详细百度@babel/polyfill与core-js
        useBuiltIns: 'usage', 
        corjs: 3, // 使用useBuiltIns需要配置这个，默认为corejs2
        targets: {
          // 需要兼容的浏览器版本，众所周知，浏览器版本越低，需要polyfill的代码越多，与babel有关的代码越多。
          chrome: '84',
        }
      }
    ]
  ]
}
babel合理配置浏览器版本，一般版本越高，polyfill代码越少，按实际情况配置
babel 配置plugin-transform-runtime，用于减少重复引入的polyfill
        
偏前端：
合理使用懒加载，包括但不限于图片懒加载，也可以是表格数据加载，滚动到底部动态加载
监听scroll事件，或使用IntersectionObserver() 来实现。
表格虚拟滚动，表格不分页展示大量数据方案。
合理使用事件委托，不需要每个元素上加事件。
合理使用前端持久化localStorage/sessionStorage/indexedDB
合理使用WebSocket(需服务端支持)。
合理采用loading动画，骨架屏等。
合理使用Web Worker开启多线程，进行复杂CPU密集任务的计算。
折线图如果点很多，可以每几个点采样一个(平均/最大/最小/不计算)点，因为总体图的趋势是相同的。
序列化大量json提升性能：使用 fast-json-stringify
vue：合理使用functional函数式组件，某些组件不涉及vue生命周期时更好性能。
vue：合理使用keep-alive 缓存组件。
vue：data中不需要响应式的大对象，使用Object.freeze()包装，以减少vue中defineProperty的时间。
注意减少重绘重排：
1. dom.style.cssText = 'color:#000;' // 一次设置完css
2. 合理使用 DocumentFragment 
移动端web
使用 passive 改善的滚屏性能 (chrome 51-55) 
偏服务端：
启用HTTP/2 (使用HTTP/2就可以不做，业内的一些在http1.1时做的，关于减少请求个数的优化，需要服务器支持)
合理使用浏览器缓存。强缓存、协商缓存。
服务端在返回html页面时将一些基础数据嵌入html隐藏元素中，以减少ajax请求数量。（前后端不分离）
提升构建速度
Webpack 配置 resolve.extensions常用的后缀放最前面。开发时导入其他模块时尽量带上后缀，此次导入会跳过自动加后缀这一步。
Webpack loader配置项中配置include，exclude指定文件路径，缩小搜索范围。
Webpack  DLLPlugin / DLLReferencePlugin //预打包，预先打包指定的文件（一般是一些不会变动的依赖），之后打包的时候就不会再编译这些文件。
多进程执行loader插件（项目小就不要用，反而可能由于多进程通信原因增加打包时间）
1.happypack //（很久没更新了，低版本webpack可能有用） 
2.thread-loader、cache-loader // webpack4官网文档 请仅在耗时的 loader 上使用
3.parallel-webpack
fast-sass-loader // 多进程sass-loader（低版本webpack可能有用）
多进程多实例并行压缩 [参考资料5]

ParallelUglifyPlugin // 多进程UglifyJS压缩（低版本webpack可能有用） 
uglifyjs-webpack-plugin 开启 parallel 参数
terser-webpack-plugin 开启 parallel 参数 （推荐使用这个，支持 ES6 语法压缩）
hard-source-webpack-plugin // 缓存第一次打包的结果(/node_modules/.cache下)，之后再打包，速度起飞。（webpack5用不了，已经集成了打包缓存如下）
webpack5 配置cache.type='filesystem' // 开发模式默认'memory'(试了一下还是配成filesystem效果明显，会有node-sass报错，换成dart-sass解决)
babel-loader开启缓存 // cacheDirectory: true
sass 编译实在很慢的话，考虑使用node-sass替换sass(dart-sass)，但是node-sass在安装时容易出问题。（据说node-sass（libsass C/C++） 比dart-sass(dart-VM) 快，未验证。）
使用轻量依赖替换
大 -> 小

lodash -> lodash-es
decimal.js -> decimal.js-light
moment.js -> day.js
工具
webpack-bundle-analyzer //热门打包分析工具，可以看到打包后的文件大小。
speed-measure-webpack-plugin  //打印各loader、plugin的耗时
附
配置dev-tool: 'source-map' 打出来的包就不会使用eval函数封装代码

参考资料
webpack预加载
前端prerender-spa-plugin预渲染
AutoWebPlugin插件的使用
深入浅出Webpack 第4章 优化
webpack 打包优化的四种方法（多进程打包，多进程压缩，资源 CDN，动态 polyfill）
webpack打包极限优化
揭秘 Vue.js 九个性能优化技巧
Babel 配置用法解析
别用babel-polyfill了，教你用core-js@3兼容IE浏览器 - 全情海洋 - 博客园 (cnblogs.com)
​