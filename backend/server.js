const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3052;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/todos', (req, res) => {
  const sql = "SELECT * FROM todo";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  const sql = 'INSERT INTO todo (text, completed) VALUES (?, 0)';
  const params = [text];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id: this.lastID, text, completed: 0 }
    });
  });
});

app.put('/api/todos/:id', (req, res) => {
  const { text, completed } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE todo SET text = ?, completed = ? WHERE id = ?';
  const params = [text, completed, id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id, text, completed }
    });
  });
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todo WHERE id = ?';
  db.run(sql, id, function (err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success", "data": this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
