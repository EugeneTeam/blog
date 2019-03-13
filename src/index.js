const express = require('express');
const app = express();
const port = 4000;
const models = require('./models');
const bodyParser = require("body-parser");
const sequelize = require('./db')
const Sequelize = require('sequelize');

app.get('/', (req, res) => {
    res.send("main")
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/category/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.get('/category/:id', (req, res) => {
    models.Article.findAll({
        include: [{ model: models.Category }],
        limit: 7,
        order: [['createdAt', 'DESC']],
        where: {
            categoryId: req.params.id
        }
    })
        .then(category => res.json(category))
        .catch(() => {
            res.send("Not found");
        });
});

app.use('/article/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.get('/article/:id', (req, res) => {
    models.Article.findAll({
        include: [{ model: models.Category }, { model: models.Comment }],
        where: {
            id: models.Category.categoryId,
            id: req.params.id
        }
    }).then(article => {
        let data = {
            CategoryId: article[0].CategoryId,
            categoryId: article[0].categoryId,
            createdAt: article[0].createdAt,
            id: article[0].id,
            imageUrl: article[0].imageUrl,
            text: article[0].text,
            title: article[0].title,
            updatedAt: article[0].updatedAt,
            Comment: [],
            category: [{
                createdAt: article[0].Category.createdAt,
                id: article[0].Category.id,
                name: article[0].Category.name,
                updatedAt: article[0].Category.updatedAt
            }]
        }

        parserJson(article[0], data);
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
    parserJsonNull(art, d.Comment, 0, d.Comment.length);
}

function parserJsonNull(art, d, l, max) {
    if (l == max) return;
    let k = 0;
    let = haveChild = false;
    for (let i = 0; i < art.Comments.length; i++) {
        if (d[l].id == art.Comments[i].parentId) {
            d[l].Comment[k] = {
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
    if (haveChild)
        return parserJsonNull(art, d[l].Comment, 0, d[l].Comment.length)
    else
        return parserJsonNull(art, d, ++l, max)
}

app.use('/comment', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.post('/comment', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    const model = sequelize.define('Comment', {
        articleId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        parentId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        nameAuthor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avatarAuthor: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    model.build({
        articleId: req.body.articleId,
        parentId: req.body.parent,
        nameAuthor: req.body.name,
        avatarAuthor: req.body.avatar,
        message: req.body.text,
        createdAt: new Date()
    })
        .save()
        .then(
            () => console.log('save successful'),
            () => console.log('save error')
        );
});

app.listen(port, (err) => {
    if (err) {
        console.error("ERROR !!! " + err);
    }
});