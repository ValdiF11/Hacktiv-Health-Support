"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get fullDoctor() {
      let data = this.name + " - " + this.specialization;
      return data;
    }
    static associate(models) {
      // define association here
      Doctor.hasMany(models.DoctorPatient, {
        foreignKey: "DoctorsId",
      });
      Doctor.belongsToMany(models.Patient, {
        through: models.DoctorPatient,
        foreignKey: "DoctorsId",
      });
    }
  }
  Doctor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name not-empty",
          },
          notNull: {
            msg: "name not-null",
          },
        },
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "specialization not-empty",
          },
          notNull: {
            msg: "specialization not-null",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "phone Number not-empty",
          },
          notNull: {
            msg: "phone Number not-empty",
          },
        },
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "address not-empty",
          },
          notNull: {
            msg: "address not-null",
          },
        },
      },
      UsersId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
