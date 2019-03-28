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

  Comment.getCommentsTree = async (articleId, parentId) => {
    try {
      const comments = await Comment.findAll({
        where: {
          parentId: parentId,
          articleId: articleId
        },
        raw: true
      });
      if (!comments.length) {
        return comments;
      }
      for (const comment of comments) {
        comment.Comments = await Comment.getCommentsTree(articleId, comment.id)
      }
      return comments;
    } catch (error) {
      new Error('--error from comment.js--');
    }
  };

  return Comment;
};