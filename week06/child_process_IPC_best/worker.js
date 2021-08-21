const { createServer } = require("http");

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text-plain" });
  res.end(
    "handle by child, pid: " + process.pid + ", ppid: " + process.ppid + "\n"
  );
});

process.on("message", (m, tcp) => {
  if (m === "server") {
    tcp.on("connection", (socket) => {
      server.emit("connection", socket);
    });
  }
});
