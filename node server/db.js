const Sequelize = require('sequelize');
const db = new Sequelize('mysql://user:password@localhost:3000/blog',{
    pool: {maxIdleTime: 120000}
});

const category = db.define('category', {
    id:             {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:           {
        type: Sequelize.STRING,
        allowNull: false
    }
});

db.sync();

const article = db.define('article', {
    id:             {
        type: Sequelize.INTEGER.UNSIGNED, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title:          {
        type: Sequelize.STRING,
        allowNull: false
    },
    text:           {
        type: Sequelize.TEXT,
        allowNull: false
    },
    category_id:    {
        type: Sequelize.STRING,
        allowNull: false
    },
    image_url:      {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const comments = db.define('comments', {
    id:             { 
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    article_id:     { 
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    parent_id:      { 
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    name_author:    { 
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar_author:  { 
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = {
    db,
    category,
    article,
    comments
};