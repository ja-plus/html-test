const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    console.log('index');
    await ctx.render('index');
})

module.exports = router;
