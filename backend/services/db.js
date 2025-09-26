const mysql = require('mysql2/promise');
require('dotenv').config({ path: __dirname + '/../.env' });


const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true, // allow queueing of connections
  connectionLimit: 10, // limit concurrent connections
  queueLimit: 0 // unlimited queue
});

module.exports = pool;
