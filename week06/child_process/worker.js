const { createServer } = require("http");

const PORT = Math.floor((7 + Math.random()) * 1000);

console.log(PORT);

createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text-plain" });
  res.end("Hello World, port: " + PORT + "\n");
}).listen(PORT, "127.0.0.1");
