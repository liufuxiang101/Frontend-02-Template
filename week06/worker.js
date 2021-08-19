const { createServer } = require("http");

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text-plain" });
  res.end(
    "handle by child, pid: " + process.pid + ", ppid: " + process.ppid + "\n"
  );

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
  process.send({ action: "suicide" });

  // 停止接收新连接
  worker.close(() => {
    // 所有已有连接断开后，退出进程
    process.exit(1);
  });
});
