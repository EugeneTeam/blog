const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send("main")
});

app.get('/category', (req,res) => {
    res.send("category")
});

app.get('/article', (req,res) => {
    res.send("article")
});

console.log(db.article);

app.listen(port);

