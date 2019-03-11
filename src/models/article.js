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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    // foreignKey: 'categoryId'
  },
  {
    // underscored: true
  });
  Article.associate = function(models) {
    Article.belongsTo(models.Category);
    Article.hasMany(models.Comment);
  };
  return Article;
};