'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: DataTypes.STRING
    }, {});
    Category.associate = function (models) {
        // Category.belongsTo(models.Article);
    };
    return Category;
};