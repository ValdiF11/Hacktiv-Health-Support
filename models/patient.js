'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.HealtParameter, {
        foreignKey: 'PatientsId'
      });
      Patient.belongsToMany(models.Doctor, {
        through: models.DoctorPatient,
        foreignKey: 'PatientsId'
      });
    }
  }
  Patient.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    UsersId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
    },
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};