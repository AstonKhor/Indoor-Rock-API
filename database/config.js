module.exports = {
  host     : process.env.HEROKU ? 'ec2-52-200-119-0.compute-1.amazonaws.com' : 'localhost',
  user     : process.env.HEROKU ? 'xytqujyhjetdns' : 'astonkhor',
  password : process.env.HEROKU ? '4a3e9dcaf2bd0ecc2aba6e4667e1fc88fe78fe933ebb55a04afcfc3ecdde09d5' : '',
  database : process.env.HEROKU ? 'd1o31vt6s14bc2' : 'indoorgyms',
  port     : process.env.HEROKU ? 5432 : 5432,
  ssl      : process.env.HEROKU ? { rejectUnauthorized: false } : false,
};