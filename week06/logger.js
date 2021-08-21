const fs = require("fs");
const path = require("path");

function createWriteStream(fileName) {
  const fullPath = path.join(__dirname, fileName);
  const writeStream = fs.createWriteStream(fullPath, {
    flags: "a", // a 追加，w 覆盖
  });

  return writeStream;
}

const writeStream = createWriteStream("debug.log");

function log() {
  const logs = [...arguments].join(",");
  const formartLog = `${new Date().toLocaleDateString()} - pid: ${
    process.pid
  } - ${logs}\n`;

  writeStream.write(formartLog);
}

module.exports = {
  log,
};
