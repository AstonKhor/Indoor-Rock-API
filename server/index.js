const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/routes.js');
let port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// process.env.PWD = process.cwd();
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/indoorGyms/api/json', routes.getGyms);

app.post('/user', routes.postUser);

app.listen(port, () => { console.log(`Now listening on port ${port}`)})