const express = require('express');
const models = require('./models');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send("main")
});

app.get('/category', (req, res) => {
    models.Category.findAll()
        .then(categories => console.log(categories));
    res.send("category")
});

app.get('/article', (req, res) => {
    res.send("article");
});

app.listen(port, (err) => {
    if (err) {
        console.error("ERROR !!! " + err);
    }
});

