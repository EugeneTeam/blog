'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nameAuthor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatarAuthor: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Comment.associate = function (models) {
    Comment.belongsTo(models.Article);
  };
  return Comment;
};