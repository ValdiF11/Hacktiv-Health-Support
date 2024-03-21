'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthParameter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HealthParameter.belongsToMany(models.Patient,{through:models.Doctor});
    }
  }
  HealthParameter.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: "id"
      },
    },
    checkedDate: DataTypes.DATE,
    checkedResult: DataTypes.STRING,
    mark: DataTypes.STRING,
    Fee: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HealthParameter',
  });
  return HealthParameter;
};