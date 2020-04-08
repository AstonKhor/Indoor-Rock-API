module.exports = {
  host     : process.env.HEROKU ? 'us-cdbr-iron-east-01.cleardb.net' : 'localhost',
  user     : process.env.HEROKU ? 'b12b001a219e57' : 'AstonKhor',
  password : process.env.HEROKU ? '077891b6' : '',
  database : process.env.HEROKU ? 'heroku_a47c644aa249fa2' : 'indoorgyms'
};