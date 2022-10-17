const { Pool } = require("pg");
const { db } = require("./config");
require("./config");

const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.name,
});

/*const proConfig = {
  connectionString: process.env.DATABASE_URL,
};*/

//const pool = new Pool(proConfig);

module.exports = pool;
