const db = require('../../database/index');
const createKey = require('../methods/createKey');
// const bcrypt = require('bcrypt');
const passwordHash = require('password-hash');
const saltRounds = 5;

module.exports = {
  getGyms: (req, res) => {
    console.log('query', req.query);
    //preven sql injections
    db.query(`SELECT * FROM Gyms`, (err, gyms) => {
      if (err) throw err;
      res.end(JSON.stringify(gyms));
    })
  },
  postUser: (req, res) => {
    // bcrypt.hash(password, saltRounds).then((hash) => {
    // })
    console.log(req.body);
    let salt = Date.now();
    var hashedPassword = passwordHash.generate(req.body.password + salt);
    db.query(`INSERT INTO Users ('Username', 'Password', 'Salt') VALUES ('${req.body.username}', '${hashedPassword}', ${Salt});`, (err, result) => {
      if (err) {
        return res.end('invalid Username');
      }
      res.writeHeader(200, 'Successfully create User');
      return res.end('Successfully created User');
    })
  },
  authenticateUser: (req, res) => {
    console.log(req.body);
    db.query(`SELECT Password FROM Users WHERE Username = '${req.body.username}';`, (err, hashedPassword) => {
      let authenticated = passwordHash.verify(req.body.password, hashedPassword);
      res.end(JSON.stringify(authenticated));
    });
  },
  patchKey: (req, res) => {
    console.log('patching key');
  }
}