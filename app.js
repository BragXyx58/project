const express = require('express');
const mongoose = require('mongoose');
const Coin = require('./models/Coin');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@bd1.wxwphls.mongodb.net/?retryWrites=true&w=majority&appName=bd1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.post('/coins', async (req, res) => {
  try {
    const { denomination, country, year, material } = req.body;
    const coin = new Coin({ denomination, country, year, material });
    await coin.save();
    res.status(201).json(coin);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/coins', async (req, res) => {
  try {
    const coins = await Coin.find(); 
    res.json(coins);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/coins/:id', async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id);
    if (!coin) return res.status(404).send('Coin not found');
    res.json(coin);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/coins/:id', async (req, res) => {
  try {
    const { denomination, country, year, material } = req.body;
    const coin = await Coin.findByIdAndUpdate(
      req.params.id,
      { denomination, country, year, material },
      { new: true }
    );
    if (!coin) return res.status(404).send('Coin not found');
    res.json(coin);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/coins/:id', async (req, res) => {
  try {
    const coin = await Coin.findByIdAndDelete(req.params.id);
    if (!coin) return res.status(404).send('Coin not found');
    res.send('Coin deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
