const db = require('../../database/index');

module.exports = {
  getGyms: (req, res) => {
    console.log('query', req.query);
    db.query(`SELECT * FROM Gyms G, Countries C WHERE G.Country = C.Name`, (err, gyms) => {
      if (err) throw err;
      res.end(JSON.stringify(gyms));
    })
  },
  postUser: (req, res) => {
    console.log(req.body);
    //prevent sql injections
    db.query(`SELECT * FROM Keys WHERE key = '${req.body.data}';`, (err, result) => {
      console.log(result.length);
    });
  },
  patchKey: (req, res) => {
    console.log('patching key');
  }
}