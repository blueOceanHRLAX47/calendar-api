'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class saved_workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  saved_workout.init({
    user_id: DataTypes.INTEGER,
    workout_id: DataTypes.INTEGER,
    // added_to_calendar: DataTypes.BOOLEAN,
    time_on_calendar: DataTypes.DATE,
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'saved_workout',
  });
  return saved_workout;
};