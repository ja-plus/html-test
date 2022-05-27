const fs = require('fs');
const getData = require('../service/spider');

exports.getData = async function (ctx) {
  let cookie = ctx.request.body.cookie;
  ctx.body = await getData(cookie);
};

exports.saveData = async function (ctx) {
  let data = ctx.request.query.data;
  console.log(data);
  ctx.body = {
    data: 'hello world',
  };
};

exports.getTestData = async function (ctx) {
  let data = ctx.request.query;
  // console.log('get headers:', ctx.request.headers);
  console.log('get cookies:', ctx.cookies.get('name'));
  console.log('get query:', data);
  console.log('get body:', data);
  ctx.cookies.set('name', 'serverSetCookie', {
    // secure: true,
    // sameSite: 'none'
  });
  ctx.body = {
    code: 1,
    type: 'get',
    query: ctx.request.query,
    body: data,
  };
  // ctx.response.redirect('https://www.baidu.com');
};
exports.postTestData = async function (ctx) {
  let data = ctx.request.body; // 请求头必须要 Content-Type: application/json
  // console.log("get headers:", ctx.request.headers);
  console.log('post query:', ctx.request.query);
  console.log('post body:', data);
  ctx.body = {
    code: 1,
    type: 'post',
    query: ctx.request.query,
    body: data,
  };
  // ctx.status = 500;
};
exports.putTestData = async function (ctx) {
  let data = ctx.request.body;
  console.log('put query:', ctx.request.query);
  console.log('put body:', data);
  ctx.body = {
    type: 'put',
    query: ctx.request.query,
    body: data,
  };
};
exports.delTestData = async function (ctx) {
  let data = ctx.request.body;
  console.log('delete query:', ctx.request.query);
  console.log('delete body:', data);
  ctx.body = {
    type: 'delete',
    query: ctx.request.query,
    body: data,
  };
};

/** 延时 */
exports.timeoutTestData = async function (ctx) {
  console.log('get query:', ctx.request.query);
  const query = ctx.request.query;
  let timeout = +query.timeout || 2000;
  await new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
  ctx.body = {
    timeout,
  };
};

/** 获取大量数据 */
exports.getHugeData = async function (ctx) {
  const dataLen = ctx.request.query.dataLength || 5000;
  let data = new Array(+dataLen).fill({
    prop1: '2.9315',
    prop2: '--',
    prop3: '1.4499',
    prop4: '--',
    prop5: '100.0040',
    prop6: '3.0200',
    prop7: 'AA+',
    prop8: '21汉口银行CD065',
    prop9: '--',
    prop10: '112180245.IB',
  });
  ctx.body = {
    data,
  };
};

/** 返回状态码 */
exports.setStatusCode = async function (ctx) {
  let code = ctx.request.query.code;
  // ctx.throw(code);
  ctx.response.status = +code;
  ctx.body = {
    query: ctx.request.query,
  };
};
