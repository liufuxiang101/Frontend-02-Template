const { createServer } = require("net");
const { fork } = require("child_process");
const { log } = require("./../logger");
const cpus = require("os").cpus();

const server = createServer().listen(9000);

log("master 启动");

const worker = {};
const createWorker = () => {
  let worker = fork("./worker.js");

  // 启动新的进程
  worker.on("message", function (message) {
    if (message.action === "suicide") {
      createWorker();
    }
  });

  // 退出时重新启动新的进程
  worker.on("exit", () => {
    console.log(">>>>>");
    console.log("退出进程，pid: " + worker.pid);
    log("worker 进程退出");

    delete worker[worker.pid];
  });

  // 转发
  worker.send("server", server);
  worker[worker.pid] = worker;

  console.log(">>>>>");
  console.log("新建进程，pid: " + worker.pid);
  log("master 新建进程 worker");
};

for (let i = 0; i < cpus.length; i++) {
  createWorker();
}

// 进程退出时，所有工作进程退出
process.on("exit", () => {
  log("master 进程退出");
  for (const pid in worker) {
    worker[pid].kill();
  }
});
