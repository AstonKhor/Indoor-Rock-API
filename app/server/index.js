const express = require('express');
const path = require('path');
const routes = require('./routes/routes.js');
let port = process.env.PORT;

const app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/indoorGyms/api/json', routes.getGyms);

app.post('/user', routes.postUser);

if(port === null || port === '' || port === undefined) {
  port = 3000;
}

app.listen(port, () => { console.log(`Now listening on port ${port}`)})