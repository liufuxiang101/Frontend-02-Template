const Router = require("@koa/router");

const router = new Router();

// mysql
router.get("/user", async (ctx, next) => {
  if (ctx.mysql) {
    const [rows, fields] = await ctx.mysql.query(
      `SELECT vip_no, sex, cell_phone, fname FROM vip WHERE vip_no=${ctx.request.query.UserId}`
    );

    if (rows.length === 0) {
      throw new Error("No user found");
    }

    ctx.body = {
      ErrorCode: 0,
      Message: "",
      IsSuccess: true,
      Result: rows[0],
    };
  } else {
    ctx.body = {
      ErrorCode: 10000001,
      Message: "连接错误",
      IsSuccess: false,
    };
  }

  await next();
});

// mongodb
router.get("/user2", async (ctx, next) => {
  if (ctx.mongodb) {
    const collection = ctx.mongodb.collection("vip");
    const result = await collection.findOne({
      vip_no: ctx.request.query.UserId,
    });

    ctx.response.body = {
      ErrorCode: 0,
      Message: "",
      IsSuccess: true,
      Result: result,
    };
  } else {
    ctx.response.body = {
      ErrorCode: 10000001,
      Message: "连接错误",
      IsSuccess: false,
    };
  }

  await next();
});

module.exports = router;
