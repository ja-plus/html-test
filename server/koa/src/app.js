const Koa = require('koa');
const views = require('koa-views');
// const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const path = require('path');
const chalk = require('chalk');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'info';

const webRouter = require('./router/webRouter.js');
const serverRouter = require('./router/serverRouter.js');

const app = new Koa();

const render = views(__dirname + '/views', {
    extension: 'html'
});
app.use(cors({
    // origin: '127.0.0.1',
    // credentials: true // 支持跨域cookie
}));
app.use(render);
// app.use(bodyParser());
app.use(koaBody({
    multipart: true // 支持formData
}));
app.use(async (ctx, next) => {
    // 收到请求的时间
    // console.log(
    //     chalk.green(new Date().toLocaleString()),
    //     ctx.header.referer,
    //     chalk.yellow(ctx.url)
    // );
    logger.info( chalk.bgGreen(ctx.method), ctx.url, ctx.header.referer,);
    next();
});
app.use(webRouter.routes());
app.use(serverRouter.routes());



app.listen(8080, () => {
    console.log('服务已启动，访问地址：http://localhost:8080');
});