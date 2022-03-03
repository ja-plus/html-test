const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  console.log('render index.html');
  await ctx.render('index');
});
router.get('/socketIOChat', async (ctx) => {
  console.log('render socketIOChat.html');
  await ctx.render('socketIOChat');
});
// 测试statics 静态目录的请求与后端请求，执行顺序
router.get('/test.js', async (ctx) => {
  console.log('index');
  await ctx.render('index');
});

module.exports = router;
