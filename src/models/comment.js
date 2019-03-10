'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'article_id'
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'parent_id'
    },
    name_author: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name_author'
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'message'
    },
    avatar_author: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'avatar_author'
    }
  }, 
  {
     foreignKey: 'article_id'
  },
  {
    underscored: true
  });
  Comment.associate = function(models) {
    Comment.belongsTo(models.Article);
  };
  return Comment;
};