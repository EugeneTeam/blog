'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article',
  {
    title: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Article.associate = function(models) {
    Article.hasOne(models.Category);
    Article.belongToMany(model.Comment);
  };
  return Article;
};