import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import router from './routers/index.mjs';
import spdy from 'spdy';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(import.meta.url);
const app = express();
app.use(express.static('./statics'));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/', router);

app.get('/serverPush', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  // 消息之间用空行
  let i = 1;
  setInterval(() => {
    res.write(`event: customEvent\n`);
    res.write(`id: ${i}\n`);
    res.write(`retry: 30000\n`);
    res.write('data:' + JSON.stringify({ a: i++ }) + '\n');
    res.write('\n');
    res.flushHeaders();
  }, 1000);

  setTimeout(() => {
    res.end();
  }, 60_000);
  req.on('close', () => {
    console.log('SSE connection closed!');
  });
});

// const server = spdy.createServer(
//   {
//     key: readFileSync(path.join(__dirname, `../server.key`)),
//     cert: readFileSync(path.join(__dirname, `../server.crt`)),
//   },
//   app,
// );
app.listen('3000', () => {
  console.log('http 服务已启动, http://localhost:3000');
});
