const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;

// Creazione del database SQLite
const db = new sqlite3.Database('wishlist.db');

// Creazione della tabella users
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT)');

// Creazione della tabella gifts
db.run('CREATE TABLE IF NOT EXISTS gifts (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, gift TEXT, FOREIGN KEY(userId) REFERENCES users(id))');

// Middleware per consentire la lettura del corpo della richiesta
app.use(express.json());

// API per aggiungere un utente
app.post('/api/users', (req, res) => {
  const { username } = req.body;
  db.run('INSERT INTO users (username) VALUES (?)', [username], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ userId: this.lastID });
  });
});

// API per aggiungere un regalo
app.post('/api/gifts', (req, res) => {
  const { userId, gift } = req.body;
  db.run('INSERT INTO gifts (userId, gift) VALUES (?, ?)', [userId, gift], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ giftId: this.lastID });
  });
});

// API per ottenere la lista dei regali
app.get('/api/gifts', (req, res) => {
  db.all('SELECT * FROM gifts', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
