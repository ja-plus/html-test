const logger = require('./logger');

class User {
  socketId;
  constructor({ socketId }) {
    this.socketId = socketId;
  }
}

class Message {
  /** @type {string} 信息 */
  msg;
  /** @type {number} 时间 */
  time;
  /** @type {User} 用户信息 */
  user;
  /** @type {Set} 连接的人*/
  connects;
  constructor(text, user, connects) {
    this.time = Date.now();
    this.msg = text;
    this.user = user;
    this.connects = connects;
  }
  setMsg(text) {
    this.msg = text;
  }
}

module.exports = function (app) {
  const httpServer = require('http').createServer(app.callback());
  const { Server } = require('socket.io');
  const io = new Server(httpServer, {
    cors: {
      // 配置跨域
      origin: 'http://localhost:8080',
      // credentials: true,
    },
  });

  // webscoket
  io.on('connection', socket => {
    const user = new User({ socketId: socket.id });
    // logger.info('socket.io connected:', socket.nsp.sockets);
    const connects = [...socket.nsp.sockets.keys()];
    const message = new Message('', user, connects);
    socket.emit('getConnects', message); // 主动推送消息
    // console.log('connects :>> ', connects);
    socket.broadcast.emit('someoneJoin', message); // 通知有新人加入
    socket.on('connect', () => {
      logger.info('socket connect ', message);
    });
    socket.on('disconnect', () => {
      logger.info('socket disconnect ', message);
      let i = message.connects.findIndex(v => v === user.socketId);
      message.connects.splice(i, 1);
      socket.broadcast.emit('someoneLeave', message); // 通知有人离开
    });
    socket.on('sendMsg', (msg, callback) => {
      callback({ ok: true });
      logger.info('socket on:sendMsg: ', message);
      message.setMsg(msg);
      // 信息通知到所有
      socket.broadcast.emit('broadcastMsg', message);
      message.setMsg('');
      // socket.emit('broadcastMsg', broadCastMsgObj); // 发出方知道自己发出的东西
    });
  });
  httpServer.listen(3000, () => {
    logger.info('socket.io server running on http://localhost:3000');
  });
};
