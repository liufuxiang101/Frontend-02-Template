const { createServer } = require("http");
const port = Math.floor((7 + Math.random()) * 1000);

console.log(port);

createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text-plain" });
  res.end("Hello World, port: " + port + "\n");
}).listen(port, "127.0.0.1");
