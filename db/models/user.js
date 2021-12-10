'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    google_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    is_coach: DataTypes.BOOLEAN,
    coach_id: DataTypes.INTEGER,
    profile_photo_url: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};