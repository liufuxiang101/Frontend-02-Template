const { fork } = require("child_process");
const { createServer } = require("net");

const tcpServer = createServer();
const child1 = fork("worker.js");
const child2 = fork("worker.js");

tcpServer.listen(9000, () => {
  child1.send("server", tcpServer);
  child2.send("server", tcpServer);

  // 关掉，业务统一在 child 进程中处理
  tcpServer.close();
});
