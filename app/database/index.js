var mysql = require('mysql');
if (process.env.HEROKU) {
  connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b12b001a219e57',
    password : '077891b6',
    database : 'heroku_a47c644aa249fa2'
  });
} else {
  connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'indoorGyms'
  });
}

connection.connect();

module.exports = connection;