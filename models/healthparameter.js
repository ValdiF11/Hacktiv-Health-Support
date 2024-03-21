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
      HealthParameter.belongsTo(models.Patient, {
        foreignKey: 'PatientsId', 
      });
    }
  }
  HealthParameter.init({
    checkedDate: DataTypes.DATE,
    checkedResult: DataTypes.STRING,
    mark: DataTypes.STRING,
    Fee: DataTypes.INTEGER,
    PatientsId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Patients",
        key: "id",
      }
    },
  }, {
    sequelize,
    modelName: 'HealthParameter',
  });
  return HealthParameter;
};