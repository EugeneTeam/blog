const express = require('express');
const app = express();
const port = 4000;
const models = require('./models');
const bodyParser = require("body-parser");

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
})

app.get('/', (req, res) => {
    res.send("main")
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/category/:id', (req, res) => {
    models.Category.findOne({
        include: [{ 
            model: models.Article,
            limit: 7,
         }],
        order: [['createdAt', 'DESC']],
        where: {
            id: req.params.id
        }
    })
        .then(category => {
            if(!category) {
                res.status(404);
                res.send("Not found"); 
            } else {
                res.json(category)
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500)
            res.send("Not found");
        });
});

app.get('/article/:id', (req, res) => {
    models.Article.findOne({
        include: [{ model: models.Category }, { model: models.Comment }],
        where: {
            id: req.params.id
        }
    }).then(article => {
        if(!article) {
            res.status(404);
            res.send('Not found');
        }

        parserJson(article, data);
        let json = JSON.parse(JSON.stringify(data));
        res.json(json)
    }).catch(() => {
        res.send("Not found");
    });
});

function parserJson(art, d) {
    let k = 0;
    for (let l = 0; l < art.Comments.length; l++) {
        if (art.Comments[l].parentId == null) {
            d.Comment[k] = {
                ArticleId: art.Comments[l].ArticleId,
                articleId: art.Comments[l].articleId,
                avatarAuthor: art.Comments[l].avatarAuthor,
                createdAt: art.Comments[l].createdAt,
                id: art.Comments[l].id,
                message: art.Comments[l].message,
                nameAuthor: art.Comments[l].nameAuthor,
                parentId: art.Comments[l].parentId,
                updatedAt: art.Comments[l].updatedAt,
                Comment: []
            }
            k++;
        }
    }
    for(let i = 0; i < d.Comment.length; i++) {
        parserJsonNull1(art, d.Comment[i], d.Comment, 0, d.Comment.length);
    }
}

function parserJsonNull1(art, d, td, l, max) {
    console.log(max)
    if (l == max) return;
    let k = 0;
    let haveChild = false;
    for (let i = 0; i < art.Comments.length; i++) {
        if (d.id == art.Comments[i].parentId) {
            d.Comment[k] = {
                ArticleId: art.Comments[i].ArticleId,
                articleId: art.Comments[i].articleId,
                avatarAuthor: art.Comments[i].avatarAuthor,
                createdAt: art.Comments[i].createdAt,
                id: art.Comments[i].id,
                message: art.Comments[i].message,
                nameAuthor: art.Comments[i].nameAuthor,
                parentId: art.Comments[i].parentId,
                updatedAt: art.Comments[i].updatedAt,
                Comment: []
            }
            k++;
            haveChild = true;
        }
    }
    if (haveChild) {
        return parserJsonNull(art, d.Comment, td, 0, d.Comment.length)
    }
    else {
        console.log(max)
        return parserJsonNull(art, td, td, ++l, max)
    }
}

app.post('/comment', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    models.Comment.create({
        articleId: req.body.articleId,
        parentId: req.body.parent,
        nameAuthor: req.body.name,
        avatarAuthor: req.body.avatar,
        message: req.body.text,
        createdAt: new Date()
    })
    .then(comment => res.send(comment.id))
        .catch(e => {
            res.status(500);
            res.send(e);
        })
});

app.listen(port, (err) => {
    if (err) {
        console.error("ERROR !!! " + err);
    }
});