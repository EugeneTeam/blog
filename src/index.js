const express = require('express');
const app = express();
const port = 4000;
const models = require('./models');
const bodyParser = require ("body-parser"); 
const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog', 'mysql', 'mysql', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

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
    console.log('/category/:id')
    models.Article.findAll({
        include: [{model: models.Category}],
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
    console.log('/article/:id')
    models.Article.findAll({
        include: [{model: models.Category}, {model: models.Comment}],
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


        parsJson(article, data, 0);
        res.send(JSON.stringify(data));
        // res.json(article)
    });
    // .catch(() => {
    //     res.send("Not found");
    // });
});


function parsJson(article, data, i) {
    if(i == article[0].Comments.length) return;
    for (let l = 0; l < article[0].Comments.length; l++) {
        if(article[0].Comments[i].id == article[0].Comments[l].parentId) {
            data.Comment[i] = {
                    ArticleId: article[0].Comments[i].ArticleId,
                    articleId: article[0].Comments[i].articleId,
                    avatarAuthor: article[0].Comments[i].avatarAuthor,
                    createdAt: article[0].Comments[i].createdAt,
                    id: article[0].Comments[i].id,
                    message: article[0].Comments[i].message,
                    nameAuthor: article[0].Comments[i].nameAuthor,
                    parentId: article[0].Comments[i].parentId,
                    updatedAt: article[0].Comments[i].updatedAt,
                    Comment:[]
                };
            return parsJson(article, data.Comment[i], ++i);
        }
    }
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
    if(!req.body) {
        return res.sendStatus(400);
    }


    sequelize.define('Comment', {
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
      }).build({
        articleId: req.body.articleId,
        parentId: req.body.parent,
        nameAuthor: req.body.name,
        avatarAuthor: req.body.avatar,
        message: req.body.text,
        createdAt: new Date()
    }).save().then(
        () => console.log('save successful'),
        () => console.log('save error')
    );
});

// app.use('/getcomments/:id', (req, res, next) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// })
// app.use('/getcomments/:id', (req, res) => {
//     models.Comment.findAll({
//         where:{
//             articleId: req.params.id
//         }
//     }).then(article => res.json(article))
//     .catch(() => {
//         res.send("Not found");
//     });
// })

app.listen(port, (err) => {
    if (err) {
        console.error("ERROR !!! " + err);
    }
});

