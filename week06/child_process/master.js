const { fork, spawn, exec, execFile } = require("child_process");
const cups = require("os").cpus();

console.log(cups.length);

// 启动多个进程为充分利用 CPU 资源，不是解决并发问题
for (let i = 0; i < cups.length; i++) {
  // // 1、
  // fork("./worker.js");

  // // 2、
  // spawn("node", ["worker.js"]);

  // // 3、
  // exec("node worker.js", (error, stdout, stderr) => {
  //   if (error) {
  //     throw error;
  //   }

  //   console.log(stdout);
  // });

  // 4、
  execFile("node", ["./worker.js"], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }

    console.log(stdout);
  });
}
