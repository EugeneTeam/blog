const express = require('express');
const app = express();
const port = 3306;
const models = require('./models');
const db = require('./db');

db.sync();

app.get('/', (req, res) => {
    res.send("main")
});

app.get('/category', (req, res) => {
    res.send('category');
    models.Article.findById(1).then(article => console.log(article));
});

app.get('/article/:id', (req, res) => {
    res.send("article");
});

app.listen(port, (err) => {
    if (err) {
        console.error("ERROR !!! " + err);
    }
});

