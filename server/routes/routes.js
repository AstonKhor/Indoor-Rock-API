const db = require('../../database/index');
const createKey = require('../methods/createKey');
// const bcrypt = require('bcrypt');
const passwordHash = require('password-hash');
const saltRounds = 5;

module.exports = {
  getGyms: (req, res) => {
    console.log('query', req.query);
    //preven sql injections
    db.query(`SELECT * FROM gyms`, (err, gyms) => {
      if (err) throw err;
      res.end(JSON.stringify(gyms));
    })
  },
  createUser: (req, res) => {
    // bcrypt.hash(password, saltRounds).then((hash) => {
    // })
    let salt = Date.now();
    var hashedPassword = passwordHash.generate(req.body.password + salt);
    db.query(`INSERT INTO users (username, password, salt) VALUES ('${req.body.username}', '${hashedPassword}', ${salt});`, (err, result) => {
      if (err) {
        // throw err;
        return res.end(JSON.stringify({data: 'Invalid Entry'}));
      }
      res.writeHeader(200, 'Successfully create User');
      return res.end(JSON.stringify({data: 'Successfully created User'}));
    })
  },
  checkSession: (req, res) => {
    //delete cookies 
    console.log('here checking sesh')
    let sessionKey = req.query.sessionKey;
    console.log('key', sessionKey)
    db.query(`SELECT u.username FROM users u,sessions s WHERE u.id = s.user_id AND s.session_key = '${sessionKey}';`, (err, result) => {
      console.log('results', result);
      if (err || result.rows.length === 0) { 
        throw err;
        res.writeHeader(401, 'no session here')
        return res.end();
      }
      res.writeHeader(200, 'Success! session found')
      res.end(JSON.stringify({username: result.rows[0].username}));
    })
    //replace with new authenticated ones
  },
  authenticateUser: (req, res) => {
    let enteredUser = req.query.username;
    let enteredPass = req.query.password;
    console.log(req.query);
    //protect against sql injections
    db.query(`SELECT id, password, salt FROM users WHERE username = '${enteredUser}';`, (err, hashedPassword) => {
      if (err || hashedPassword.rows.length === 0) { return res.end(JSON.stringify({data: 'Failed to authenticate'})) }
      let authenticated = passwordHash.verify(enteredPass + hashedPassword.rows[0].salt, hashedPassword.rows[0].password);
      console.log(authenticated);
      if (!authenticated) {  return res.end(JSON.stringify({data: 'Failed to authenticate'})) }
      let sessionKey = createKey();
      console.log('sesskey', sessionKey);
      db.query(`INSERT INTO sessions (session_key, user_id) VALUES ('${sessionKey}', ${hashedPassword.rows[0].id})`, (err, resp) => {
        if (err) { 
          return res.end(JSON.stringify({data: 'error adding session'})) }
        res.cookie('sessionKey', sessionKey);
        res.writeHeader(200, 'Success Logging In');
        res.end(JSON.stringify({data: 'User Authenticated and Session Created'}));
      })
    });
  },
  patchKey: (req, res) => {
    console.log('patching key');
  }
}