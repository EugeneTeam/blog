'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name_author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar_author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Article);
  };
  return Comment;
};
