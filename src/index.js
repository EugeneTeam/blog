const express = require('express');
const app = express();
const port = 4000;
const models = require('./models');

app.get('/', (req, res) => {
    res.send("main")
});

app.get('/category/:id', (req, res) => {
    models.Category
    .findById(req.params.id)
    .then(category => res.json(category))
    .catch(() => {
        res.send("Not found");
    });
});

app.get('/article/:id', (req, res) => {
    models.Article
    .findById(req.params.id)
    .then(article => res.json(article))
    .catch(() => {
        res.send("Not found");
    });
});

app.listen(port, (err) => {
    if (err) {
        console.error("ERROR !!! " + err);
    }
});

