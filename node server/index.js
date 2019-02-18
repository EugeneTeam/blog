const express = require('express');
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

app.listen(port);