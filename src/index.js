const express = require('express');
const app = express();
const port = 3306;
const models = require('./models');
const db = require('./db');

db.sync();

app.get('/', (req, res) => {
    res.send("main")
});

app.get('/category/:id', (req, res) => {
    models.Category
    .findById(req.params.id)
    .then(category => res.send(category))
    .catch(() => {
        res.send("Not found");
    });
});

app.get('/article/:id', (req, res) => {
    models.Article
    .findById(req.params.id)
    .then(article => res.send(article))
    .catch(() => {
        res.send("Not found");
    });
});

app.listen(port, (err) => {
    if (err) {
        console.error("ERROR !!! " + err);
    }
});

