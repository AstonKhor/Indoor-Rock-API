var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'indoorGyms'
});

connection.connect();

module.exports = connection;