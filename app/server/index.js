const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


app.search(express.static(path.join(__dirname, 'public')));

app.get('/indoorGyms/:region', (req, res) => {
  console.log('req recieved');
})