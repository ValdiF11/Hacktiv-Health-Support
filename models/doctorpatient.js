"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get convertStaus() {
      if (this.status == true) {
        return "sudah di Acc";
      } else {
        return "Belum di Acc";
      }
    }

    static associate(models) {
      // define association here
      DoctorPatient.belongsTo(models.Doctor, {
        foreignKey: "DoctorsId",
      });
      DoctorPatient.belongsTo(models.Patient, {
        foreignKey: "PatientsId",
      });
    }
  }

  DoctorPatient.init(
    {
      appointmentDate: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      Note: DataTypes.STRING,
      Fee: DataTypes.INTEGER,
      DoctorsId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Doctors",
          key: "id",
        },
      },
      PatientsId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Patients",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "DoctorPatient",
    }
  );
  return DoctorPatient;
};
