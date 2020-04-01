const mainUrl = 'https://www.mountainproject.com/gyms';
const cheerio = require('cheerio');
const http = require('http');
const https = require('https');
const axios = require('axios');
const fs = require('fs');
let gyms = {};
let parseGymsListPromises = [];
let parseMainPromises = [];
let parseGymsPromises = [];
http.globalAgent.maxSockets = 5;
https.globalAgent.maxSockets = 5;

const fetchData = async (url) => {
  const result = await axios.get(url)
    .catch((err) => {
      throw err;
    });
  return cheerio.load(result.data);
}

const cleanRegionText = (text) => {
  return text.split(' (')[0];
}

const parseMain = () => {
  return new Promise((resolve, reject) => {
    fetchData(mainUrl)
      .then(($) => {
        $('#gym-list > div').each((i, section) => {
          if (i === 0) {
            let country;
            $(section).find('.col-md-3').each((i, col) => {
              if($(col).find('h2').length > 0) {
                country = cleanRegionText($(col).find('h2')[0].children[0].data);
                gyms[country] = { id: 'country', name: country };
              }
              $(col).find('.area a').each((i, state) => {
                let link = state.attribs.href;
                let stateInfo = $(state).find('div')
                stateName = stateInfo[0].children[0].data;
                gyms[country][stateName] = { 
                  id: 'state', 
                  name: stateName,
                  link: link,
                  numGyms: stateInfo[1].children[0].data, 
                  gyms:[],
                };
                console.log(`Accessing ${gyms[country][stateName]['id']}: ${stateName}`);
                parseMainPromises.push(parseGymsList(gyms[country][stateName]));
              })
            })
          } else {
            $(section).find('.col-md-3 .area a').each((i, country) => {
              let link = country.attribs.href;
              
              countryName = $(country).find('div')[0].children[0].data;
              gyms[countryName] = { 
                id: 'country',
                link: link,
                name: countryName,
                grouping: 'international',
                numGyms: $(country).find('div')[1].children[0].data, 
                gyms: [],
              };
              console.log(`Accessing ${gyms[countryName]['id']}: ${countryName}`);
              parseGymsListPromises.push(parseGymsList(gyms[countryName]));
            })
          }
        });
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
  })
}

const parseGymsList = (area) => {
  return new Promise((resolve, reject) => {
    fetchData(area.link)
      .then(($) => {
        $('#gym-state-list .gym').each((i, gym) => {
          let title = $(gym).find('.title a')[0];
          let gymInfo = {
            name: title.children[0].data,
            link: title.attribs.href,
            website: null,
            phone: null,
            address: null,
            location: $(gym).find('.location')[0].children[0] ? $(gym).find('.location')[0].children[0].data : null,
            rating: null,
          }
          area.gyms.push(gymInfo);
          parseGymsPromises.push(parseGym(gymInfo));
        })
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
  })
}

const parseGym = (gym) => {
  return new Promise((resolve, reject) => {
    fetchData(gym.link)
      .then(($) => {
        console.log(`Saving Gym: ${gym.name}`);
        let overview = $('.gym-overview');
        gym.website = $(overview).find('.gym-info a')[0].attribs.href;
        gym.address = $(overview).find('.gym-info a')[1] ? $(overview).find('.gym-info a')[1].children[0].data : null;
        gym.phone = $(overview).find('.gym-info div')[1] ? $(overview).find('.gym-info div')[1].children[0].data : null;
        gym.rating = $(overview).find('.stars-avg > span')[0].children[2].data.split('Avg: ')[1].split(' from')[0];
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
  })
}

parseMainPromises.push(parseMain());
Promise.all(parseMainPromises)
.then(() => {
  return Promise.all(parseGymsListPromises);
})
.then(() => {
  return Promise.all(parseGymsPromises);
})
.then(() => {
  fs.writeFile('scrapedData/data.json', JSON.stringify(gyms), 'utf8', () => {
    console.log('SAVED');
  });
});