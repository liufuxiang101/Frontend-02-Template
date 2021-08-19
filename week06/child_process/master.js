const { fork, spawn, exec, execFile } = require("child_process");
const cups = require("os").cpus();

console.log(cups.length);

for (let i = 0; i < cups.length; i++) {
  // fork("./worker.js");

  // spawn("node", ["worker.js"]);

  // exec("node worker.js", (error, stdout, stderr) => {
  //   if (error) {
  //     throw error;
  //   }

  //   console.log(stdout);
  // });

  execFile("node", ["./worker.js"], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }

    console.log(stdout);
  });
}
