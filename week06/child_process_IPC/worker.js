const { createServer } = require("http");
const delay = Math.floor(Math.random() * 1000);

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text-plain" });
  setTimeout(() => {
    res.end(
      "handle by child, pid: " +
        process.pid +
        ", ppid: " +
        process.ppid +
        ", time: " +
        delay +
        "ms\n"
    );
  }, delay);
});

process.on("message", (m, tcp) => {
  if (m === "server") {
    tcp.on("connection", (socket) => {
      server.emit("connection", socket);
    });
  }
});
