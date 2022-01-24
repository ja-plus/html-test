const logger = require('./logger');
module.exports = function(app) {
  const httpServer = require('http').createServer(app.callback());
  const { Server } = require('socket.io');
  const io = new Server(httpServer, {
    cors: { // 配置跨域
      origin: 'http://localhost:8080',
      // credentials: true,
    }
  });

  // webscoket
  io.on('connection', (socket) => {
    logger.info('socket.io 已建立连接，socketId:', socket.id);
    socket.on('connect', () => {
      logger.info('socket 已建立连接，socketId:', socket.id);
    });
    socket.on('disconnect', () => {
      logger.info('socket 已断开连接，scoketId:', socket.id);
    });
  });
  httpServer.listen(3000, () => {
    logger.info('socket.io已启动 http://localhost:3000');
  });
};