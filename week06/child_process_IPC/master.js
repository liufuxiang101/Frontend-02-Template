const { createServer } = require("net");
const { fork } = require("child_process");

const child1 = fork("worker.js");
const child2 = fork("worker.js");

const server = createServer().listen(9000, () => {
  child1.send("server", server);
  child2.send("server", server);

  // 关掉
  server.close();
});
