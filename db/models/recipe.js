'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.saved_recipe, {
        foreignKey: 'recipe_id'
      });
      models.saved_recipe.belongsTo(this, {
        foreignKey: 'recipe_id'
      });
    }
  };
  recipe.init({
    name: {
      type: DataTypes.STRING,
    },
    vegan: {
      type: DataTypes.BOOLEAN,
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
    },
    dairy_free: {
      type: DataTypes.BOOLEAN,
    },
    gluten_free: {
      type: DataTypes.BOOLEAN,
    },
    keto: {
      type: DataTypes.BOOLEAN,
    },
    low_fodmap: {
      type: DataTypes.BOOLEAN,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    summary: {
      type: DataTypes.STRING,
    },
    calories: {
      type: DataTypes.INTEGER,
    },
    protein: {
      type: DataTypes.INTEGER,
    },
    fat: {
      type: DataTypes.INTEGER,
    },
    carbs: {
      type: DataTypes.INTEGER,
    },
    popularity_score: {
      type: DataTypes.INTEGER,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    spoon_recipe_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'recipe',
  });
  return recipe;
};