const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/indoorGyms/:region', (req, res) => {
  console.log('req recieved');
})

app.listen(port, () => { console.log(`Now listening on port ${port}`)})