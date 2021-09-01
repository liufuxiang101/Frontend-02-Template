async function _createConnection(options) {
  const usePromise = true;
  const mysql = usePromise ? require("mysql2/promise") : require("mysql2");

  let connection;
  connection = await mysql.createConnection(options);

  console.log("Connected Mysql server  ✅");

  return connection;
}

function koaMysql(options) {
  options = options || {
    host: "localhost",
    user: "root",
    password: "example",
    database: "ostrich",
  };

  return async (ctx, next) => {
    ctx.mysql = await _createConnection(options);

    await next();
  };
}

module.exports = koaMysql;
