const db = require('../../database/index');

let routes = {
  getGyms: (req, res) => {
    console.log('query', req.query);
    db.query(`SELECT * FROM Gyms G, Countries C WHERE G.Id = C.GymId`, (err, result) => {
      console.log(result.lenght);
    })
  },
  postUser: (req, res) => {
    console.log(req.body);
    //prevent sql injections
    db.query(`SELECT * FROM Keys WHERE key = '${req.body.data}';`, (err, result) => {
      console.log(result.length);
    });
  },

}

