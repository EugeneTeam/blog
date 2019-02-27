const express = require('express');
const app = express();
const port = 4000;
const models = require('./models');

app.get('/', (req, res) => {
    res.send("main")
});

app.get('/category/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    models.Category
    .findById(req.params.id)
    .then(category => res.json(category))
    .catch(() => {
        res.send("Not found");
    });
});

app.get('/article/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
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

