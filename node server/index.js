const express = require('express');
const db = require('./db');
const app = express();
const port = 3306;

app.get('/', (req,res) => {
    res.send("main")
});

app.get('/category', (req,res) => {
    res.send("category")
});

app.get('/article', (req,res) => {
    
    console.log('--------------------------------------------------------');
});

app.listen(port, (err) => {
    if(err){
        console.error("ERROR !!! "+err);
    }
});

