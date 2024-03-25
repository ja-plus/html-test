const Router = require('koa-router');
const router = new Router();
const controller = require('../controller/getData.js');
const eventSourceCtrl = require('../controller/eventSource.js')

router.post('/getData', controller.getData);

router.get('/saveData', controller.saveData);

router.get('/getTestData', controller.getTestData);
router.post('/postTestData', controller.postTestData);
router.put('/putTestData', controller.putTestData);
router.del('/delTestData', controller.delTestData);
router.get('/timeoutTestData', controller.timeoutTestData);
router.post('/uploadFile', controller.uploadFile);

router.get('/getHugeData', controller.getHugeData);

router.get('/setStatusCode', controller.setStatusCode);

router.get('/sse', async (ctx, next) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    ctx.res.writeHead(200, headers);
    const data = `data: 开始推送数据\n\n`;
    ctx.res.write(data);
    // 模拟推送数据
    const interval = setInterval(() => {
        ctx.res.write(`data: ${JSON.stringify({ a: Date.now() })}\n\n`);
    }, 1000);
    // sleep 10s
    await new Promise(resolve => { setTimeout(resolve, 10000) });
    ctx.res.write(`data:数据推送完毕\n\n`);
    clearInterval(interval);
    next(); // 调用next表示结束响应，断开连接
});

module.exports = router;
