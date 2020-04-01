const siteUrl = 'https://www.indoorclimbing.com/worldgyms.html';
const baseUrl = 'https://www.indoorclimbing.com/';
const cheerio = require('cheerio');
const axios = require('axios');
let gyms = {};

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
}

const cleanRegionText = (text) => {
  return text.split('in ')[1].replace(':', '');
}

const parseMain = () => {
  let region;
  fetchData()
    .then(($) => {
      let links = $('#content .i');
      $('#content h2').each((i, el) => {
        if(i === 0) {
          gyms.id = 'regions';
        } else if (i === 1) {
          regionText = el.children[0].data;
          region = cleanRegionText(regionText);
          gyms[region] = { 
            id: 'subregions', 
          };
          let subregions = gyms[region];
          subregions[cleanRegionText(el.nextSibling.nextSibling.children[0].children[0].data)] = {
            id: 'subregion',
            links: [],
          }
          console.log(el.nextSibling.nextSibling.children[0].children[0]);
          
          console.log(gyms);
        } else {
          
        }
      });
    })
}

parseMain();


