const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connessione al database MongoDB (assicurati di avere MongoDB installato)
mongoose.connect('mongodb://localhost:27017/wishlist', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Schema del modello utente
const userSchema = new mongoose.Schema({
  username: String,
  gifts: [String]
});

// Modello utente
const User = mongoose.model('User', userSchema);

app.use(express.json());

// API per aggiungere un utente
app.post('/api/users', async (req, res) => {
  const { username } = req.body;

  try {
    const user = new User({ username });
    await user.save();
    res.json({ userId: user._id });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Error adding user' });
  }
});

// API per aggiungere un regalo
app.post('/api/gifts', async (req, res) => {
  const { userId, gift } = req.body;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.gifts.push(gift);
      await user.save();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error adding gift:', error);
    res.status(500).json({ error: 'Error adding gift' });
  }
});

// API per ottenere la lista dei regali
app.get('/api/gifts', async (req, res) => {
  try {
    const users = await User.find();
    const gifts = users.map(user => ({ username: user.username, gifts: user.gifts }));
    res.json(gifts);
  } catch (error) {
    console.error('Error getting gifts:', error);
    res.status(500).json({ error: 'Error getting gifts' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
