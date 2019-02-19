'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    id:             {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:           {
        type: Sequelize.STRING,
        allowNull: false
    }
  }, {});
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};