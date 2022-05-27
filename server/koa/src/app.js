const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
// const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const staticMid = require('koa-static');
const compress = require('koa-compress');
const path = require('path');
const chalk = require('chalk');
const logger = require('./logger.js');

const webRouter = require('./router/webRouter.js');
const serverRouter = require('./router/serverRouter.js');

const socket = require('./socket.io.js');
socket(app);

app.use(
  views(__dirname + '/views', {
    extension: 'html',
  }),
);
app.use(
  cors({
    // origin: '127.0.0.1',
    // credentials: true // 支持跨域cookie
  }),
);

// app.use(bodyParser());
app.use(
  koaBody({
    multipart: true, // 支持formData
  }),
);

app.use(async (ctx, next) => {
  // 收到请求的时间
  logger.info(chalk.bgGreen(ctx.method), ctx.url, ctx.header.referer || ctx.header.host);
  await next(); // 必须await
});
// 配置静态资源目录，放在后端路由前，优先获取静态自选
app.use(
  staticMid(__dirname + '/statics', {
    maxAge: 1000,
  }),
);
app.use(compress()); // gzip br 压缩
app.use(webRouter.routes());
app.use(serverRouter.routes());

// app.listen(8080, '10.10.17.92', () => {
//   logger.info('服务已启动，访问地址：http://10.10.17.92:8080');
// });
app.listen(8080, () => {
  logger.info('服务已启动，访问地址：http://localhost:8080');
});
