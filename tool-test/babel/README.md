## 观察babel是如何转换代码的，及babel-preset babel-plugin如何使用  
配置不同的babel.config.js  
使用npm run bd 来打包study.js代码  
注：babel config配置chrome低版本，不支持es6的浏览器，才会转换es6语法  
transform-runtime 作用
* 是抽取polyfill，而不是每个文件都定义一个polyfill方法
* polyfill方法promise ,Array.map方法时，不定义在prototype上
  
@babel/polyfill 是core-js 和regenerator-runtime 两个包的合并，已废弃。直接安装core-js即可

# regenerate-runtime
Babel 7.13.0 之后
# @babel/plugin-transform-runtime
不用这个插件会在js 中加上 `_regeneratorRuntime` 一个很大的方法，影响打包体积。
# @babel/runtime
用了 `@babel/plugin-transform-runtime` 会引入此包
因为corejs默认配置为false
false	npm install --save @babel/runtime
2	    npm install --save @babel/runtime-corejs2
3	    npm install --save @babel/runtime-corejs3
# @babel/runtime-corejs3 
`@babel/plugin-transform-runtime` 配置了corejs 会引入 `@babel/runtime-corejs3` 中的文件。
`@babel/runtime` 就不用了
# corejs & @babel/runtime-corejs3 & @babel/runtime
这三个在babel编译阶段不倍依赖。babel 7.4 后不需要。
@babel/runtime 和 @babel/runtime-corejs3 是用于在编译后的代码中提供辅助函数的库。
core-js 则是一个提供 ECMAScript 新特性的 polyfills 的库。
在webpack编译阶段会使用。
