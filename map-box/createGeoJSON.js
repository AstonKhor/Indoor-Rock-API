const fs = require('fs');
const fetch = require('node-fetch');
let testCount = 200;
let promises = []
const http = require('http');
const https = require('https');
http.globalAgent.maxSockets = 5;
https.globalAgent.maxSockets = 5;
const config = require('./config');

const geoJSON = {
  features: [],
  type: 'FeatureCollection',
}
const features = geoJSON.features;


const parseCountries = (gyms) => {
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
  Promise.all(promises)
    .then(() => {
      fs.writeFile('map-box/gyms.geojson', JSON.stringify(geoJSON, null, 2), (err) => {
        if (err) console.log(err)
      })
    })
    .catch((err) => {
      console.log('promise all catch')
      throw err
    })
}

let parseArea = (area, country) => {
  for (let i = 0; i < area.gyms.length; i++) {
    let gym = area.gyms[i];
    gym.country = country;
    gym.subregion = area.name;
    for (let key in gym) {
      if (gym[key]) {
        gym[key] = gym[key].replace(/\'/g, '');
      }
    }
    parseGym(gym);
  }
}

parseGym = (gym) => {
  let gymFeature = { type: 'Feature'};
  gymFeature.properties = {
    title: gym.name,
  }
  if (gym.address) {
    let address = gym.address.trim();
    address = address.split(' ').join('+');
    address = address.split('#').join('');
    let apiString = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.apiKey}`
    if(testCount > 0) {
      testCount--;
      console.log(gym.name);
      promises.push(new Promise((resolve, reject) => {
        fetch(apiString)
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            if (data.status === "REQUEST DENIED") {
              return reject();
            }
            gymFeature.properties.description = data.results[0].formatted_address;
            gymFeature.geometry = {
              coordinates: [data.results[0].geometry.location.lng,data.results[0].geometry.location.lat],
              type: 'Point'
            }
            features.push(gymFeature);
            resolve();
          })
          .catch((err) => {
            console.log('inside fetch catch')
            throw err;
          })
        })
      .catch((err) => {
        console.log('inside promise catch');
        console.log('inside promise catch', apiString);
        throw err;
      })
      )
    }
  } 
}

  
fs.readFile('scraper/data/data.json', (err, data) => {
  if (err) throw err;
  // console.log('dat', data);
  let json = JSON.parse(data);
  // console.log(json);
  parseCountries(json);
})