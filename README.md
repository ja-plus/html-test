html test
一些html灵感和技术测试  

* /html目录下的html文件可以直接使用vscode 的插件live server打开  
或者直接双击文件使用浏览器打开（个别html文件使用es module的方式引入js，则仍须使用server打开）

* /js 目录下为js

* /server 目录为一个node + koa 搭建的简单服务，用于接口测试，主要用来测试jafetch（fetch API的封装）  
启动命令 npm run start

* /test 目录为测试html，引入了需要测试的js，使用live server 启动，请求上述node server 服务的接口