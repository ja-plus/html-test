const fs = require('fs');
const getData = require('../service/spider');

exports.getData = async function(ctx){
    let cookie = ctx.request.body.cookie;
    ctx.body = await getData(cookie);
};

exports.saveData = async function(ctx){
    let data = ctx.request.query.data;
    console.log(data);
    ctx.body = {
        data: 'hello world'
    };
};

exports.getTestData = async function(ctx){
    let data = ctx.request.query;
    console.log('get query:', data);
    console.log('get body:', data);
    ctx.body = {
        code: 1,
        type: 'get',
        query: ctx.request.query,
        body: data
    };
};
exports.postTestData = async function(ctx){
    let data = ctx.request.body; // 请求头必须要 Content-Type: application/json
    console.log('post query:', ctx.request.query);
    console.log('post body:', data);
    ctx.body = {
        code: 0,
        type: 'post',
        query: ctx.request.query,
        body: data
    };
};
exports.putTestData = async function(ctx){
    let data = ctx.request.body;
    console.log('put query:', ctx.request.query);
    console.log('put body:', data);
    ctx.body = {
        type: 'put',
        query: ctx.request.query,
        body: data
    };
};
exports.delTestData = async function(ctx){
    let data = ctx.request.body;
    console.log('delete query:', ctx.request.query);
    console.log('delete body:', data);
    ctx.body = {
        type: 'delete',
        query: ctx.request.query,
        body: data
    };
};

exports.timeoutTestData = async function(ctx){
    let data = ctx.request.body;
    console.log('delete query:', ctx.request.query);
    console.log('delete body:', data);
};