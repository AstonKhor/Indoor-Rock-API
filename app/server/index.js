const express = require('express');
const path = require('path');
const port = 3000;
const routes = require('./routes/routes.js');

const app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/indoorGyms/api/json', routes.getGyms);

app.post('/user', routes.postUser);

app.listen(port, () => { console.log(`Now listening on port ${port}`)})