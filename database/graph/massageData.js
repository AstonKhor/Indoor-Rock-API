const db = require('../index');

db.query('SELECT DISTINCT user_id FROM ascents;', (err, result) => {
  if (err) throw err;
  // console.log(result.rows);
  let uniqueUsers = result.rows;
  for (let i = 0; i < uniqueUsers.length; i++) {
    // console.log(`SELECT date, usa_boulders FROM ascents WHERE user_id = ${uniqueUsers[i]};`);
    //if (i === 5) break; //testing purposes
    db.query(`SELECT date, usa_boulders FROM ascents WHERE user_id = ${uniqueUsers[i].user_id};`, (err, results) => {
      if (err) throw err
      let userClimbs = results.rows;
      if (userClimbs.length !== 0) {
        let user = {};
        let grades = ['V0-', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10'];
        let lowestGradeIdx = -1;
        for (let j = 0; j < userClimbs.length; j++) {
          if (user[userClimbs[j].usa_boulders] === undefined || user[userClimbs[j].usa_boulders] > userClimbs[j].date) {
            user[userClimbs[j].usa_boulders] = userClimbs[j].date;
          }
        }
        // console.log('userBefore', user);
        //find lowest grade 
        for (let j = 0; j < grades.length; j++) {
          if (user[grades[j]]) {
            lowestGradeIdx = j;
            break;
          }
        }
        // console.log('lowestGrade', lowestGradeIdx);
        for (let j = grades.length - 1; j > 0; j--) {
          if (user[grades[j]] === 0) {
            delete user[grades[j]];
            j += 2;
          } else if(user[grades[j]] !== undefined) {
            for (let k = j - 1; k >= 0; k--) {
              if (k < lowestGradeIdx) break;
              if (user[grades[k]] !== undefined) {
                if (user[grades[j]] - user[grades[k]] <= 10) {
                  //override negatives and reset them based on avg
                  user[grades[k]] = user[grades[j]] - (8976000 * (j - k));
                }
              } else {
                user[grades[k]] = user[grades[j]] - (8976000 * (j - k));
              }
            }
          }
        }
        if (Object.keys(user).length !== 1 && Object.keys(user).length !== 0) {
          // console.log('before', user);
          //alter to show deltas
          for (let j = 0; j < grades.length - 1; j++) {
            if (user[grades[j]] && user[grades[j + 1]]) {
              user[grades[j]] = user[grades[j + 1]] - user[grades[j]];
            } else if (user[grades[j]]) {
              delete user[grades[j]];
            }
          }
          console.log(`Inserting User: ${i}/${uniqueUsers.length}`);
          db.query(`INSERT INTO climbers (id, v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10) VALUES (${uniqueUsers[i].user_id}, ${user.V0 || null}, ${user.V1 || null}, ${user.V2 || null}, ${user.V3 || null}, ${user.V4 || null}, ${user.V5 || null}, ${user.V6 || null}, ${user.V7 || null}, ${user.V8 || null}, ${user.V9 || null}, ${user.V10 || null})`, (err, results) => {
            if (err) throw err;
                console.log(`Successfully Seeded: ${i}/${uniqueUsers.length}`);
          })
        } else {
          // console.log('Only 0-1 entry. Nothing to compute');
        }
      }
    })
  }
})