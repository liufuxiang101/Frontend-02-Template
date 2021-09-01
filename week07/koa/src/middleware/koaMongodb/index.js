async function _createConnection(options) {
  const { MongoClient } = require("mongodb");

  const client = new MongoClient(
    `mongodb://${options.user}:${options.password}@${options.host}:27017`
  );

  await client.connect();

  console.log("Connected Mongodb server ✅");

  const db = client.db(options.database);

  return db;
}

function koaMongodb(options) {
  options = options || {
    host: "localhost",
    user: "root",
    password: "passwd",
    database: "ostrich",
  };

  return async (ctx, next) => {
    ctx.mongodb = await _createConnection(options);

    await next();
  };
}

module.exports = koaMongodb;
