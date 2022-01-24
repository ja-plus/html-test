const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    console.log('index');
    await ctx.render('index');
});
// 测试statics 静态目录的请求与后端请求，执行顺序
router.get('/test.js', async (ctx) => {
    console.log('index');
    await ctx.render('index');
});

module.exports = router;
