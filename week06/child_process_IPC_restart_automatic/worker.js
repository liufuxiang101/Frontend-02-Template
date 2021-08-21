const { createServer } = require("http");
const { log } = require("./../logger");

log("worker 启动：" + process.pid);

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text-plain" });
  res.end(
    "worker 处理内容, pid: " + process.pid + ", ppid: " + process.ppid + "\n"
  );

  log("worker 处理内容：" + process.pid);

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
  log("worker 捕获错误，发送自杀信号：" + process.pid);

  process.send({ action: "suicide" });

  // 停止接收新连接
  worker.close(() => {
    // 所有已有连接断开后，退出进程
    process.exit(1);
  });
});
