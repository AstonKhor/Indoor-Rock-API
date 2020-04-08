var { Pool } = require('pg');
const config = require('./config');

const connection = new Pool({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database,
  port: 5432,
})
connection.connect();

module.exports = connection;