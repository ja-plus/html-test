## 观察babel是如何转换代码的，及babel-preset babel-plugin如何使用  
配置不同的babel.config.js  
使用npm run bd 来打包study.js代码  
注：babel config配置chrome低版本，不支持es6的浏览器，才会转换es6语法  
transform-runtime 作用
* 是抽取polyfill，而不是每个文件都定义一个polyfill方法
* polyfill方法promise ,Array.map方法时，不定义在prototype上
  
@babel/polyfill 是core-js 和regenerator-runtime 两个包的合并，已废弃。直接安装core-js即可