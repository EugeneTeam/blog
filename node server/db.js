const Sequelize = require('sequelize');
const db = new Sequelize('mysql://user:password@localhost:3000/blog');

const category = Sequelize.define('category', {
    id:             Sequelize.INTEGER,
    name:           Sequelize.STRING
});

const article = Sequelize.define('article', {
    id:             Sequelize.INTEGER,
    title:          Sequelize.STRING,
    text:           Sequelize.TEXT,
    category_id:    Sequelize.STRING,
    image_url:      Sequelize.STRING
});

const comments = Sequelize.define('comments', {
    id:             Sequelize.INTEGER,
    article_id:     Sequelize.INTEGER,
    parent_id:      Sequelize.INTEGER,
    name_author:    Sequelize.STRING,
    avatar_author:  Sequelize.STRING
});