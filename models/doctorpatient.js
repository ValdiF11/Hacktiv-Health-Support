'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DoctorPatient.belongsToMany(models.Patient, { through: models.Doctor });
    }
  }
  DoctorPatient.init({
    appointmentDate: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    note: DataTypes.STRING,
    fee: DataTypes.INTEGER,
    DoctorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Doctors',
        key: "id"
      },
    }
  }, {
    sequelize,
    modelName: 'DoctorPatient',
  });
  return DoctorPatient;
};