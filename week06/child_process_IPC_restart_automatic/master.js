const { createServer } = require("net");
const { fork } = require("child_process");
const { log } = require("./../logger");
const cpus = require("os").cpus();

const server = createServer().listen(9000);

log("master 启动：" + process.pid);

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
    console.log("worker 退出：" + worker.pid);
    log("worker 退出：" + worker.pid);

    delete worker[worker.pid];
  });

  // 转发
  worker.send("server", server);
  worker[worker.pid] = worker;

  console.log("master 新建 worker：" + worker.pid);
  log("master 新建 worker：" + worker.pid);
};

for (let i = 0; i < 2; i++) {
  createWorker();
}

// 进程退出时，所有工作进程退出
process.on("exit", () => {
  log("master 退出：" + process.pid);
  for (const pid in worker) {
    worker[pid].kill();
  }
});
