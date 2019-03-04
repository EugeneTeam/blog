const express = require('express');
const app = express();
const port = 4000;
const models = require('./models');

app.get('/', (req, res) => {
    res.send("main")
});

app.use('/category/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.get('/category/:id', (req, res) => {
    console.log('/category/:id')
    models.Article.findAll({
        include: [{model: models.Category}],
        where: {
            category_id: req.params.id
        }
    })
    .then(category => res.json(category))
    .catch(() => {
        res.send("Not found");
    });
});

app.get('/article/:id', (req, res) => {
    console.log('/article/:id')
    models.Article.findAll({
        include: [{model: models.Category}],
        where: {
            id: models.Category.category_id,
            id: req.params.id
        }
    }).then(article => res.json(article))
    .catch(() => {
        res.send("Not found");
    });
});

app.use('/comment', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.get('/comment', (req, res) => {
    console.log('/comment')
    res.send('comment')
    console.log("BODY = = = = "+res.body);
});


app.listen(port, (err) => {
    if (err) {
        console.error("ERROR !!! " + err);
    }
});

