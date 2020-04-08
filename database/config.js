module.exports = {
  host     : process.env.HEROKU ? 'ec2-52-200-119-0.compute-1.amazonaws.com' : 'localhost',
  user     : process.env.HEROKU ? 'xytqujyhjetdns' : 'AstonKhor',
  password : process.env.HEROKU ? '077891b6' : '',
  database : process.env.HEROKU ? 'd1o31vt6s14bc2' : 'indoorgyms'
};