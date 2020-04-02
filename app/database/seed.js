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
  let countryInsertQuery = `INSERT INTO Countries (CountryName) VALUES ("${country}");`;
  let gymInsertQuery = 'INSERT INTO Gyms (GymName, Link, Website, Phone, GymAddress, Subregion, Rating, Region, Country) VALUES ';
  for (let i = 0; i < area.gyms.length; i++) {
    let gym = area.gyms[i];
    gym.country = country;
    gym.subregion = area.name;
    for (let key in gym) {
      if (gym[key]) {
        gym[key] = gym[key].replace(/\'/g, '\\\'');
      }
    }
    gymInsertQuery += `('${gym.name}', '${gym.link}', '${gym.website}', '${gym.phone}', '${gym.address}', '${gym.location}', ${parseFloat(gym.rating).toFixed(1)}, '${gym.subregion}', '${gym.country}'), `;
  }
  gymInsertQuery = gymInsertQuery.slice(0, gymInsertQuery.length - 2) + ';';
  // if (gymInsertQuery.includes('rockn-jamn')) {
  //   console.log(gymInsertQuery);
  // }
  insertCountry(countryInsertQuery, gymInsertQuery, country, area.gyms.length);
}

let insertCountry = (countryQuery, gymQuery, country, numGyms) => {
  db.query(countryQuery, (err, result) => {
    console.log(`Inserted Country: ${country}`);
    if (numGyms > 0) {
      insertGyms(gymQuery, countryQuery);
    }
  })
}

let insertGyms = (gymQuery, countryQuery) => {
  //consider switching to batch insert
  db.query(gymQuery, (err, result) => {
    if (err) {
      console.log(gymQuery);
      console.log(countryQuery);
      throw err;
    }
    console.log(`Inserted Gym: ${'name'}`);
  });
  
}
  
fs.readFile('../scraper/data/data.json', (err, data) => {
  if (err) throw err;
  // console.log('dat', data);
  let json = JSON.parse(data);
  // console.log(json);
  parseGyms(json);
})