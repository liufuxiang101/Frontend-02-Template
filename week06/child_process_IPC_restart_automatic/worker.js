const { createServer } = require("http");
const { log } = require("./../logger");

log("worker 进程启动");

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text-plain" });
  res.end(
    "worker 进程, pid: " + process.pid + ", ppid: " + process.ppid + "\n"
  );

  log("worker 进程处理内容");

  // 模拟错误
  throw new Error("exception");
});

let worker;
process.on("message", (m, tcp) => {
  if (m === "server") {
    worker = tcp;
    worker.on("connection", (socket) => {
      server.emit("connection", socket);
    });
  }
});

process.on("uncaughtException", () => {
  log("worker 进程捕获错误，发送自杀信号");

  process.send({ action: "suicide" });

  // 停止接收新连接
  worker.close(() => {
    // 所有已有连接断开后，退出进程
    process.exit(1);
  });
});
