var { Pool } = require('pg');
const config = require('./config');
console.log('***********PROCESS.ENV.HEROKU*****************', process.env.HEROKU)
const connection = new Pool({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database,
  port: 5432,
  ssl: config.ssl,
})
connection.connect();

module.exports = connection;