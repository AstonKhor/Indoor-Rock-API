const db = require('./index');
const fs = require('fs');

const parseGyms = (gyms) => {
  let gym = {};

  for (let country in gyms) {
    if (country !== 'United States' && country !== 'Canada') {
      parseArea(gyms[country], country);
    } else {
      for (let state in gyms[country]) {
        if (state !== 'id' && state !== 'name') {
          parseArea(gyms[country][state], country);
        }
      }
    }
  }
}

let parseArea = (area, country) => {
  let gymInsertQuery = 'INSERT INTO gyms (GymName, Link, Website, Phone, GymAddress, Subregion, Rating, Region, Country) VALUES ';
  for (let i = 0; i < area.gyms.length; i++) {
    let gym = area.gyms[i];
    gym.country = country;
    gym.subregion = area.name;
    for (let key in gym) {
      if (gym[key]) {
        gym[key] = gym[key].replace(/\'/g, '');
      }
    }
    gymInsertQuery += `('${gym.name}', '${gym.link}', '${gym.website}', '${gym.phone}', '${gym.address}', '${gym.location}', ${parseFloat(gym.rating).toFixed(1)}, '${gym.subregion}', '${gym.country}'), `;
  }
  gymInsertQuery = gymInsertQuery.slice(0, gymInsertQuery.length - 2) + ';';
  if (gymInsertQuery !== 'INSERT INTO gyms (GymName, Link, Website, Phone, GymAddress, Subregion, Rating, Region, Country) VALUE;') {
    insertGyms(gymInsertQuery, country);
  }
}

let insertGyms = (gymQuery, country) => {
  //consider switching to batch insert
  db.query(gymQuery, (err, result) => {
    if (err) {
      console.log(gymQuery);
      throw err;
    }
    console.log(`Inserted All gyms for ${country}`);
  });
  
}
  
fs.readFile('../scraper/data/data.json', (err, data) => {
  if (err) throw err;
  // console.log('dat', data);
  let json = JSON.parse(data);
  // console.log(json);
  parseGyms(json);
})

let callback = () => {
  console.log('here');
  db.end().then(() => {
    console.log('endingddafd')
  })
}

setTimeout(callback, 3000);