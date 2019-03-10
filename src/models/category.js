'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: DataTypes.STRING,
        field: 'name'
    }, 
    {
        // foreignKey: 'category_id'
    }, 
    {
        underscored: true
    });
    Category.associate = function (models) {
        Category.hasMany(models.Article);
    };
    return Category;
};