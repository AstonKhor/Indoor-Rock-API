const db = require('../../database/index');
const createKey = require('../methods/createKey');
const SQL = require('@nearform/sql')
// const bcrypt = require('bcrypt');
const passwordHash = require('password-hash');
const saltRounds = 5;

module.exports = {
  getGyms: (req, res) => {
    console.log('query', req.query);
    //preven sql injections
    let cleanQuery = SQL`SELECT * FROM gyms`;
    db.query(cleanQuery, (err, gyms) => {
      if (err) throw err;
      // res.header("Content-Encoding", "gzip");
      res.end(JSON.stringify(gyms));
    })
  },
  createUser: (req, res) => {
    // bcrypt.hash(password, saltRounds).then((hash) => {
    // })
    let salt = Date.now();
    var hashedPassword = passwordHash.generate(req.body.password + salt);
    let insertUserQuery = SQL`INSERT INTO users (username, password, salt) VALUES (${req.body.username}, ${hashedPassword}, ${salt});`;
    db.query(insertUserQuery, (err, result) => {
      if (err) {
        // throw err;
        return res.end(JSON.stringify({data: 'Invalid Entry'}));
      }
      let selectUserIdQuery = SQL`SELECT id from users WHERE username = ${req.body.username}`;
      db.query(selectUserIdQuery, (err, user) => {
        let key = createKey();
        let insertKeyQuery = SQL`INSERT INTO keys (key, user_id) VALUES (${key}, ${user.rows[0].id})`;
        db.query(insertKeyQuery, (err, result) => {
          if (err) {
            res.writeHeader(401, 'Failed to create Key');
            res.end();
          }
          res.writeHeader(200, 'Successfully create User');
          return res.end(JSON.stringify({data: 'Login again'}));
        })
      })
    })
  },
  checkSession: (req, res) => {
    //delete cookies 
    console.log('here checking sesh');
    let sessionKey = req.query.sessionKey;
    console.log('key', sessionKey);
    let cleanQuery = SQL`SELECT u.username,k.key FROM users u, sessions s, keys k WHERE u.id = s.user_id AND u.id = k.user_id AND s.session_key = ${sessionKey};`;
    db.query(cleanQuery, (err, result) => {
      console.log('results', result);
      if (err || result.rows.length === 0) { 
        // throw err;
        res.writeHeader(401, 'no session here')
        return res.end();
      }
      res.writeHeader(200, 'Success! session found')
      res.end(JSON.stringify({username: result.rows[0].username, key: result.rows[0].key}));
    })
  },
  authenticateUser: (req, res) => {
    let enteredUser = req.query.username;
    let enteredPass = req.query.password;
    console.log(req.query);
    //protect against sql injections
    let cleanQuery = SQL`SELECT id, password, salt FROM users WHERE username = ${enteredUser};`;
    db.query(cleanQuery, (err, hashedPassword) => {
      if (err || hashedPassword.rows.length === 0) { 
        res.writeHeader(401, 'Failed to Authenticate User');
        return res.end(JSON.stringify({data: 'Failed to authenticate'})); 
      }
      let authenticated = passwordHash.verify(enteredPass + hashedPassword.rows[0].salt, hashedPassword.rows[0].password);
      console.log('authenticated', authenticated);
      if (!authenticated) { 
        res.writeHeader(401, 'Failed to Authenticate User');
        return res.end(JSON.stringify({data: 'Failed to authenticate'}));
      }
      let sessionKey = createKey();
      console.log('sesskey', sessionKey);
      let cleanQuery = SQL`INSERT INTO sessions (session_key, user_id) VALUES (${sessionKey}, ${hashedPassword.rows[0].id})`;
      db.query(cleanQuery, (err, resp) => {
        if (err) { 
          res.writeHeader(401, 'Failed to create Session');
          return res.end(JSON.stringify({data: 'error adding session'})); 
        }
        res.cookie('sessionKey', sessionKey);
        res.writeHeader(200, 'Success Logging In');
        res.end(JSON.stringify({data: 'User Authenticated and Session Created'}));
      })
    });
  },
  patchKey: (req, res) => {
    console.log('patching key');
  },
  getClimbGraph: (req, res) => {
    db.query(`SELECT * FROM climbers;`, (err, result) => {
      // console.log('results', result);
      res.end(JSON.stringify(result));
    })


  }
}