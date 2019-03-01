'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: DataTypes.STRING
    }, 
    {
        // foreignKey: 'category_id'
    }, 
    {
        // underscored: true
    });
    Category.associate = function (models) {
        // Category.belongsTo(models.Article);
    };
    return Category;
};