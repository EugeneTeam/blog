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
            category_id: req.params.id
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

app.post('/comment', (req, res) => {
    console.log('/comment')
    if(!req.body) {
        return res.sendStatus(400);
    }

    console.log('11111111111  === === === '+req.body.article_id)

    sequelize.define('Comment', {
        article_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        parent_id: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        name_author: {
          type: Sequelize.STRING,
          allowNull: false
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avatar_author: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }).build({
        article_id: req.body.article_id,
        parent_id: req.body.parent_id,
        name_author: req.body.name,
        avatar_author: req.body.avatar,
        message: req.body.text,
        createdAt: new Date()
    }).save().then(
        () => console.log('save successful'),
        () => console.log('save error')
    );
});

app.use('/getcomments/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use('/getcomments/:id', (req, res) => {
    models.Comment.findAll({
        where:{
            article_id: req.params.id
        }
    }).then(article => res.json(article))
    .catch(() => {
        res.send("Not found");
    });
})

app.listen(port, (err) => {
    if (err) {
        console.error("ERROR !!! " + err);
    }
});

