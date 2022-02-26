const logger = require("./logger");
module.exports = function (app) {
  const httpServer = require("http").createServer(app.callback());
  const { Server } = require("socket.io");
  const io = new Server(httpServer, {
    cors: {
      // 配置跨域
      origin: "http://localhost:8080",
      // credentials: true,
    },
  });

  // webscoket
  io.on("connection", (socket) => {
    logger.info("socket.io connected, socketId:", socket.id);
    socket.emit("open"); // 主动推送消息,TODO: 给当前在线人数
    socket.broadcast.emit("someoneJoin"); // 通知有新人加入
    socket.on("connect", () => {
      logger.info("socket connect, socketId:", socket.id);
    });
    socket.on("disconnect", () => {
      logger.info("socket disconnect, socketId:", socket.id);
      socket.broadcast.emit("someoneLeave"); // 通知有人离开
    });
    socket.on("sendMsg", (msg, callback) => {
      callback({ ok: true });
      logger.info("socket on:sendMsg: ", msg, " socketId", socket.id);
      let boradCastMsgObj = { msg, time: Date.now() };
      // 信息通知到所有
      socket.broadcast.emit("broadcastMsg", boradCastMsgObj);
      // socket.emit('broadcastMsg', boradCastMsgObj); // 发出方知道自己发出的东西
    });
  });
  httpServer.listen(3000, () => {
    logger.info("socket.io server runing on http://localhost:3000");
  });
};
