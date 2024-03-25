const { PassThrough, Readable } = require('stream');
const SseStream = require('ssestream')

function RR() {
    Readable.call(this, arguments);
}
RR.prototype = new Readable();
RR.prototype._read = function (data) {
    console.log(data)
}

function sse(stream, event, data) {
    return stream.push(`event:${event}\ndata: ${JSON.stringify(data)}\n\n`)
}

exports.eventSourcePush = function (ctx) {
    const sseStream = new SseStream(ctx.req)
    sseStream.pipe(ctx.res)
    setInterval(() => {
        sseStream.write({
            event: 'server-time',
            data: new Date().toTimeString()
        })
    }, 1000)
    // const stream = new RR()//PassThrough();
    // ctx.set({
    //     'Content-Type': 'text/event-stream',
    //     'Cache-Control': 'no-cache',
    //     Connection: 'keep-alive'
    // });
    // sse(stream, 'test', { a: "yango", b: "tango" });
    // ctx.body = stream;
    // setInterval(() => {
    //     sse(stream, 'test', { a: "yango", b: Date.now() });
    // }, 3000);
} 