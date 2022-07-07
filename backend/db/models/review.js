'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
      Review.hasMany(models.Image, { foreignKey: 'reviewId' });
    }
  }
  Review.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    spotId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    review: {
      type:DataTypes.TEXT,
      allowNull:false,
    },
    stars: {
      type:DataTypes.DECIMAL,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};