module.exports = {
  host     : process.env.HEROKU ? process.env.PG_HOST : 'localhost',
  user     : process.env.HEROKU ? process.env.PG_USER : 'astonkhor',
  password : process.env.HEROKU ? process.env.PG_PASSWORD : '',
  database : process.env.HEROKU ? process.env.PG_DATABASE : 'indoorgyms',
  port     : process.env.HEROKU ? 5432 : 5432,
  ssl      : process.env.HEROKU ? { rejectUnauthorized: false } : false,
};