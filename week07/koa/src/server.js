const Koa = require("koa");
const app = new Koa();
const koaBody = require("koa-body");

const router = require("./routers");
const koaMysql = require("./middleware/koaMysql");
const koaMongodb = require("./middleware/koaMongodb");

app.use(koaBody()).use(koaMysql()).use(koaMongodb()).use(router.routes());

// TODO: disconnection
app.on("close", async () => {
  console.log("closing...");
});

app.listen(4001, () => {
  console.log("listening on port 4001...");
});
