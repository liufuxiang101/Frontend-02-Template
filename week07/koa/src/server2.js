const Koa = require("koa");
const app = new Koa();

// async function
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;

  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// // common function
// app.use((ctx, next) => {
//   const start = Date.now();

//   return next().then(() => {
//     const ms = Date.now() - start;
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
//   });
// });

app.listen(4001);
