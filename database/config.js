module.exports = {
  host     : process.env.HEROKU ? 'us-cdbr-iron-east-01.cleardb.net' : 'localhost',
  user     : process.env.HEROKU ? 'xytqujyhjetdns' : 'AstonKhor',
  password : process.env.HEROKU ? '077891b6' : '',
  database : process.env.HEROKU ? 'd1o31vt6s14bc2' : 'indoorgyms'
};