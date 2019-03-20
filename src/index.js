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
            if (!category) {
                res.status(404);
                res.send("Not found");
            } else {
                res.json(category)
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500);
            res.send("Server Error");
        });
});
app.get('/article/:id', (req, res) => {
    models.Article.findOne({
        include: [{
            model: models.Category
        }],
        where: {
            id: req.params.id
        },
        raw: true,
    }).then(async article => {
        if (!article) {
            res.status(404);
            res.send('Not found');
        } else {
            const json = await models.Comment.getCommentsTree(article.id, null);
            for (const element of json) {
                await structureJson(element, 0, json.length, models.Comment, article.id);
            }
            article.Comments = json;
            res.json(article);
        }
    }).catch(e => {
        console.log(e);
        res.status(500);
        res.send("Server Error");
    });
});
async function structureJson(nullElement, i, max, model, id) {
    if (i >= max) {
        return;
    }
    let temp = await model.getCommentsTree(id, nullElement.id)
    if (temp != undefined) {
        nullElement.Comments = temp;
        return await structureJson(nullElement.Comments[i], ++i, nullElement.Comments.length, model, id)
    } else {
        return await structureJson(nullElement, ++i, max, model, id)
    }
}
app.post('/comment', (req, res) => {
    if (!req.body) {
        res.status(500);
        res.send('Server Error');
    } else {
        models.Comment.create({
            articleId: req.body.articleId,
            parentId: req.body.parent,
            nameAuthor: req.body.name,
            avatarAuthor: req.body.avatar,
            message: req.body.text,
            createdAt: new Date()
        })
            .then(comment => {
                if (!comment) {
                    res.status(404);
                    res.send('Not found');
                } else {
                    res.send(comment.id);
                }
            })
            .catch(e => {
                console.log(e);
                res.status(500);
                res.send('Server Error');
            })
    }
});

app.listen(port, (err) => {
    if (err) {
        console.error("ERROR !!! " + err);
    }
});