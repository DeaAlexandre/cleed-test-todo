const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "todos.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('connected to the SQLite database !');
    db.run(`CREATE TABLE todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      completed INTEGER
      )`,
      (err) => {
        if (err) {
        } else {
          const insert = 'INSERT INTO todo (text, completed) VALUES (?, ?)';
          db.run(insert, ["test14555", 0]);
          db.run(insert, ["test2584", 1]);
        }
      });
  }
});

module.exports = db;