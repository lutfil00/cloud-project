const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/item');

const app = express();

mongoose.connect('mongodb://localhost:27017/crudapp', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const items = await Item.find();
    res.render('index', { items });
});

app.post('/add', async (req, res) => {
    const { name, description } = req.body;
    const item = new Item({ name, description });
    await item.save();
    res.redirect('/');
});

app.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    await Item.findByIdAndUpdate(id, { name, description });
    res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndRemove(id);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
