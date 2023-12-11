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

const server = spdy.createServer(
  {
    key: readFileSync(path.join(__dirname, `../server.key`)),
    cert: readFileSync(path.join(__dirname, `../server.crt`)),
  },
  app,
);

server.listen('3000', () => {
  const port = server.address().port;
  console.log('服务已启动, https://localhost:' + port);
});
