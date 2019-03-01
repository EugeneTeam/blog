'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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
  }, 
  {
    foreignKey: 'category_id'
  }, 
  {
    // underscored: true
  });
  Article.associate = function(models) {
    Article.belongsTo(models.Category);
  };
  return Article;
};