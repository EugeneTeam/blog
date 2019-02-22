const sequelize = require('sequelize');
const db = new sequelize('blog', 'mysql', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.authenticate().then(
    () => console.log('connection......'),
    () => console.log('error connection')
);

module.exports = db;