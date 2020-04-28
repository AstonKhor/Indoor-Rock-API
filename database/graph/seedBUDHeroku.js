//change for seeding local vs heroku db
process.env.HEROKU = true;
const db = require('../index');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let count = 0 

fs.createReadStream('/Users/astonkhor/Documents/Projects/Indoor-Rock-API/database/graph/bouldersUsersData.csv')
  .pipe(csv())
  .on('data', (data) => {
    count++;
    if (count % 10000 === 0) {
      console.log(count);
    }
    db.query(`INSERT INTO ascents (id, date, user_id, usa_boulders) VALUES (${data.id}, ${data.date}, ${data.user_id}, '${data.usa_boulders}')`);
  })
  .on('end', () => {
    console.log('complete');
  });