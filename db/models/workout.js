'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.saved_workout, {
        foreignKey: 'workout_id'
      });
      models.saved_workout.belongsTo(this, {
        foreignKey: 'workout_id'
      });
    }
  };
  workout.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    body_group: DataTypes.STRING,
    description: DataTypes.STRING,
    equipment: DataTypes.STRING,
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'workout',
  });
  return workout;
};