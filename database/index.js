var { Pool } = require('pg');
const config = require('./config');
console.log('***********PROCESS.ENV.HEROKU*****************', process.env.HEROKU)
const connection = new Pool({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database,
  port     : config.port,
  ssl      : config.ssl,
})
connection.connect();

module.exports = connection;