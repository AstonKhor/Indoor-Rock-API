const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const cookieParser = require('cookie-parser');
const compression = require('compression');
let port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/checkSession', routes.checkSession);

app.get('/indoorGyms/api/json', routes.getGyms);

app.get('/login', routes.authenticateUser)

app.post('/user', routes.createUser);

app.listen(port, () => { console.log(`Now listening on port ${port}`)})