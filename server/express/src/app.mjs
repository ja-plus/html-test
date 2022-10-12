import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import router from './routers/index.mjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(import.meta.url);
const app = express();
app.use(express.static('./statics'));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/', router);

let server = app.listen('8080', () => {
  const port = server.address().port;
  console.log('服务已启动, http://localhost:' + port);
});
