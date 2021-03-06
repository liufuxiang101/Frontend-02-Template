const { fork } = require("child_process");
const { createServer } = require("net");

const tcpServer = createServer();
const child1 = fork("worker.js");
const child2 = fork("worker.js");

tcpServer.on("connection", (socket) => {
  socket.end(
    "handle by parent, pid: " + process.pid + ", ppid: " + process.ppid + "\n"
  );
});

tcpServer.listen(9000, () => {
  // IPC 建立后，发送消息
  child1.send("server", tcpServer);
  child2.send("server", tcpServer);
});
