import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // 可获取console日志
    page.on('console', msg => console.log(msg.type(), msg.text()));

    await page.setViewport({width:1366,height:768});
    await page.goto('https://www.baidu.com');
    // 截屏
    await page.screenshot({ path: 'dist/screenshot.png' });
    // 导出pdf
    await page.pdf({ path: 'dist/exportPdf.pdf', format: 'A4' });

    // 页面中执行脚本
    const dimensions = await page.evaluate(() => {
        // document ? window ?
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });
    console.log('Dimensions:', dimensions);

    await browser.close();
})();