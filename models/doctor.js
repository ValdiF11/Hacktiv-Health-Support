'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor.init({
    name: DataTypes.STRING,
    specialization: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    UsersId: {
      allowNull:false,
      type:DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};