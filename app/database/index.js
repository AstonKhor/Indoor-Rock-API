var mysql = require('mysql');
if (process.env.HEROKU) {
  connection = mysql.createConnection({
    HOST     : 'us-cdbr-iron-east-01.cleardb.net',
    USER     : 'b12b001a219e57',
    PASSWORD : '077891b6',
    DB       : 'heroku_a47c644aa249fa2'
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