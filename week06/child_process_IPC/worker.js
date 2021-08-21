process.on("message", (m, server) => {
  if (m === "server") {
    server.on("connection", (socket) => {
      socket.end(
        "handle by child, pid: " +
          process.pid +
          ", ppid: " +
          process.ppid +
          "\n"
      );
    });
  }
});
