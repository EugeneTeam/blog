'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'id'
    },
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
      field: 'title'
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'text'
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id'
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'image_url'
    }
  },
  {
    foreignKey: 'category_id'
  },
  {
    underscored: true
  });
  Article.associate = function(models) {
    Article.belongsTo(models.Category);
    Article.hasMany(models.Comment);
  };
  return Article;
};