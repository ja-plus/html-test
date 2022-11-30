import puppeteer from 'puppeteer';
/** @type {puppeteer.Browser} */
let browser = null;
(async function main() {
  browser = await puppeteer.launch({
    headless: false, // 关闭无头模式, 者会不能导出pdf?
  });
  // await test();
  await confluence();

  await browser.close();
})();

async function test() {
  const page = await browser.newPage();
  // 可获取console日志
  page.on('console', msg => console.log(msg.type(), msg.text()));

  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('https://www.baidu.com');
  // 截屏
  await page.screenshot({ path: 'dist/screenshot.png' });
  // 导出pdf
  await page.pdf({ path: 'dist/exportPdf.pdf', format: 'A4' });

  // 页面中执行脚本
  const dimensions = await page.evaluate(() => {
    // document ? window ?
    // 这个方法执行在浏览器环境中
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });
  console.log('Dimensions:', dimensions);
}

async function sleep(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}
// const COOKIE =
//   'isTFLicensed=true; _ga=GA1.1.1035169818.1656393368; __adroll_fpc=0ea10e1dee7d26266c95499f82713dc8-1656504146495; easy-heading-pro.nav-width=250; easy-heading-pro.editor-nav-width=356; mywork.tab.tasks=false; _gid=GA1.1.771622579.1669596977; __exc-aa_v1=1669619169056; __ar_v4=MHBDWRJJNNCDBJNMEVKIDW%3A20221114%3A6%7CYB3U65ETPVB2PGJUSNWDAN%3A20221114%3A6%7C4AZEHCGDXVAQJODIXAIH7Z%3A20221114%3A6; atlassian.xsrf.token=BMF8-JWSP-9O18-MSG7_bbc7395b4f93b029c601cf417245b40672af5cbf_lin';
// const cookieArr = COOKIE.split(';').map(kv => {
//   return {
//     name: kv.split('=')[0].trim(),
//     value: kv.split('=')[1].trim(),
//   };
// });

const _userName = '';
const _pwd = '';
async function confluence() {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('http://172.20.200.191:8003/pages/viewpage.action?pageId=575898141');
  // await page.setCookie(...cookieArr);
  // await page.reload();

  await page.type('#username-fake', _userName);
  await sleep(1000);
  await page.type('#os_password', _pwd);
  await sleep(1000);
  await page.click('#loginButton');

  await page.waitForNavigation(); // 等待页面跳转
  await sleep(1000);

  // const cookie = await page.evaluate(() => {
  //   // 这个方法执行在浏览器环境中
  //   return document.cookie;
  // });
  // console.log('cookie', cookie);
  let urlArr = [
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=774766636',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=774768353',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=774768591',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=799509733',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=806226617',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=825918325',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=847415634',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=853873509',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=861081082',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=861081542',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=862621469',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=875266837',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=877003930',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=877005999',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=881430399',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=882315178',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=888736155',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=901318066',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=908230919',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=912297938',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=913901543',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=913901491',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=913903322',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=916620114',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=918127321',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=925346525',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=927129515',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=931289600',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=940909700',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=946150366',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=949625177',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=949635984',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=949638129',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=949641955',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=949643227',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=949642575',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=951621895',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=951621999',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=951621970',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=951622026',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=772180319',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=612337448',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=788791889',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=791907090',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=697993965',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=806224134',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=811828850',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=805372738',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=835815984',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=848892234',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=850658506',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=875266568',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=877004984',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=877003421',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=872711151',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=877005999',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=880641087',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=876154431',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=882312020',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=875266837',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=871072288',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=892109177',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=892109635',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=861081082',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=909804309',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=912297938',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=916620114',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=918127321',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=929898929',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=922422289',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=940909700',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=944441204',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=946150366',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=949638307',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=949625177',
    'http://172.20.200.191:8003/pages/viewpage.action?pageId=951618388',
  ];
  for (const url of urlArr) {
    await page.goto(url);
    await sleep(1000);
    await page.keyboard.press('End'); // 键盘案件事件,滚动到页面底部
    await sleep(2000);
  }
}
